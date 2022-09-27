/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import Surreal from 'surrealdb.js'
import {Router} from 'express'
import { getDB } from '../../../../libs/db/surrealdb/database.js'
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
    console.log("process?")
    let db = await getDB();
    // note that need another Instance as it overlap the login from server root else account can view other users
    await Surreal.Instance.connect('http://localhost:8000/rpc');
    await Surreal.Instance.use("test", "test");

    console.log(email);
    
    let surrealToken = await Surreal.Instance.signin({
      NS: 'test',
      DB: 'test',
      SC: 'allusers',
      email: email,
      pass: passphrase,
    });
    await Surreal.Instance.close()//close connect since were doing getting access
    /*
    let token = "Test"

    let query = await db.query(`SELECT * FROM user`);
    console.log("query users")
    console.log(query)

    let users = await db.query(`SELECT * FROM user WHERE email = $email`,{
      email: alias +'@surrealdb.test',
    });

    console.log("users")
    console.log(users)
    console.log(users[0].result[0])
    */
    console.log(surrealToken)
    res.send(JSON.stringify({api:'TOKEN',token:surrealToken}))
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
  const {email, passphrase} = req.body;

  if(!email || !passphrase){
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
      email: email,
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