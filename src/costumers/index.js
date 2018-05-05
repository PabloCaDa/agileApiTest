const router = require('express').Router();
const costumersController = require('./costumers.controller');
const { composeBlueprint } = require('../services/blueprint')

router.get('/',costumersController.getAllCostumers);
router.get('/:id',costumersController.getCostumersByID);
router.post('/',costumersController.createCostumers);
router.delete('/:id',costumersController.deleteCostumers);
router.patch('/:id',costumersController.editCostumers);

module.exports = router;
module.exports.blueprint = composeBlueprint(costumersController)