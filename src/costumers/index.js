const router = require('express').Router();
const costumersController = require('./costumers.controller');
const { composeBlueprint } = require('../services/blueprint')

router.get('/',costumersController.getAll);
router.get('/:id',costumersController.getByID);
router.post('/',costumersController.create);
router.delete('/:id',costumersController.deleteByID);
router.patch('/:id',costumersController.updateByID);

module.exports = router;
module.exports.blueprint = composeBlueprint(costumersController)