import axios from 'axios';

function textToBase64(_data){
  //note this is nodejs not browser support
	return Buffer.from(_data).toString('base64');
}
let query = "SELECT * FROM user;"
//console.log(query.length)
/*
axios({
  method: 'post',
  url: 'http://localhost:8000/sql',
  headers: {
    //'Content-Length': query.length,
    //'Accept':'text/plain',
    'content-type': 'application/json',
    //'content-type': 'text/html',
    //'content-type': 'text/plain',
    'NS':'test',
    'DB':'test',
    'Authorization': 'Basic ' + textToBase64('root'+':'+'root')
  },
  //responseType:'text',
  //data: query
  data: Buffer.from(query).toString('base64')
}).then(data=>{
  console.log(data)
}).catch(err=>{
  //console.log(err)
  console.log(err.code)
  console.log(err.message)
})
*/
axios.post('http://localhost:8000/sql',
query
,{
  headers: {
    'content-type': 'application/json',
    'NS':'test',
    'DB':'test',
    'Authorization': 'Basic ' + textToBase64('root'+':'+'root')
  }
}).then(data=>{
  console.log(data)
}).catch(err=>{
  console.log(err)
  console.log(err.code)
  console.log(err.message)
})