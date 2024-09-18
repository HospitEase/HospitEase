import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { adminMiddleware } from "../middleware/admin";

const hospitalRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

hospitalRouter.post("/hospital", adminMiddleware, async (c) => {
  const { hospitalName, hospitalAddress } = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const hospital = await prisma.hospital.create({
    data: {
      hospitalName,
      hospitalAddress,
    },
  });

  return c.json(hospital);
});

hospitalRouter.get("/hospital-deatails", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const hospitals = await prisma.hospital.findMany();
  return c.json(hospitals);
});

hospitalRouter.get("/hospital-deatails/hospitalId", async (c) => {
  const hospitalId = c.req.param("hospitalId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const hospitals = await prisma.hospital.findFirst({
    where: {
      hospitalId: hospitalId,
    },
    select: {
      hospitalName: true,
    },
  });
  return c.json(hospitals);
});

hospitalRouter.put("/:hospitalId", adminMiddleware, async (c) => {
  const hospitalId = c.req.param("hospitalId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { hospitalAddress } = await c.req.json();

  const updatedHospital = await prisma.hospital.update({
    where: { hospitalId },
    data: { hospitalAddress },
  });

  return c.json(updatedHospital);
});

hospitalRouter.delete("/:hospitalId", adminMiddleware, async (c) => {
  const hospitalId = c.req.param("hospitalId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  await prisma.hospital.delete({
    where: { hospitalId },
  });

  return c.json({ message: "Hospital deleted successfully" });
});

hospitalRouter.post("/:hospitalId/opdbeds", adminMiddleware, async (c) => {
  const hospitalId = c.req.param("hospitalId");
  const { patientId, bedStatus } = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const opdBed = await prisma.oPDBed.create({
    data: {
      hospitalId,
      patientId,
      bedStatus,
    },
  });

  return c.json(opdBed);
});

hospitalRouter.put(
  "/:hospitalId/opdbeds/:patientId",
  adminMiddleware,
  async (c) => {
    const hospitalId = c.req.param("hospitalId");
    const patientId = c.req.param("patientId");
    const { bedStatus } = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const updatedOPDBed = await prisma.oPDBed.update({
      where: {
        hospitalId_patientId: { hospitalId, patientId },
      },
      data: { bedStatus },
    });

    return c.json(updatedOPDBed);
  },
);

hospitalRouter.delete(
  "/:hospitalId/opdbeds/:patientId",
  adminMiddleware,
  async (c) => {
    const hospitalId = c.req.param("hospitalId");
    const patientId = c.req.param("patientId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    await prisma.oPDBed.delete({
      where: {
        hospitalId_patientId: { hospitalId, patientId },
      },
    });

    return c.json({ message: "OPDBed deleted successfully" });
  },
);

export { hospitalRouter };
