const SubscriptionPlan = require('../../../../db/models/SubscriptionPlan');

require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class ChangeLineitemsBehavior {
    constructor() {
        this.prorate_behavior = null;
        this.subscription_data = null;
        this.subscription = null;
    }

    async do() {
        if(!this.subscription_data) {
            throw new Error("ChangeLineitemsBehavior needs subscription_data");
        }
        if(!this.prorate_behavior) {
            throw new Error("ChangeLineitemsBehavior needs prorate_behavior");
        }

        let data = await this.change();
        return data;
    }

    async change() {
        throw new Error("ChangeLineitemsBehavior needs change method");
    }
}

class ReplaceStripeLineitemsBehavior extends ChangeLineitemsBehavior {
    constructor() {
        super();
    }

    async change() {
        if(this.preChange) {
            await this.preChange();
        }
        const {stripeSubscription, new_line_item, old_line_item} = this.subscription_data; 
        
        if(!stripeSubscription) {
            throw new Error("ReplaceStripeLineitemsBehavior needs subscription_data.stripeSubscription");
        }
        if(!new_line_item) {
            throw new Error("ReplaceStripeLineitemsBehavior needs subscription_data.new_line_item");
        }
        if(!old_line_item) {
            throw new Error("ReplaceStripeLineitemsBehavior needs subscription_data.old_line_item");
        }
        if(!this.subscription) {
            throw new Error("ReplaceStripeLineitemsBehavior needs subscription");
        }

        const items = stripeSubscription.items.data;
        
        // Find the subscription item with the old_price_id
        console.log("OLD LINE ITEM: ", old_line_item)
        const subscriptionItem = items.find(item => item.price.id === old_line_item);
        console.log(items);
        if (!subscriptionItem) {
            throw new Error("No subscription item with this ID on the subscription.");
        }

        console.log("DOWNGRADING 2")
        let data = await stripe.subscriptions.update(stripeSubscription.id, {
            items: [
                {
                    id: subscriptionItem.id, 
                    price: new_line_item,
                }
            ],
            proration_behavior: this.prorate_behavior,
        });

        return data;
    }

    async preChange() {
    }
}

class upgradeLineItemBehavior extends ReplaceStripeLineitemsBehavior{
    constructor() {
        super();
    }

    async preChange() {
        // if we are upgrading and the subscription's subscriptionPlan is not equal to its onRenewal plan 
        // then we need to set the stripe subscription's line item to the price_id of the active subscription plan 
        // so the user only pays for the upgrade from their current plan to the new plan. 
        // the stripe line item will correspond to the onRenewal plan's price id, which will be a downgrade. 
        const {stripeSubscription} = this.subscription_data; 

        if(this.subscription.onRenewal.toString() === this.subscription.subscriptionPlan.toString()) {
            return;
        }

        let relevant_subscription_plans = await SubscriptionPlan.find({
            _id: {
                $in: [
                    this.subscription.onRenewal,
                    this.subscription.subscriptionPlan
                ]
            }
        });

        const currentActivePlan = relevant_subscription_plans.find((plan)=>plan._id.toString() === this.subscription.subscriptionPlan.toString());
        const activeOnStripePlan = relevant_subscription_plans.find((plan)=>plan._id.toString() === this.subscription.onRenewal.toString());

        const old_line_item = activeOnStripePlan[this.subscription.subscriptionPlan_renewal_field];
        const new_line_item = currentActivePlan[this.subscription.subscriptionPlan_renewal_field];
        
        const items = stripeSubscription.items.data;
        // Find the subscription item with the old_price_id
        const subscriptionItem = items.find(item => item.price.id === old_line_item);
        if (!subscriptionItem) {
            throw new Error("No subscription item with this ID on the subscription.");
        }

        let data = await stripe.subscriptions.update(stripeSubscription.id, {
            items: [
                {
                    id: subscriptionItem.id, 
                    price: new_line_item,
                }
            ],
            proration_behavior: 'none',
        });

        this.subscription_data.stripeSubscription = data;
        this.subscription_data.old_line_item = new_line_item;
    }
}
module.exports = {
    ReplaceStripeLineitemsBehavior,
    upgradeLineItemBehavior
}