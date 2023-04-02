const User = require('../models/user');

module.exports.profile=function(req,res){
    res.end(`<h1>PROFILE</h1>`);
}

module.exports.signUp=function(req,res){
  res.render('user_sign_up',{title:'CODIAL SIGN UP',flash:{success:false}})
}

module.exports.signIn=function(req,res){
  res.render('user_sign_in',{title:'CODIAL SIGN IN',flash:{success:false}})
}
// get the sign up data
module.exports.create = async function(req, res){
  if (req.body.password != req.body.confirm_password){
      return res.redirect('back');
  }
  try {
    const user= await User.findOne({email: req.body.email});
    if(user) return res.redirect('/users/sign-in');
    await User.create(req.body);
    return res.redirect('/users/sign-in');// created user can now sign in
  }catch(err){
    console.error('error in finding user');
    return;
  }
}
// sign-in and create a session for the user
module.exports.createSession=function(req,res){
  res.render('user_sign_in',{title:'CODIAL SIGN IN',flash:{success:false}})
}



/*
-------------------------------------    DIFFERENT TYPES OF RESPONSES POSSIBLE
// 1. Send plain text as response
res.send('Hello, world!');

// 2. Send JSON as response
const data = { message: 'Hello, world!' };
res.json(data);

// 3. Send a file as response
const fileName = 'example.txt';
res.sendFile(fileName, { root: __dirname });

// 4. Send an HTML page as response
const html = '<html><body><h1>Hello, world!</h1></body></html>';
res.send(html);

// 5. Send a redirect response
res.redirect('/new-page');
res.redirect ('back');

// 6. Send a custom status code and message as response
res.status(404).send('Page not found');

// 7. Set a response header
res.set('Content-Type', 'text/plain');
res.send('Hello, world!');

// 8. Send a response with a cookie
res.cookie('cookieName', 'cookieValue');
res.send('Hello, world!');

// 9. Send a response with a custom header and status code
res.set('X-Custom-Header', 'custom-value');
res.status(200).send('OK');

// 10. Send a response with an attachment
const filePath = 'example.pdf';
res.attachment(filePath);
res.send('Hello, world!');

// 11. Send a response with a downloadable file
const fileDownloadName = 'example.pdf';
const fileData = Buffer.from('example data');
res.set('Content-Disposition', `attachment; filename=${fileDownloadName}`);
res.send(fileData);

// 12. Send a response with a stream
const fs = require('fs');
const filePath = 'example.txt';
const stream = fs.createReadStream(filePath);
stream.pipe(res);

// 13. Send a response with a compressed file
const zlib = require('zlib');
const filePath = 'example.txt';
const stream = fs.createReadStream(filePath);
const gzip = zlib.createGzip();
res.set('Content-Encoding', 'gzip');
stream.pipe(gzip).pipe(res);

// 14. Send a response with a range of bytes
const filePath = 'example.txt';
const fileSize = fs.statSync(filePath).size;
const range = req.headers.range;
if (range) {
  const parts = range.replace(/bytes=/, '').split('-');
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  const chunkSize = end - start + 1;
  const file = fs.createReadStream(filePath, { start, end });
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
    'Content-Type': 'text/plain',
  };
  res.writeHead(206, headers);
  file.pipe(res);
} else {
  res.writeHead(200, {
    'Content-Length': fileSize,
    'Content-Type': 'text/plain',
  });
  fs.createReadStream(filePath).pipe(res);
}

// 15. Send a response with a renderred template
const name = 'John Doe';
res.render('template', { name });

* */
