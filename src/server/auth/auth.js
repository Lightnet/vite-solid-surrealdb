/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import {Router} from 'express'
import { isEmpty } from '../../../../libs/helper.js'

const router = Router()

router.post('/login', async (req, res) => {
  res.set('Content-Type', 'application/json');
  console.log(req.body)
  const {email, passphrase} = req.body;
  console.log(isEmpty(email))
  if(isEmpty(email) == true || isEmpty(passphrase) == true){
    res.send(JSON.stringify({api:'EMPTY'}))
    return;
  }
  try {
   
  } catch (error) {
    res.send(JSON.stringify({api:'Incorrect Access!'}))
    //console.log(error)
    console.log(error.message)
    return;
  }

  //res.send('echo')
})

router.post('/signup', async (req, res) => {
  res.set('Content-Type', 'application/json');
  console.log(req.body)
  const {email, passphrase} = req.body;

  if(!email || !passphrase){
    res.send(JSON.stringify({api:'EMPTY'}))
    return;
  }

  try {

    return;
    
  } catch (error) {
    res.send(JSON.stringify({api:'EXIST'}))
    //console.log(error)
    console.log(error.message)
    return;
  }

  res.send(JSON.stringify({api:'ERROR'}))
})

export default router;