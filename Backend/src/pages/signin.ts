
import { PrismaClient } from "@prisma/client/scripts/default-index.js"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Hono } from "hono"
import { sign } from "hono/jwt"
const signin= new Hono<{
Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
}
}>()

signin.post('/signin',async (c)=>{
 
    const prisma=new PrismaClient({
        databaseUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate);

    const body = await c.req.json();
    const user= await prisma.user.findUnique({
        where:{
            email: body.email
        }
    });
    if(!user){
        c.status(403);
        return c.json({error:"user not found"})
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
     return c.json({ jwt });
})
export {signin}

