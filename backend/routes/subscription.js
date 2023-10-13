const express = require('express');
const authenticateUser = require('../middleware/authenticateUser');
const getUserSubscription = require('../middleware/getUserSubscription');
const { ChangeRenewController } = require('../controllers/subscription/changeRenew');
const router = express.Router();

const changeRenewController = new ChangeRenewController();
router.patch(
    '/renewal/modify', 
        async (req,res,next) => authenticateUser(req,res,next),
        async (req,res,next) => getUserSubscription(req,res,next),
        async (req,res) =>{
            await changeRenewController.do(req,res)
        }
);

module.exports = router;
