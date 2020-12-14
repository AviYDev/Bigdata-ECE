const http = require('http');
var express = require('express');
var ldap = require('ldapjs');
var app = express();
const hostname = '127.0.0.1';
const port = 3000;
//var server = ldap.createServer();

/*
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Init Project manager');
});*/

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function authentificationDN(username, password){
  var client = ldap.createClient({
    url: 'ldap://127.0.0.1:10389'
  });
  client.bind(username, password, function(err) {
    if(err){
      console.error("Error in new connection "+err)
    }else{
      console.log("Success")
    }
  });
}

authentificationDN("uid=admin,ou=system","secret");