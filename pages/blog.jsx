/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import ChangeAlias from "../components/account/ChangeAlias";
import { useAuth } from "../components/auth/surrealdb/AuthProvider"

export default function PageBlog() {

  const [blogs, setBlogs] = createSignal([])

  const [blogID, setBlogID] = createSignal("")
  const [editblogID, setEditBlogID] = createSignal("")

  
  const [blogTitle, setBlogTitle] = createSignal("")
  const [blogContent, setBlogContent] = createSignal("")
  

  async function getBlogs(){

  }

  async function addBlogs(){

  }

  async function removeBlogs(){

  }

  async function addBlogComment(){

  }

  async function removeBlogComment(){

  }

  return (<>
  <div>
    <label> Title </label> <input value={blogTitle()} onInput={(e)=>setBlogTitle(e.target.value)} /><br/>
    <label> Content </label>
    <textarea  value={blogContent()} onInput={(e)=>setBlogContent(e.target.value)} ></textarea><br/>
    <button onClick={addBlogs}> Create </button>
  </div>
  <div>

  </div>
  </>)
}