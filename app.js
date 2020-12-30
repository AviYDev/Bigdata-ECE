



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

app.get('/', (req, res) => res.sendfile('./index.html'));

app.use('/', usersRouter)

module.exports = app.listen(port, () => console.log(`Listening on port ${port}!`))
