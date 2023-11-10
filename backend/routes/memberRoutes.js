const { Router } = require('express');
const memberRouter = Router();
const controller = require('../controllers/memberController');

memberRouter.post('/signup', controller.signup_post);
memberRouter.post('/login', controller.login_post);
memberRouter.get('/logout', controller.logout_get);

module.exports = memberRouter;
