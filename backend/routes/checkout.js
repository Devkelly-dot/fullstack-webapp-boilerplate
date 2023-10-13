const express = require('express');
const { CreateCheckoutSessionController } = require('../controllers/checkout/createCheckoutSession');
const authenticateUser = require('../middleware/authenticateUser');
const router = express.Router();

const createCheckoutController = new CreateCheckoutSessionController();
router.post(
    '/', 
        async (req,res,next) => authenticateUser(req,res,next),
        async (req,res) =>{
            await createCheckoutController.do(req,res)
        }
);

module.exports = router;
