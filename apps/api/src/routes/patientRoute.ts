import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { middleWare } from "../middleware/user";

const patientRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// Create a patient and allot one bed if available
patientRouter.post("/patient-details", middleWare, async (c) => {
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
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const patient = await prisma.patient.create({
    data: {
      name,
      dob: new Date(dob),
      address,
      contact,
      sex,
      ayushmanCard,
      diagnosisHistory,
      userId,
    },
  });

  const availableBeds = await prisma.oPDBed.findMany({
    where: {
      bedStatus: "empty",
    },
  });

  let bedAssignmentMessage = "No bed available";

  if (availableBeds.length > 0) {
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

    bedAssignmentMessage = `Bed assigned at Hospital ID: ${bedToAssign.hospitalId}`;
  }

  return c.json({
    patient,
    bedAssignment: bedAssignmentMessage,
  });
});

patientRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });
  const patients = await prisma.patient.findMany({
    include: {
      opdbeds: {
        include: {
          hospital: true,
        },
      },
    },
  });

  // Map patients to include relevant bed and hospital details
  const patientsWithBedInfo = patients.map((patient) => ({
    ...patient,
    bedStatus: patient.opdbeds.length > 0 ? "Assigned" : "Not Assigned",
    hospital: patient.opdbeds.length > 0 ? patient.opdbeds[0].hospital : null,
  }));

  return c.json(patientsWithBedInfo);
});

// Get a specific patient by ID along with bed and hospital information
patientRouter.get("/:patientId", async (c) => {
  const patientId = c.req.param("patientId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const patient = await prisma.patient.findUnique({
    where: { patientId },
    include: {
      opdbeds: {
        include: {
          hospital: true,
        },
      },
    },
  });

  if (!patient) return c.json({ message: "Patient not found" }, 404);

  // Include bed and hospital information in the response
  const patientWithBedInfo = {
    ...patient,
    bedStatus: patient.opdbeds.length > 0 ? "Assigned" : "Not Assigned",
    hospital: patient.opdbeds.length > 0 ? patient.opdbeds[0].hospital : null,
  };

  return c.json(patientWithBedInfo);
});

export { patientRouter };
