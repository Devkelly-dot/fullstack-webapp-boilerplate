const SubscriptionPlan = require("../../../../../db/models/SubscriptionPlan");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class FindSubscriptionPlanBehavior {
    constructor() {
        this.checkout_data = null;
    }

    async do() {
        if(!this.checkout_data) {
            throw new Error("FindSubscriptionPlanBehavior needs checkout_data");
        }

        let subscription_plan = await this.findSubscriptionPlan();
        return subscription_plan;
    }

    async findSubscriptionPlan() {
        if(!this.checkout_data) {
            throw new Error("FindSubscriptionPlanBehavior needs findSubscriptionPlan method");
        }
    }
}

class FindSubscriptionPlanByLineItem extends FindSubscriptionPlanBehavior {
    constructor() {
        super();
    }

    async findSubscriptionPlan() {
        if(!this.checkout_data?.line_item) {
            throw new Error("FindSubscriptionPlanByLineItem needs checkout_data?.line_item");
        }
        const stripe_price_id = this.checkout_data.line_item;

        const subscription_plan = await SubscriptionPlan.findOne({
            $or: [
                {
                    monthly_price_id: stripe_price_id,
                },
                {
                    yearly_price_id: stripe_price_id
                }
            ]
        });

        if(!subscription_plan) {
            throw new Error("Could not find subscription plan based on stripe session data");
        }

        return subscription_plan
    }
};

module.exports = {
    FindSubscriptionPlanByLineItem
}