import axios from 'axios';

function textToBase64(_data){
  //note this is nodejs not browser support
	return Buffer.from(_data).toString('base64');
}
function query00(){
  let query = "SELECT * FROM user;"
  axios({
    method: 'POST',
    url: 'http://localhost:8000/sql',
    headers: {
      'Accept': 'application/json',
      'NS':'test',
      'DB':'test',
      'Authorization': 'Basic ' + textToBase64('root'+':'+'root')
    },
    data: query
  }).then(resp=>{
    console.log(resp.data)
  }).catch(err=>{
    //console.log(err)
    console.log(err.code)
    console.log(err.message)
  })
}

function query01(){
  let query = "SELECT * FROM user;"
  axios.post('http://localhost:8000/sql', query, {
    headers: {
      'Accept': 'application/json',
      'NS':'test',
      'DB':'test',
      'Authorization': 'Basic ' + textToBase64('root'+':'+'root')
    }
  }).then(resp=>{
    console.log(resp.data)
  }).catch(err=>{
    console.log(err)
    console.log(err.code)
    console.log(err.message)
  })
}


query00();
//query01();
