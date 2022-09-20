/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

//import { Link } from '@solidjs/router'
//import { createEffect } from 'solid-js'
//import { useAuth } from '../components/auth/AuthProvider';
import RootQuery from "../components/surrealdb/RootQuery";

export default function PageIndex() {

  //const [,{token}] = useAuth();

  return (
    <div>
      <RootQuery />
    </div>
  )
}