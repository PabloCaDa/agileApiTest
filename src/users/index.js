const router = require('express').Router();
const usersController = require('./users.controller');

router.get('/',usersController.getAllUsers);
router.get('/:id',usersController.getUsersByID);
router.post('/',usersController.createUsers);
router.delete('/:id',usersController.deleteUsers);
router.patch('/:id',usersController.editUsers);

module.exports = router;