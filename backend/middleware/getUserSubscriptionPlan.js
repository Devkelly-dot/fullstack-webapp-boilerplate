const SubscriptionPlan = require('../db/models/SubscriptionPlan');

require('dotenv').config()

async function getUserSubscriptionPlan(req, res, next) {
    try {
        const subscription = req.subscription;
        if(!subscription) {
            throw new Error("getUserSubscriptionPlan middlware used without authenticating subscription");
        }

        const subscriptionPlan = await SubscriptionPlan.findOne({
            _id: req.subscription.subscriptionPlan
        });

        req.subscriptionPlan = subscriptionPlan;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({message: "Could not get user's subscriptionPlan"})
    }      
}

module.exports = getUserSubscriptionPlan;