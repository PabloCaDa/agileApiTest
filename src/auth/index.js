const router = require('express').Router();
const authController = require('./auth.controller')
const { composeBlueprint } = require('../services/blueprint')

router.post('/signin',authController.signin);

module.exports= router;
module.exports.middleware = require('./middleware')
module.exports.blueprint = composeBlueprint(authController)
