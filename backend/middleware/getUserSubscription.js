const Subscription = require('../db/models/Subscription');

require('dotenv').config()

async function getUserSubscription(req, res, next) {
    try {
        const user = req.user;
        if(!user) {
            throw new Error("getUserSubscription middlware used without authenticating user");
        }

        const subscription = await Subscription.findOne({
            user: req.user._id
        });

        if(!subscription) {
            throw new Error(`User ${user._id} has no subscription`);
        }
        req.subscription = subscription;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({message: "Could not get user's subscription"})
    }      
}

module.exports = getUserSubscription;