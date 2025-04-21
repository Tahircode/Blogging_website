import { z } from 'zod';

export const SigninInput= z.object({
    username: z.string().email(),
    password: z.string().min(6),
   // name:z.string().optional()
})

export const SignupInput= z.object({

    username: z.string().email(),
    email: z.string().email(),
    password: z.string().min(6),
    //name:z.string().optional()
})

 export const createBlogInput = z.object({

     title: z.string(),
     content: z.string(),
    //  authorId: z.string()

 })

 export const updateBlogInput = z.object({

     title: z.string(),
     content: z.string(),
     authorId: z.string()

 })

 export type SigninInput = z.infer<typeof SigninInput>
 export type SignupInput = z.infer<typeof SignupInput>
 export type createBlogInput= z.infer<typeof createBlogInput>
 export type updateBlogInput= z.infer<typeof updateBlogInput>











