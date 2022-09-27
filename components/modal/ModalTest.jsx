/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { createEffect, createMemo, createSignal } from 'solid-js';
import Modal from './Modal';

export default function ModalTest() {

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

  return (<>
    <button onClick={openModal}> Modal </button>

    <Modal isopen={isModal} onClose={isCloseModal} enabledrag={true}>
      <label> Hello! </label>
    </Modal>
  </>)
}