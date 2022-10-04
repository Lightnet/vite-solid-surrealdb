/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { useAuth } from "../auth/surrealdb/AuthProvider"
import TextEditor from "../texteditors/TextEditor";

export default function BlogPost() {

  return (<>
    <label> Comment </label>
    <TextEditor/>
  </>)
}