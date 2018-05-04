const router = require('express').Router();
const authController = require('./auth.controller')

router.post('/signin',authController.signin);

module.exports= router;
module.exports.middleware = require('./middleware')
