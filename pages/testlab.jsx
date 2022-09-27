/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { Link } from '@solidjs/router'
import { createEffect, createMemo, createSignal } from 'solid-js';
//import Login from '../components/auth/surrealdb/TestSQL.jsx'
//import UserQuery from '../components/auth/surrealdb/UserQuery.jsx'
//import Modal from '../components/modal/Modal.jsx'
import NotificationTest from '../components/notification/NotificationTest.jsx'
//import { useAuth } from '../components/auth/AuthProvider';
import NotifyTest from "../components/notify/NotifyTest"

//import XMLQuery from '../components/surrealdb/XMLQuery.jsx'
//import FetchQuery from '../components/surrealdb/FetchQuery.jsx'
//import AxiosQuery from '../components/surrealdb/AxiosQuery.jsx'
import ModalTest from '../components/modal/ModalTest.jsx';

export default function PageIndex() {

  function testDB(){
    let resp = fetch('/api/auth/db',{
      method:'POST',
      body:'test'
    })
  }

  /*
  <UserQuery/>
  <Login/>
  <FetchQuery/>
  <AxiosQuery/>
  <XMLQuery/>
  */

  return (
    <div>
      <NotificationTest/>
      <NotifyTest />
      <ModalTest />
    </div>
  )
}