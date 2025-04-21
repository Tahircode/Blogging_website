
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blog {
    "id": number,
    "title": string,
    "content": string,
    "author": {
        "name": string
    }
}

export const useBlog= ( { id } : {id : string})=>{

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    console.log("first  ")
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false)
            })
    }, [id])
    console.log("first success!! ")
    return { loading, blog };

}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    console.log("first  ")
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false)
            })
    }, [])
    console.log("first success!! ")
    return { loading, blogs };
}


