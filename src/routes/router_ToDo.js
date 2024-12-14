const router = require('express').Router();
const todoController = require('../controllers').todo;
const verifyUser = require('../configs/verify');


router.get('/', verifyUser.isLogin, todoController.todo);

module.exports = router;