/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

export function jwtUser(token){
  try{
    const tokens = token.split(".")
    let data = JSON.parse(atob(tokens[1]))
    return data;
  }catch(e){
    return null;
  }
}