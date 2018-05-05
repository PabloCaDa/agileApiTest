const router = require('express').Router();
const usersController = require('./users.controller');
const { composeBlueprint } = require('../services/blueprint')

router.get('/',usersController.getAll);
router.get('/:id',usersController.getByID);
router.post('/',usersController.create);
router.delete('/:id',usersController.deleteByID);
router.patch('/:id',usersController.updateByID);

module.exports = router;
module.exports.blueprint = composeBlueprint(usersController)