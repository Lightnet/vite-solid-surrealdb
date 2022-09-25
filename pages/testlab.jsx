/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { Link } from '@solidjs/router'
import { createEffect, createMemo, createSignal } from 'solid-js'
import Login from '../components/auth/surrealdb/TestSQL.jsx'
import UserQuery from '../components/auth/surrealdb/UserQuery.jsx'
import Modal from '../components/modal/Modal.jsx'
//import { useAuth } from '../components/auth/AuthProvider';
import NotifyTest from "../components/notify/NotifyTest"

export default function PageIndex() {

  //const [,{token}] = useAuth();

  const [isOpenModal, setIsOpenModal] = createSignal(false);
  function isCloseModal(){
    setIsOpenModal(false)
  }

  function openModal(){
    setIsOpenModal(true)
  }

  const isModal = createMemo(()=>{
    console.log("isOpenModal: ",isOpenModal())
    return isOpenModal()
  })

  return (
    <div>
      <UserQuery/>
      <Login/>
      <NotifyTest />
      <button onClick={openModal}> Modal </button>
      <Modal isopen={isModal} onClose={isCloseModal} enabledrag={true}>
        <label> Hello! </label>
      </Modal>
    </div>
  )
}