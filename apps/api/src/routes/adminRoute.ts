import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { jwt, sign } from "hono/jwt";
import { adminMiddleware } from "../middleware/admin";
import { hash, compare } from "bcrypt";

export const adminRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

adminRoute.post("/admin/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const password = await hash(body.password, 10);
    const res = await prisma.admin.create({
      data: {
        username: body.username,
        password: password,
      },
      select: {
        adminId: true,
      },
    });

    const token = await sign({ adminId: res }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (error) {
    return c.json({ msg: "something went wrong while signup" });
  }
});

adminRoute.post("/admin/signin", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });

  try {
    const res = await prisma.admin.findFirst({
      where: {
        username: body.username,
      },
      select: {
        adminId: true,
        password: true,
      },
    });

    if (!res || !(await compare(body.password, res.password))) {
      return c.json({ msg: "invalid credentials" }, 401);
    }

    const token = await sign({ adminId: res }, c.env.JWT_SECRET);
    return c.json({ token, res }, 200);
  } catch (error) {
    return c.json({ msg: "something went wrong while admin login" });
  }
});

// only admin can populate thee hospital databse and only admin allow here
adminRoute.post("/admin/hospital", adminMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const res = await prisma.hospital.create({
      data: {
        hospitalName: body.hospitalName,
      },
      select: {
        hospitalId: true,
      },
    });

    return c.json({ msg: "added the hospital detail successfully" });
  } catch (error) {
    return c.json({
      msg: "something went wrong while updating the hospital details",
    });
  }
});

adminRoute.post("/admin/opdBed", async (c) => {
  const body = await c.req.json();
});
