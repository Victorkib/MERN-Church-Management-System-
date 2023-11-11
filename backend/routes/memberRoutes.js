const { Router } = require('express');
const memberRouter = Router();
const controller = require('../controllers/memberController');
const auth = require('../auth/auth');

memberRouter.get('/user', auth, controller.user_get);
memberRouter.patch('/userPatch', auth, controller.user_patch);
memberRouter.post('/signup', controller.signup_post);
memberRouter.post('/login', controller.login_post);
memberRouter.get('/logout', controller.logout_get);
memberRouter.get('/isLoggedIn', controller.isLoggedIn_get);

module.exports = memberRouter;
