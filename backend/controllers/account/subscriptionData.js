const SubscriptionPlan = require("../../db/models/SubscriptionPlan");
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class UserSubscriptionDataController {
    constructor() {

    }

    async do(req, res) {
        try {
            const {user, subscription, subscriptionPlan} = req;
            let onRenewal = subscriptionPlan;
            if(subscription.onRenewal.toString() !== subscriptionPlan._id.toString()) {
                onRenewal = await SubscriptionPlan.findOne({
                    _id: subscription.onRenewal
                });
            }

            let renewal_data = {

            }
            try {
                const stripe_id = subscription.stripe_id;
                if(stripe_id) {
                    const stripeSubscription = await stripe.subscriptions.retrieve(stripe_id);
                    const renewalDate = new Date(stripeSubscription.current_period_end * 1000);
                    const isSetToRenew = stripeSubscription.status === 'active';
                    renewal_data = {
                        renewalDate,
                        isSetToRenew
                    }
                }
            } catch (error) {
                console.log(error)
            }
            
            return res.status(200).send({
                subscription,
                subscriptionPlan,
                onRenewal,
                renewal_data
            });

        } catch (error) {
            console.log(error);
            return res.status(500).send({message: "Something went wrong getting user's subscription data"});
        }
        
    }
}

module.exports = {
    UserSubscriptionDataController
}