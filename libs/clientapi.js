/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

export function jwtUser(token){
  try{
    const tokens = token.split(".")
    let data = atob(tokens[1])
    data = JSON.parse(data)
    return data;
  }catch(e){
    return null;
  }
}