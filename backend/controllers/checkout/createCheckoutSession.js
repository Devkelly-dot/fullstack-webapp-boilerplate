require('dotenv').config()

const Subscription = require("../../db/models/Subscription");
const SubscriptionPlan = require("../../db/models/SubscriptionPlan");
const { UpgradeDowngradeActiveSubscriptionService, CalculateUpgradeDowngradeActiveSubscriptionService } = require('../../services/stripe/activeSubscriptionCheckout/activeSubscriptionCheckoutService');
const { CreateStripeSubCheckoutService } = require("../../services/stripe/createCheckoutService/createCheckoutService");
const { basePostController } = require("../base/basePostController");

class CreateCheckoutSessionController extends basePostController {
    constructor() {
        super();
        this.required_fields = [
            'subscription_id'
        ],
        this.optional_fields = [
            'yearly',
            'purchasing'
        ]
    }

    async handleRequest (req, validated_fields) {
        const {subscription_id, yearly, purchasing} = validated_fields;

        let subscription_field = 'monthly_price_id';
        if(yearly) {
            subscription_field = 'yearly_price_id';
        }

        try {
            let subscriptionPlan = await SubscriptionPlan.findOne({
                _id: subscription_id
            });
            if(!subscriptionPlan) {
                return {
                    error: {
                        code: 404,
                        message: "No SubscriptionPlan with this id was found"
                    }
                }
            }

            if(!subscriptionPlan[subscription_field]) {
                return {
                    error: {
                        code: 400,
                        message: {message: `This subscription plan has no stripe id for ${yearly?"yearly":"monthly"}`}
                    }
                }
            }
            let items = [];
            items.push({
                stripe_id: subscriptionPlan[subscription_field]
            });

            // check if user has a stripe id 
            let subscription = await Subscription.findOne({
                _id: req.user.subscription
            });

            try {
                if(req.user.stripe_id && subscription?.stripe_id) {
                    if(purchasing) {
                        let handleActiveSubscriptionCheckout = new UpgradeDowngradeActiveSubscriptionService();
                        handleActiveSubscriptionCheckout.user = req.user;
                        handleActiveSubscriptionCheckout.new_plan = subscriptionPlan;
                        handleActiveSubscriptionCheckout.yearly = yearly;
                        
                        let active_sub_data = await handleActiveSubscriptionCheckout.do();
                        return active_sub_data;
                    } else {
                        // figure out whether this is an upgrade or downgrade 
                        // return the price as well if it is an upgrade 

                        let handleActiveSubscriptionCheckout = new CalculateUpgradeDowngradeActiveSubscriptionService();
                        handleActiveSubscriptionCheckout.user = req.user;
                        handleActiveSubscriptionCheckout.new_plan = subscriptionPlan;
                        handleActiveSubscriptionCheckout.yearly = yearly;

                        try {
                            let active_sub_data = await handleActiveSubscriptionCheckout.do();
                            return active_sub_data;
                        } catch (error) {
                            console.log(error);
                            return {
                                error: {
                                    code: 500,
                                    message: "Something went wrong calculating plan change"
                                }
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error);
                return {
                    error: {
                        code: 500,
                        message: "Something went wrong changing your plan"
                    }
                }
            }

            // if user subscription has a stripe id just cancel it here before sending user to stripe checkout (something has went wrong) 
            let createCheckoutService = new CreateStripeSubCheckoutService();
            createCheckoutService.items = items;
            createCheckoutService.user = req.user;
            let data = await createCheckoutService.do();
            return data;
        } catch (error) {
            console.log(error);
            return {
                error: {
                    code: 500,
                    message: "something went wrong creating checkout session"
                }
            }
        }
    }
}

module.exports = {
    CreateCheckoutSessionController
}