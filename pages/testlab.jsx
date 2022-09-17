/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { Link } from '@solidjs/router'
import { createEffect } from 'solid-js'
import Login from '../components/auth/surrealdb/Login'
//import { useAuth } from '../components/auth/AuthProvider';

export default function PageIndex() {

  //const [,{token}] = useAuth();

  return (
    <div>
      <Login/>
    </div>
  )
}