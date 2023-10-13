require('dotenv').config()
const { HandleStripeSubscriptionCheckoutService } = require("../../services/stripe/webhooks/handleSuccessfulCheckout/handleSuccessfulCheckoutService");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class StripeCheckoutWebhookController {
    constructor() {

    }

    async do(req,res) {
        const webhookSecret = process.env.STRIPE_CHECKOUT_COMPLETE_WEBHOOK; 
        const signature = req.headers['stripe-signature'];
        try {
            const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
            if (event.type === 'checkout.session.completed') {
                const session = event.data.object;

                const subscriptionId = session.subscription;
                const subscription = await stripe.subscriptions.retrieve(subscriptionId);
                if (!subscription || !subscription.items || subscription.items.data.length === 0) {
                    throw new Error("No subscription items found for the given subscription ID");
                }
                let checkout_data = session;
                checkout_data.line_item = subscription.items.data[0].plan.id;
                let service = new HandleStripeSubscriptionCheckoutService();
                service.checkout_data = session;
                let subscription_data = await service.do();
                //
                res.status(200).send('Webhook received successfully.');
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
    StripeCheckoutWebhookController
}