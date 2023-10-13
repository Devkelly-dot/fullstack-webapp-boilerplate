const express = require('express');
const { StripeCheckoutWebhookController } = require('../controllers/stripe/stripeCheckoutWebhook');
const { StripeSubscriptionCanceledWebhook } = require('../controllers/stripe/stripeSubscriptionCanceledWebhook');
const { StripeSubscriptionRenewedWebhook } = require('../controllers/stripe/stripeSubscriptionRenewedWebhook');
const router = express.Router();

checkoutController = new StripeCheckoutWebhookController();
router.post(
    '/stripe/checkout',
    express.raw({type: "application/json"}) 
    , checkoutController.do);

cancelController = new StripeSubscriptionCanceledWebhook();
router.post(
    '/stripe/cancel',
    express.raw({type: "application/json"}) 
    , cancelController.do);

renewController = new StripeSubscriptionRenewedWebhook();
router.post(
    '/stripe/renew',
    express.raw({type: "application/json"}) 
    , renewController.do);

module.exports = router;