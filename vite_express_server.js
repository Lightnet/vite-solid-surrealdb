/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import fs from 'fs'
import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
//import Gun from "gun";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { createServer as createViteServer } from 'vite'
//import routeAPI from  "./src/server/api.js"
//import * as vite from 'vite'

import routeAPI from  "./src/server/api.js"
import {getDB} from "./libs/database.js"
let db;

console.log("script server.js")

async function createServer() {

  //main();
  db = await getDB();

  const app = express()
  app.use(express.json());

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    //appType: './index.html' // don't include Vite's default HTML handling middlewares
    appType: 'custom' // don't include Vite's default HTML handling middlewares
  })
  // Use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.use('/api',routeAPI);

  app.use('*',async (req, res) => {
    const url = req.originalUrl
    let template = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    )
    template = await vite.transformIndexHtml(url, template)
    const html = template;
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  });

  //app.use('*', async (req, res) => {
    // Since `appType` is `'custom'`, should serve response here.
    // Note: if `appType` is `'spa'` or `'mpa'`, Vite includes middlewares to handle
    // HTML requests and 404s so user middlewares should be added
    // before Vite's middlewares to take effect instead
  //})

  const PORT = 3000;
  const server = app.listen(PORT, err => {
    if (err) throw err;
    //console.log(app);
    console.log(`> Running on http://localhost:`+PORT);
  })
  console.log("init server...")
}

try{
  createServer()
}catch(e){
  console.log(e)
}