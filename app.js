



const express = require('express')
const bodyparser = require('body-parser')
const usersRouter = require('./routes/account')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001


app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}));


//app.use(express.static(path.join(__dirname, '/public')));
//app.get('/', (req, res) => res.sendfile('index.html'));

app.get('/', (req, res) => res.sendfile('./index.html'));

app.use('/', usersRouter)

module.exports = app.listen(port, () => console.log(`Listening on port ${port}!`))
//var server = ldap.createServer();

/*
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Init Project manager');
});*/
/*
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function authentificationDN(username, password){
  var client = ldap.createClient({
    url: 'ldap://127.0.0.1:8081'


    //10389
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
*/