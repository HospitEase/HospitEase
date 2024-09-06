import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { middleWare } from "../middleware/user";

export const patientRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

patientRoute.post("/patient", middleWare, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  try {
    const patient = await prisma.patient.create({
      data: {
        name: body.name,
        dob: new Date(body.dob),
        address: body.address,
        contact: body.contact,
        sex: body.sex,
        bedNo: body.bedNo,
        ayushmanCard: body.ayushmanCard,
        diagnosisHistory: body.diagnosisHistory,
        userId: body.userId || null,
      },
    });
    return c.json({ patient }, 201);
  } catch (error) {
    return c.json({ error: "Unable to create patient" }, 500);
  }
});

export default patientRoute;
