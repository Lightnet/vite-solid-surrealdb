// 
// can't get it to work...
// https://nodejs.org/api/http.html#httprequestoptions-callback
// https://nodejs.org/en/knowledge/HTTP/clients/how-to-create-a-HTTP-request/
// https://blog.logrocket.com/5-ways-to-make-http-requests-in-node-js/
// 
// 


import http from 'http';

function textToBase64(_data){
  //note this is nodejs not browser support
	return Buffer.from(_data).toString('base64');
}

function base64ToText(_data){
  //note this is nodejs not browser support
	return Buffer.from(_data,'base64url').toString('ascii')
}


function rootQuery(){
  var options = {
    //host: 'localhost', // 'localhost' default
    port: 8000,
    path: '/sql',
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'NS': 'test', // Specify the namespace
      'DB': 'test', // Specify the database
      "Authorization": 'Basic ' + textToBase64('root'+':'+'root') ,
    },
    //auth:'root'+':'+'root'
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  console.log(req)

  let postData = "SELECT * FROM user;";
  // Write data to request body
  req.write(postData);
  req.end();
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

  const request = http.request('http://localhost:8000/sql',options,res=>{
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
  //rootQuery();
  rootQuery01();
}catch(e){
  console.log(e)
}

/*
const callback = function(response) {
  var str = '';

  //another chunk of data has been received, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been received, so we just print it out here
  response.on('end', function () {
    console.log(str);
    let body = Buffer.concat(str).toString();
    console.log(body);
  });
}
*/
//http.request(options, callback).end();