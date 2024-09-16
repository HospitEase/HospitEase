import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { adminMiddleware as adminAuth  } from '../middleware/admin';

const hospitalRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string
    }
}>();

hospitalRouter.post('/', adminAuth, async (c) => {
  const { hospitalName } = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
});

  const hospital = await prisma.hospital.create({
    data: {
      hospitalName,
    },
  });

  return c.json(hospital);
});


hospitalRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    });
  const hospitals = await prisma.hospital.findMany();
  return c.json(hospitals);
});


hospitalRouter.put('/:hospitalId', adminAuth, async (c) => {
  const hospitalId = c.req.param('hospitalId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
});
  const { hospitalName } = await c.req.json();

  const updatedHospital = await prisma.hospital.update({
    where: { hospitalId },
    data: { hospitalName },
  });

  return c.json(updatedHospital);
});


hospitalRouter.delete('/:hospitalId', adminAuth, async (c) => {
  const hospitalId = c.req.param('hospitalId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
});

  await prisma.hospital.delete({
    where: { hospitalId },
  });

  return c.json({ message: 'Hospital deleted successfully' });
});


hospitalRouter.post('/:hospitalId/opdbeds', adminAuth, async (c) => {
  const hospitalId = c.req.param('hospitalId');
  const { patientId, bedStatus } = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
});

  const opdBed = await prisma.oPDBed.create({
    data: {
      hospitalId,
      patientId,
      bedStatus,
    },
  });

  return c.json(opdBed);
});


hospitalRouter.put('/:hospitalId/opdbeds/:patientId', adminAuth, async (c) => {
  const hospitalId = c.req.param('hospitalId');
  const patientId = c.req.param('patientId');
  const { bedStatus } = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
});

  const updatedOPDBed = await prisma.oPDBed.update({
    where: {
      hospitalId_patientId: { hospitalId, patientId },
    },
    data: { bedStatus },
  });

  return c.json(updatedOPDBed);
});


hospitalRouter.delete('/:hospitalId/opdbeds/:patientId', adminAuth, async (c) => {
  const hospitalId = c.req.param('hospitalId');
  const patientId = c.req.param('patientId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
});
  await prisma.oPDBed.delete({
    where: {
      hospitalId_patientId: { hospitalId, patientId }, 
    },
  });

  return c.json({ message: 'OPDBed deleted successfully' });
});

export { hospitalRouter };
