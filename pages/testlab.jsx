/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { Link } from '@solidjs/router'
import { createEffect } from 'solid-js'
import Login from '../components/auth/surrealdb/TestSQL.jsx'
import UserQuery from '../components/auth/surrealdb/UserQuery.jsx'
//import { useAuth } from '../components/auth/AuthProvider';

export default function PageIndex() {

  //const [,{token}] = useAuth();

  return (
    <div>
      <UserQuery/>
      <Login/>
    </div>
  )
}