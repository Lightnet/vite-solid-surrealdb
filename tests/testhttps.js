
// just testing...
// https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html

import https from 'https';

function textToBase64(_data){
  //note this is nodejs not browser support
	return Buffer.from(_data).toString('base64');
}

function base64ToText(_data){
  //note this is nodejs not browser support
	return Buffer.from(_data,'base64url').toString('ascii')
}

function rootQuery01(){
  var options = {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'NS': 'test', // Specify the namespace
      'DB': 'test', // Specify the database
      "Authorization": 'Basic ' + textToBase64('root'+':'+'root') ,
    },
    //auth:'root'+':'+'root'
  };

  const request = https.request('https://localhost:8000/sql',options,res=>{
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    //console.log(res)
    let data = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
      data += chunk;
    });
    res.on('end', () => {
      console.log('No more data in response.');
      console.log(JSON.parse(data));
    });
  })
  request.write(`SELECT * FROM user;`);
  request.end();
}

try{
  rootQuery01();
}catch(e){
  console.log(e)
}