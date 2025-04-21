import { PrismaClient } from "@prisma/client/scripts/default-index.js";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono"
import { verify } from "hono/jwt";

export default async function auth (c : any, next : any){
    const authHeader= c.req.header('Authorization') || "";
    if(!authHeader){
        c.status(401);
        return c.json({error:"unathorized"});
    }
    console.log("akaja ",authHeader)

    const token= authHeader.split(" ")[1];
    const response= await verify(token,c.env.JWT_SECRET);
    if(response){
        c.set("userId", String(response.id || "3d4863c3-9726-485e-9fc8-4a8c0e9cf945"))
        console.log("id : " , response.id)
        await next();
    } 
    else{
        c.status(403);
        return c.json({message:"you are not logged in"})
        }
}















