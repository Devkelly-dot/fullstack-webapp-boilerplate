require('dotenv').config()
const Subscription = require('../../db/models/Subscription');
const { CanceledByWebhookService } = require('../../services/subscriptions/cancelSubscription/cancelSubscriptionService');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class StripeSubscriptionCanceledWebhook {
    constructor() {

    }

    async do(req,res) {
        const webhookSecret = process.env.STRIPE_SUBSCRIPTION_DELETED_WEBHOOK; 
        const signature = req.headers['stripe-signature'];
        try {
            const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
            if (event.type === 'customer.subscription.deleted') {
                const stripe_subscription = event.data.object;
                const subscription = await Subscription.findOne({
                    stripe_id: stripe_subscription.id
                });
                if(subscription) {
                    let cancelService = new CanceledByWebhookService();
                    cancelService.subscription = subscription;
                    let data = await cancelService.do();
                    console.log("SUBSCRIPTION CANCLED: ", data);
                    res.status(200).send('Webhook received successfully.');
                } else {
                    res.status(200).send('Webhook received and acknowledged. No subscription in databased matched this')
                }
            } else {
                res.status(200).send('Webhook received and acknowledged.');
            }
        } catch (error) {
            console.error(error);
            res.status(400).send('Webhook signature verification failed.');
        }
    }
}

module.exports = {
    StripeSubscriptionCanceledWebhook
}