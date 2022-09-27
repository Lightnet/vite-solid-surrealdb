/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { Router } from 'express';
import { isEmpty } from '../../../../libs/helper.js';
import UserModel from '../../../../libs/db/mongoose/user.js';
import cookie from 'cookie';
import { createJWT } from '../../../../libs/serverapi.js';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
config();

const SECRET = process.env.SECRET || "TEST0123456789012345678901";
console.log("process.env.SECRET: ",process.env.SECRET)
console.log("SECRET: ",SECRET)
const router = Router()

router.post('/login', async (req, res) => {
  res.set('Content-Type', 'application/json');
  //console.log(req.body)
  const {email, passphrase} = req.body;
  //console.log(isEmpty(email))
  if(isEmpty(email) == true || isEmpty(passphrase) == true){
    //console.log("EMPTY")
    res.send(JSON.stringify({api:'EMPTY'}))
    return;
  }
  try {
    //console.log("QUERY")
    let user;
    //console.log("email: ",email)
    user = await UserModel.findOne({email: email})
    //console.log("user: ",user)

    if(user){
      if(user.checkPassphrase(passphrase)){
        //console.log("Do SOMETHING???");
        let token = "";

        const userData ={
          id:uuidv4(),
          aliasID:user.aliasID,
          alias:user.alias,
          date: Date.now()
        }

        token = createJWT(userData, SECRET);
        //console.log(token)
        var setCookie = cookie.serialize('token', token,{
          httpOnly:true,
          path:"/",
          //maxAge: 60 * 60 * 24 * 7 // 1 week
          maxAge: 60 * 60 * 24 // day
        });
        //console.log(setCookie)
        res.setHeader('Set-Cookie',setCookie);
        //console.log("finish...")

        return res.send(JSON.stringify({api:'TOKEN',token:token}))
      }else{
        return res.send(JSON.stringify({api:'BADPASS!'}))  
      }
    }else{
      return res.send(JSON.stringify({api:'NOEXIST!'}))
    }
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
  const {alias, email, passphrase} = req.body;

  if(!email || !passphrase || !alias){
    res.send(JSON.stringify({api:'EMPTY'}))
    return;
  }

  try {
    let user = await UserModel.findOne({
      email: email
    })
    console.log("user: ",user)
    if(!user){
      const newUser = new UserModel({
        alias:alias,
        email:email
      });

      newUser.testFun();
      newUser.hashPassphrase(passphrase);

      newUser.save(function (err) {
        if (err) return handleError(err);
        console.log("save!")
        // saved!
      });
      res.send(JSON.stringify({api:'CREATED'}))
      return;
    }else{
      res.send(JSON.stringify({api:'EXIST'}))
      return;
    }
  } catch (error) {
    res.send(JSON.stringify({api:'EXIST'}))
    //console.log(error)
    console.log(error.message)
    return;
  }

  res.send(JSON.stringify({api:'ERROR'}))
})

router.get('/signout', async (req, res) => {
  res.set('Content-Type', 'application/json');
  console.log(req.body)

  // Parse the cookies on the request
  var dcookies = cookie.parse(req.headers.cookie || '');
  console.log("cookies:",dcookies)
  var setCookie = cookie.serialize('token', 'bar',{
    httpOnly:true,
    path:"/",
    maxAge: 0 //
  });
  console.log(setCookie)
  res.setHeader('Set-Cookie',setCookie);

  try {
    //let user = await UserModel.findOne({
      //email: email
    //})
    
  } catch (error) {
    //console.log(error)
    console.log(error.message)
    //return;
  }

  res.send(JSON.stringify({api:'ERROR'}))
})

router.post('/db', async (req, res) => {
  res.set('Content-Type', 'application/json');
  console.log("DB test...")
  const newUser = new UserModel({
    alias:"test",
    hash:"testpass",
  });

  await newUser.save();

  res.send(JSON.stringify({api:'ERROR'}))
})

export default router;