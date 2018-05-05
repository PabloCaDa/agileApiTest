const crypto = require('crypto')
const { createJAR } = require('../services/jsonapi')
const config = require('./config.js')
const jwt = require('jsonwebtoken')
const USERModel = require('../users/users.model')
const {PATH} = require('./constants')

module.exports = {
    signin:signin
}

function signin (req,res) {
    const { username , password } = req.body
    let hash = crypto.createHash('sha256').update(password).digest('hex')
    getUserFromDB(username)
    .then(response => {
        if(response.length === 0) return res.sendStatus(401);
        let payload = {
            username : response[0].username,
            admin : response[0].admin
        }
        let token =  jwt.sign(payload, config.TOKEN_SECRET,{expiresIn: '24h'});
         return hash == response[0].password
            ? res.send(createJAR('auth-token', token))
            : res.sendStatus(401);
    })
    .catch((err) => res.sendStatus(500))
}

function getUserFromDB (username){
    return USERModel.find({ username: username })
}

module.exports.signin.blueprint = `
## POST ${PATH}/
+ Request (application/json)
  + Body
    {
        username: 'StanL',
        password: '111',

    }
+ Response 201 (application/json)
{
    
    type: 'auth-token',
    attributes: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN0YW5MIiwiYWRtaW4iOnRydWUsImlhdCI6MTUyNTUzMzczMywiZXhwIjoxNTI1NjIwMTMzfQ.wGvUv21eKG8nt40bGeVL-c1OtfGDlY88P9iAq1yI9KM'

  }
`

