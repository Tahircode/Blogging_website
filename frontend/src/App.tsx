// import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/blogs'
import { Publish } from './pages/Pusblish'

function App() {

return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path='' element={<div className='text-red-500 font-xl bg-red-400 mt-8'> hello </div>
    }></Route>
    <Route path = "/signup" element={<Signup/>}/>
    <Route path = "/signin" element={<Signin/>}/>
    <Route path = "/blog/:id" element={<Blog/>}/>
    <Route path = "/blogs" element={<Blogs/>}/>
    <Route path = "/publish" element={<Publish/> } />

  </Routes>
  </BrowserRouter>
  </>
)

  
}

export default App
