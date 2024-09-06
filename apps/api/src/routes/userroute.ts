import {Hono} from 'hono'
import {PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign,verify} from  'hono/jwt'
import { middleWare } from '../middleware/user';



export const userRoute = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_KEY: string
    }
}>();

userRoute.post("/signup",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();    
    try{
    const res = await prisma.user.create({
        data:{
            username: body.username,
            useremail: body.useremail,
            password: body.password
        },
        select:{
            userId:true
        }
        
    });

    const token = await sign({userId:res},c.env.DATABASE_URL);
    return c.json(token);
    
   

}catch(error){
    return c.json({"msg":"something went wrong while signup"},500)
}
})

userRoute.post("/Login", async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try{
        const res = await prisma.user.findFirst({
            where:{
                useremail:body.useremail,
                password: body.password
            },
            select:{
                userId:true
            }
        })

        const token = await sign({userId:res},c.env.DATABASE_URL);

        return c.json(token);

    }catch(error){
        return c.json("error while login")
    }
})


userRoute.get("/opdBeds",middleWare,async(c)=>{
    
})