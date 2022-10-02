/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

//import { Link } from '@solidjs/router'
//import { createEffect } from 'solid-js'
//import { useAuth } from '../components/auth/AuthProvider';
import AxiosQuery from "../components/surrealdb/AxiosQuery";
import FetchQuery from "../components/surrealdb/FetchQuery";
import SurrealDBQuery from "../components/surrealdb/SurrealDBQuery";
import XMLQuery from "../components/surrealdb/XMLQuery";

export default function PageIndex() {

  //const [,{token}] = useAuth();

  return (
    <div>
      <FetchQuery />
      <AxiosQuery />
      <XMLQuery />
      <SurrealDBQuery />
    </div>
  )
}