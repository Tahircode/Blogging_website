"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.SignupInput = exports.SigninInput = void 0;
var zod_1 = require("zod");
exports.SigninInput = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    // name:z.string().optional()
});
exports.SignupInput = zod_1.z.object({
    username: zod_1.z.string().email(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    //name:z.string().optional()
});
exports.createBlogInput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    //  authorId: z.string()
});
exports.updateBlogInput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    authorId: zod_1.z.string()
});
