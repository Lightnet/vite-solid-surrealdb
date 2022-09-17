/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import {Router} from 'express'
import { getDB } from '../../libs/database.js'
import auth from "./auth/auth.js"

const router = Router()

router.use('/auth',auth)

// define the home page route
router.get('/echo', (req, res) => {
  res.send('echo')
})

router.get('/db', async (req, res) => {
  let db = await getDB()
  console.log(db)
  res.send('db')
})

export default router;