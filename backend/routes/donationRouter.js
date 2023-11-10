const { Router } = require('express');
const donationRouter = Router();
const controller = require('../controllers/donationController');
const auth = require('../auth/auth');

donationRouter.post('/', auth, controller.donate_post);
donationRouter.get('/:id', controller.donator_get);

module.exports = donationRouter;
