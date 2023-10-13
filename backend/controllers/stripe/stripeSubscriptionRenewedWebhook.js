require('dotenv').config()
const Subscription = require('../../db/models/Subscription');
const { SubscriptionRenewedByWebhookService } = require('../../services/subscriptions/subscriptionRenewal/subscriptionRenewalService');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class StripeSubscriptionRenewedWebhook {
    constructor() {

    }

    async do(req,res) {
        const webhookSecret = process.env.STRIPE_SUBSCRIPTION_DELETED_WEBHOOK; 
        const signature = req.headers['stripe-signature'];
        try {
            const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
            if (event.type === 'invoice.payment_succeeded') {
                if (event.data.object.billing_reason === 'subscription_cycle') {
                    const stripe_subscription = event.data.object;
                    const subscription = await Subscription.findOne({
                        stripe_id: stripe_subscription.id
                    });
                    if(subscription) {
                        let renew_service = new SubscriptionRenewedByWebhookService();
                        renew_service.subscription = subscription;

                        let data = await renew_service.do();
                        return res.status(200).send(`subscription ${subscription._id} successfully renewed`)
                    }
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
    StripeSubscriptionRenewedWebhook
}