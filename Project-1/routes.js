const fs = require ('fs'); //file system
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader ('Content-Type', 'text/html');
    res.write ('<html>');
    res.write ('<head><title>Enter Message</title></head>');
    res.write (
      '<head><form action= "/message" method="POST"><input type = "text" name = "message"><button type = "submit">Submit</button></head></form>'
    );
    return res.end ();
  }
  if (url === '/message' && method === 'POST') {
    const body = []; //request body
    req.on ('data', chunk => {
      console.log (chunk);
      body.push (chunk);
    });
    req.on ('end', () => {
      const parsedBody = Buffer.concat (body).toString ();
      console.log (parsedBody);
      const message = parsedBody.split (' ')[0];
      console.log(message);
      fs.writeFile ('message.txt', message, err => {
        
       // res.statusCode = 302;
        //res.setHeader ('Location', '/');
        return res.end ();
      });
    });
  }

  console.log("Hye");
  //res.setHeader ('Content-Type', 'text/html');
  res.write ('<html>');
  res.write ('<head><title> My first Node App</title></head>');
  res.write ('<head><h1>Welcome to my node app</head></h1>');
  res.end ();
};
module.exports = requestHandler;
