const jwt = require('jsonwebtoken')
const config = require('../config.js')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  jwt.verify(token, config.TOKEN_SECRET, (err,decoded) => {
      if(!decoded.admin) return res.sendStatus(401)
      if (err) return res.sendStatus(403)
      req.auth = decoded
      
      next()
  })
}