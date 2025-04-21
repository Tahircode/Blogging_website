import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import auth from "../middlewares/jwtAuth";
import { createBlogInput } from '@tahirr/medium-common'
import { updateBlogInput } from '@tahirr/medium-common'

const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string;
    };
}>();

//middleware use
blogRouter.use(auth);

//Post Blog

blogRouter.post('/create' ,  async (c) => {
    const body = await c.req.json();
    console.log("akash : ", c.get('userId'))
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const post = await prisma.post.create({
            data: {
                title: body.title || "",
                content: body.content || "",
                authorId: c.get("userId"),
            }
        })
        return c.json({
            id: post.id
        });
    } catch (e) {
        // c.status(403);
        console.log(e);
        return c.json({ msg: e})
    }
})

// Update Blog
blogRouter.put('/update', async (c) => {
    const bodyy = await c.req.json();
    const { success } = updateBlogInput.safeParse(bodyy);
    if (!success) {
        c.status(411);
        return c.json({
            msg: "inputs are not valid"
        })
    }
    try {
        const userId = c.get('userId');
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const body = await c.req.json();
        prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.text("updated Post");
    } catch (e) {
        c.status(403);
        return c.json({ msg: "error while updating" })
    }

})
//get blog
//get All Blogs

blogRouter.get('/bulk', async (c) => {

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        })
        const blogs = await prisma.post.findMany({
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

    return c.json({blogs});
    } catch (e) {
        console.log("error is: ", e)
        return c.json("error")
    }
})

blogRouter.get('/:id', async (c) => {
      try {
        const id = c.req.param('id');
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
        const post = await prisma.post.findUnique({
            where: {
                id: id
            },
            select: {
                id : true, 
                title :  true,  
                content : true ,
            author  : { 
                select : {
                    name : true 
                }
               }    
            }
        })
        return c.json({
            blog : post
        }); 
    } catch (e) {
        c.status(403);
        console.log("error is :",e)
        return c.json({ msg: "some error has occured while fetching" })
    }
})

export { blogRouter }







