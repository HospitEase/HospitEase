import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import sendNotification from "./Notification";
import { Hono } from "hono";
import { middleWare } from "../middleware/user";

export const patientRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

patientRoutes.post("/patient-details", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const {
    name,
    dob,
    address,
    contact,
    sex,
    ayushmanCard,
    diagnosisHistory,
    userId,
  } = await c.req.json();

  const patient = await prisma.patient.create({
    data: {
      name,
      dob: new Date(dob),
      address,
      contact,
      sex,
      ayushmanCard,
      diagnosisHistory,
      status: "Waiting",
      userId,
    },
    select: {
      patientId: true,
    },
  });

  // Check for available beds
  const availableBeds = await prisma.oPDBed.findMany({
    where: {
      bedStatus: "empty",
    },
  });

  if (availableBeds.length === 0) {
    return c.json({ message: "No beds available, added to queue", patient });
  }

  const bedToAssign = availableBeds[0];
  await prisma.oPDBed.update({
    where: {
      hospitalId_patientId: {
        hospitalId: bedToAssign.hospitalId,
        patientId: bedToAssign.patientId,
      },
    },
    data: {
      bedStatus: "full",
      patientId: patient.patientId,
    },
  });

  await prisma.patient.update({
    where: { patientId: patient.patientId },
    data: { status: "Admitted" },
  });

  return c.json({ message: "Bed assigned successfully", patient });
});

patientRoutes.get("/beds/availability", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const availableBeds = await prisma.oPDBed.findMany({
    where: {
      bedStatus: "empty",
    },
    include: {
      hospital: true,
    },
  });

  return c.json({ availableBeds });
});

patientRoutes.post("/beds/assign", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const availableBeds = await prisma.oPDBed.findMany({
    where: {
      bedStatus: "empty",
    },
  });

  if (availableBeds.length === 0) {
    return c.json({ message: "No available beds to assign" });
  }

  const waitingPatients = await prisma.patient.findMany({
    where: {
      status: "Waiting",
    },
    orderBy: {
      patientId: "asc",
    },
  });

  if (waitingPatients.length === 0) {
    return c.json({ message: "No waiting patients in queue" });
  }

  const patientToAssign = waitingPatients[0];
  const bedToAssign = availableBeds[0];

  await prisma.oPDBed.update({
    where: {
      hospitalId_patientId: {
        hospitalId: bedToAssign.hospitalId,
        patientId: bedToAssign.patientId,
      },
    },
    data: {
      bedStatus: "full",
      patientId: patientToAssign.patientId,
    },
  });

  await prisma.patient.update({
    where: { patientId: patientToAssign.patientId },
    data: { status: "Admitted" },
  });

  await sendNotification(
    patientToAssign.contact,
    "Your bed has been assigned!",
  );

  return c.json({
    message: "Bed assigned and patient notified",
    patientToAssign,
  });
});

patientRoutes.post("/notify", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { patientId } = await c.req.json();

  const patient = await prisma.patient.findUnique({
    where: { patientId },
  });

  if (!patient) {
    return c.json({ message: "Patient not found" }, 404);
  }

  const message = `Dear ${patient.name}, your bed has been assigned at the hospital.`;

  await sendNotification(patient.contact, message);

  return c.json({ message: "Notification sent successfully" });
});
