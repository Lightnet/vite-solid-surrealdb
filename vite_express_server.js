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
import cors from "cors"
import routeAPI from  "./src/server/api.js"
//import { setupDatabase } from "./libs/db/surrealdb/database.js"
import { setupDatabase } from "./libs/db/mongoose/database.js"

//console.log("script server.js")

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  //res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Token');

  next();
}

const allowedOrigins = [
  'http://localhost:8000'
, 'http://localhost:3000'
, 'http://127.0.0.1:8000'
]
// https://expressjs.com/en/resources/middleware/cors.html#configuring-cors
// https://stackabuse.com/handling-cors-with-node-js/
async function createServer() {

  //main();
  //db = await getDB();
  await setupDatabase();

  const app = express()
  
  app.use(cors({
    //origin: ['http://localhost:3000/', 'http://localhost:8000/'],
    origin: function(origin, callback){
      //console.log(origin)
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    //allowedHeaders:['Content-Type','Authorization','X-Token'],
    preflightContinue: true,
    //methods: "GET,POST,DELETE,UPDATE,PUT,PATCH,OPTIONS",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH','OPTIONS'],
    //credentials: false, 
    credentials: true,
    optionsSuccessStatus: 204
  }))
  app.options('*', cors()) // include before other routes
  
  //app.use(allowCrossDomain);

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