const express = require('express');
const { GetBaseSubscriptionPlans } = require('../controllers/subscriptionPlans/getBaseSubscriptionPlans');
const router = express.Router();

const getBasePlansController = new GetBaseSubscriptionPlans();
router.get(
    '/', 
        async (req,res) =>{
            await getBasePlansController.do(req,res)
        }
);

module.exports = router;
