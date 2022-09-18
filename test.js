import { createJWT, verifyToken } from "./libs/serverapi.js";

const payload = { "username": "user1",id:'test', "exp": 1547974082 };
/*
var buf = Buffer.from(JSON.stringify(payload)).toString('base64url');
console.log(buf)
console.log(Buffer.from(buf,'base64url').toString('ascii'))
let decode= JSON.parse(Buffer.from(buf,'base64url').toString('ascii'));
console.log(decode)
*/
let secret = 'test'

const token = createJWT(payload,secret);

console.log(token);

const user = verifyToken(token, secret);
console.log("USER DATA")
console.log(user)