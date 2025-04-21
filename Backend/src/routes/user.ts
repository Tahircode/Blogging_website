import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { cors } from 'hono/cors'
import { sign } from 'hono/jwt'
import { SigninInput } from '@tahirr/medium-common'
import { SignupInput } from '@tahirr/medium-common'

export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET:string
  }
  }>()
  //signup route
userRouter.post('/signup', async (c) => {
  console.log("Here 1")
const body = await c.req.json();
console.log(body)

const { success } = SignupInput.safeParse(body);
if(!success){
  c.status(411);
  return c.json({
    msg:"inputs are not valid"
  })
}
  const prisma=new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
 try{
      const user= await prisma.user.create({
          data:{
              email: body.username,
              password: body.password
          }
      })
 const jwt = await sign({id:user.id},c.env.JWT_SECRET);
 console.log("user created successfully")
 console.log(jwt)
 return c.json({ jwt});
    }catch(e){
      c.status(403);
      return c.json({error: e})
    }
})

//signin route
userRouter.post('/signin',async (c)=>{
  const body = await c.req.json();
const { success } = SigninInput.safeParse(body);
if(!success){
  c.status(411);
  return c.json({
    msg:"inputs are not valid"
  })
}
        const prisma=new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
        }).$extends(withAccelerate());
        try{
        const user = await prisma.user.findUnique({
            where:{
                email : body.username
                // password: body.password
            }
        });
        console.log("akash : " ,user)
        if(!user){
            c.status(403);
            return c.json({error:"user not found"})
        }
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
         return c.json({ jwt });
    }catch(e){
       c.status(403);
       return c.json({msg:e})
    }
    })














