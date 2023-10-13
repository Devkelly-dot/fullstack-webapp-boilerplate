require('dotenv').config()

const Subscription = require("../../../../db/models/Subscription");
const SubscriptionPlan = require("../../../../db/models/SubscriptionPlan");
const { SubscriptionPlanRenewalField } = require("../../../../utils/enums/subscriptionEnums");
const { UpgradeOrDowngradePlanService, CalculateUpgradeOrDowngradePlanService } = require('../../../subscriptions/changeSubscriptionPlan/changeSubscriptionPlanService');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class HandleActiveCheckoutBehavior {
    constructor(){
        this.user = null;
        this.new_plan = null;
    }

    async do() {
        if(!this.user) {
            throw new Error("HandleActiveCheckoutBehavior needs user");
        }
        if(!this.new_plan) {
            throw new Error("HandleActiveCheckoutBehavior needs new_plan");
        }

        let data = await this.handleCheckout();
        return data;
    }

    async handleCheckout() {
        throw new Error("HandleActiveCheckoutBehavior needs handleCheckout method");
    }
}

class HandleActiveStripeCheckoutBehavior extends HandleActiveCheckoutBehavior {
    constructor() {
        super();
        this.yearly = null;
        this.upgradeOrDowngradePlanService = UpgradeOrDowngradePlanService;
    }

    async handleCheckout() {
        // if so grab their subscription 
        let subscription = await Subscription.findOne({
            user: this.user._id
        });

        // make sure the subscription's stripe subscription id exists on stripe and belongs to the user 
        if(subscription && subscription.stripe_id) {
            const stripeSubscription = await stripe.subscriptions.retrieve(subscription.stripe_id);
            if (stripeSubscription && stripeSubscription.customer === this.user.stripe_id) {
                // then grab their subscription plan
                const current_subscriptionPlan = await SubscriptionPlan.findOne({
                    _id: subscription.subscriptionPlan
                });

                if(current_subscriptionPlan._id.toString() === this.new_plan._id.toString()) {
                    if(subscription.onRenewal.toString() === this.new_plan._id.toString()) {
                        return {
                            error: {
                                code: 400,
                                message: "This is your current plan"
                            }
                        }
                    }
                }

                let period = SubscriptionPlanRenewalField.MONTHLY;
                if(this.yearly) {
                    period = SubscriptionPlanRenewalField.YEARLY;
                }

                if(subscription.subscriptionPlan_renewal_field !== period) {
                    return {
                        error: {
                            code: 400,
                            message: "Your billing period must remain the same. You can cancel and resubscribe at the end of your billing period."
                        }
                    }
                }

                if(current_subscriptionPlan) {
                    let changeSubscriptionService = new this.upgradeOrDowngradePlanService();
                    changeSubscriptionService.new_plan = this.new_plan;
                    changeSubscriptionService.old_plan = current_subscriptionPlan;
                    changeSubscriptionService.user = this.user;
                    changeSubscriptionService.subscription = subscription;

                    let old_line_item = current_subscriptionPlan[period];
                    if(subscription.onRenewal.toString() !== subscription.subscriptionPlan.toString()) {
                        const stripeSubscriptionPlan = await SubscriptionPlan.findOne({
                            _id: subscription.onRenewal
                        });
                        old_line_item = stripeSubscriptionPlan[subscription.subscriptionPlan_renewal_field];
                    }

                    let new_line_item = this.new_plan[period];

                    changeSubscriptionService.subscription_data = {
                        stripeSubscription,
                        old_line_item,
                        new_line_item
                    };
                    let changeData = await changeSubscriptionService.do();
                    return changeData;
                }
            } else {
                throw new Error("no stripeSubscription or it doesn't match user's stripe id")
            }
        } else {
            throw new Error("subscription has no stripe_id")
        }
    }
}
class HandleCalculateActiveStripeCheckoutBehavior extends HandleActiveStripeCheckoutBehavior {
    constructor(){
        super();
        this.upgradeOrDowngradePlanService = CalculateUpgradeOrDowngradePlanService;
    }
}
module.exports = {
    HandleActiveStripeCheckoutBehavior,
    HandleCalculateActiveStripeCheckoutBehavior
}