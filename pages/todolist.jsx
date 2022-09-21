/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

//import { Link } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'
import { useAuth } from '../components/auth/AuthProvider';

export default function PageIndex() {

  const [task, setTask] = createSignal("")

  const [,{token}] = useAuth();

  function getTask(){

  }

  function AddTask(){

  }

  function editTask(){

  }

  function deleteTask(){

  }


  return (
    <div>
      <label>Home</label><span> | </span>
      <input value={task()} onInput={(e)=>setTask(e.target.value)}/><button onClick={AddTask}>Add</button>
      <div>

      </div>
    </div>
  )
}