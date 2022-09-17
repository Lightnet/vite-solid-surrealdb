/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { Link } from '@solidjs/router'
import { createEffect } from 'solid-js'
import { useAuth } from '../components/auth/AuthProvider';

export default function PageIndex() {

  const [,{token}] = useAuth();

  return (
    <div>
      <label>Home</label><span> | </span>
      {token()?(<>
        <Link href='/signout'>Sign Out</Link><span> | </span>
      </>):(<>
        <Link href='/signin'>Sign In</Link><span> | </span>
        <Link href='/signup'>Sign Up</Link><span> | </span>
      </>)}
      
    </div>
  )
}