import { ChangeEvent, ChangeEventHandler,useState } from "react";
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Link, useNavigate } from "react-router-dom"

export const Auth = ({type}:{type:"signup" | "signin" }) =>{
  const navigate = useNavigate()
  const [postInputs,setPostInputs] = useState({
    name:"",
    username: "",
    password : "",
  
})
 async function sendRequest(){
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs);
      console.log("sup : " ,response.data)
      localStorage.setItem("token", `Bearer ${response.data.jwt}`);
      navigate("/blogs");
    }catch(e){ 
         alert("some error has occured")
    }
 } 
   return <div className="h-screen flex justify-center flex-col">
      {/* {JSON.stringify(postInputs)} */}
        <div className="flex justify-center">
            <div>
            <div className="px-10">
                <div className="text-3xl font-extrabold">
                    Create an account
                </div>
                <div className="text-slate-400">
                    {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                    <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin" }> 
                      {type === "signin" ? "Sign Up" : "Sign In "}
                    </Link>
                </div>
            </div>
            <div className="pt-4">
         { type == "signup" ? <LabeledInput label="Name" placeholder="tahir5" onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            name: e.target.value
          })
        }}/> : null }
           <LabeledInput label="Username" placeholder="tahir@gmail.com ..." onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            username: e.target.value
          })
        }}/>
        <LabeledInput label="Password" type={"password"} placeholder="1w2e34r5" onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            password: e.target.value
          })
        }}/>
        <button onClick={sendRequest} type="button" className="mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none 
        focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 
        dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up" : "Sign In"}</button>
        </div>
        </div>
        </div>
     </div>
  }
interface LabeledInputType {
    label: string;
    placeholder: string;
    onChange : (e: ChangeEvent<HTMLInputElement>)=>void
    type?: string
}
  function LabeledInput({label,placeholder,onChange,type}: LabeledInputType){
    return <div>
    <label  className="block mb-1 text-sm font-semibold text-black pt-4">{label}</label>
    <input onChange = {onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
    focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
</div>

  }



