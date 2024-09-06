import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {Hono} from 'hono';
import { sign } from 'hono/jwt';
import { adminMiddleware } from '../middleware/admin';




const adminRoute = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET: string
    }
}>()


adminRoute.post("/admin/signup",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try{
        const res = await  prisma.admin.create({
            data:{
                username:body.username,
                password:body.password
            },
            select:{
                adminId:true
            }
        })

        const token = sign({adminId:res},c.env.JWT_SECRET);
        return c.json({token});

    }catch(error){
        return c.json({"msg":"something went wrong while signup"})
    }
})

adminRoute.post('/admin/hospital',adminMiddleware,async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try{
        const res = await prisma.hospital.create({
            data:{
                hospitalName: body.hospitalName,
                
            },
            select:{
                hospitalId:true
            }
        })

        return c.json({"msg":"added the hospital detail successfully"});

    }catch(error){
        return c.json({"msg":"something went wrong while updating the hospital details"})
    }
})