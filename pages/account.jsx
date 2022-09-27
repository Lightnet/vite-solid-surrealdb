/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import ChangeAlias from "../components/account/api/ChangeAlias";
import { useAuth } from "../components/auth/api/AuthProvider"

export default function PageAccount() {

  const [aliasID, setAliasID] = createSignal("")
  const [,{user,isLogin}] = useAuth();
  const navigate = useNavigate();

  console.log(isLogin())
  //if(!isLogin()){
    //return navigate("/", { replace: true })
  //}

  return (<>
  {isLogin() ? (
    <>
      <label>Alias: {user()}</label><br/>
      <ChangeAlias/>
    </>
  ):(
    <>
      <label>Not Login!</label>
    </>
  )}
  </>)
}