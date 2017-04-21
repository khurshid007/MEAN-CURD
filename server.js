var express = require('express');
var app = express();
//var server = require('http').createServer(app);
//var http = require('http');
var fileUpload = require('express-fileupload');

app.use(express.static(__dirname + '/public'));
app.use(fileUpload())

app.get("/",function (req,res) {
    res.sendFile("index.html");
});
app.get("/gagan",function (req,res) {
    res.status(200).send("sdfkldjfldkfhjdghajlgsa");
});
app.post("/api/fileService/uploadFile",function (req,res) {
   var sampleFile;
 
  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  sampleFile = req.files.file;
 
  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv(sampleFile.name, function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.send('File uploaded!');
    }
  });
});


app.listen(1402);

console.log('listen 1402')