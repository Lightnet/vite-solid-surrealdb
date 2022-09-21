/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { Link } from '@solidjs/router'
//import { createEffect } from 'solid-js'
import { useAuth } from '../AuthProvider';

export default function UserQuery() {

  const [,{token,clientDB}] = useAuth();

  const SurrealDB = clientDB()

  async function clickQuery(){
    await SurrealDB.use('test','test')
    let data = await SurrealDB.query('SELECT * FROM message;')
    console.log(data)
  }

  return (
    <div>
      <button onClick={clickQuery}>Query</button>
    </div>
  )
}