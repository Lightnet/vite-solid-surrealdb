/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import Surreal from 'surrealdb.js'
import {Router} from 'express'
import { getDB } from '../../../libs/database.js'

const router = Router()

router.post('/login', async (req, res) => {
  res.set('Content-Type', 'application/json');
  console.log(req.body)
  const {alias, passphrase} = req.body;
  if(!alias || !passphrase){
    res.send(JSON.stringify({api:'EMPTY'}))
    return;
  }
  try {
    let db = await getDB();
    let token = await db.signin({
      NS: 'test',
      DB: 'test',
      SC: 'allusers',
      email: alias +'@surrealdb.test',
      pass: passphrase,
    });
    
    console.log(token)
    res.send(JSON.stringify({api:'TOKEN',token:token}))
    return;
    
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
  const {alias, passphrase} = req.body;

  if(!alias || !passphrase){
    res.send(JSON.stringify({api:'EMPTY'}))
    return;
  }

  try {
    let db = await getDB();
    let token = await db.signup({
      NS: 'test',
      DB: 'test',
      SC: 'allusers',
      //email: 'info@surrealdb.com',
      email: alias +'@surrealdb.test',
      //user:alias,
      //email:alias + '@test.com',
      pass: passphrase,
      marketing: true,
      tags: ['rust', 'golang', 'javascript'], // We can add any variable here to use in the SIGNUP clause
    });
    
    console.log(token)
    res.send(JSON.stringify({api:'CREATED'}))
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