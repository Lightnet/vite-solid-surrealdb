https://www.w3schools.com/nodejs/nodejs_email.asp

https://nodemailer.com/about/

```js
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@test.test',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@test.com',
  to: 'myfriend@test.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
```

```js
const nodemailer = require("nodemailer");
let testAccount = await nodemailer.createTestAccount();

```

https://www.courier.com/docs/guides/providers/email/mailgun/

https://www.courier.com/blog/how-to-send-emails-with-node-js/







