import { Hono } from 'hono'
import {PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {cors} from 'hono/cors'
import { sign } from 'hono/jwt'
const signup = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET:string
  }
  }>()
signup.post('/signup', async (c) => {
  const prisma=new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  const body= await c.req.json();
 try{
      const user= await prisma.user.create({
          data:{
              email: body.email,
              password: body.password
          }
      })
      console.log(user)
//  console.log("id is: ",user.id);
 const jwt=await sign({id:user.id},c.env.JWT_SECRET);
    }catch(e){
       console.log("error : ", e);
    }
   return c.json("{jwt}");

})

export {signup};







