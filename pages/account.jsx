/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import ChangeAlias from "../components/account/ChangeAlias";
import { useAuth } from "../components/auth/surrealdb/AuthProvider"

export default function PageAccount() {
  const [aliasID, setAliasID] = createSignal("")
  const [,{token}] = useAuth();
  const navigate = useNavigate();
  console.log(token())
  if(!token()){
    return navigate("/", { replace: true })
  }
  let jwt = token().split(".")
  //console.log(atob(jwt[1]))
  let data = JSON.parse(atob(jwt[1]))
  //console.log(data)
  setAliasID(data.id)
  return (<>
  {token() ? (
    <>
      <label>ID: {aliasID()}</label><br/>
      <ChangeAlias/>
      
    </>
  ):(
    <>
      <label>Not Login!</label>
    </>
  )}
  </>)
}