/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet

  Information:
    For JWT and node api 

*/

// https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/
// https://www.sohamkamani.com/nodejs/jwt-authentication/
// https://www.simplilearn.com/tutorials/nodejs-tutorial/jwt-authentication
// https://www.telerik.com/blogs/json-web-token-jwt-implementation-using-nodejs

import crypto from 'crypto'

//const jwt_header = { "alg": "HS256", "typ": "JWT" }
//const payload = { "username": "user1", "exp": 1547974082 };

function JsonToBase64url(data1){
  return Buffer.from(JSON.stringify(data1)).toString('base64url');
}

function Base64urlToJson(data1){
  return JSON.parse(Buffer.from(data1,'base64url').toString('ascii'));
}

const replaceSpecialChars = b64string => {
  // create a regex to match any of the characters =,+ or / and replace them with their // substitutes
  return b64string.replace (/[=+/]/g, charToBeReplaced => {
    switch (charToBeReplaced) {
      case '=':
        return '';
      case '+':
        return '-';
      case '/':
        return '_';
    }
  });
};

export function createJWT(_data, _secret){
  const json_header = { "alg": "HS256", "typ": "JWT" };
  const jwtheader = JsonToBase64url(json_header);

  const jwtpayload = JsonToBase64url(_data);

  let signature = crypto.createHmac('sha256', _secret);
  signature.update (jwtheader + '.' + jwtpayload);
  signature = signature.digest('base64url');
  //signature = replaceSpecialChars(signature);

  return jwtheader + '.' + jwtpayload + '.' + signature;
}

export function verifyToken(_token, _secret){
  try {
    const token = _token.split(".");
    //const header = Base64urlToJson(token[0])
    const payload = Base64urlToJson(token[1])
    const signature = token[2]
    console.log(signature)
    console.log(payload)

    let signature0 = crypto.createHmac('sha256', _secret);
    signature0.update (token[0] + '.' + token[1]);
    signature0 = signature0.digest('base64url');
    if(signature0 === signature){
      console.log("MATCH")
      return payload;
    }else{
      console.log("NO MATCH")
      return null;
    } 
  } catch (error) {
    console.log(error)
    return null;
  }
}
