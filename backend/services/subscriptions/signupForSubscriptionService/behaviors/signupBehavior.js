const Subscription = require('../../../../db/models/Subscription');
const SubscriptionPlan = require('../../../../db/models/SubscriptionPlan');
const { SubscriptionPlanRenewalField, subscriptionStatusEnum } = require('../../../../utils/enums/subscriptionEnums');

class SignupBehavior {
    constructor() {
        this.user = null;
        this.subscriptionPlan = null;
        this.checkout_data = null;
        this.do_not_reset = false;
    }

    async do() {
        if(!this.user) {
            throw new Error("SignupBehavior needs a user");
        }
        if(!this.subscriptionPlan) {
            throw new Error("SignupBehavior needs a subscriptionPlan");
        }
        if(!this.checkout_data) {
            throw new Error("SignupBehavior needs checkout_data");
        }
        let subscriptionData = await this.signup();
        return subscriptionData;
    }

    async signup() {
        throw new Error("SignupBehavior needs a signup behavior");
    }
}

class SignupUserWithStripeBehavior extends SignupBehavior {
    constructor() {
        super();
    }
    async signup() {
        if(!this.checkout_data || !this.checkout_data?.subscription) {
            throw new Error("SignupUserWithStripeBehavior needs checkout_data (stripe session)");
        }

        if(!this.subscriptionPlan) {
            throw new Error("SignupUserWithStripeBehavior needs ?.subscriptionPlan");

        }
        let subscription = null;
        let messages_used = 0;

        if(this.user.subscription) {
            subscription = await Subscription.findOne({
                _id: this.user.subscription
            });

            if(!subscription) {
                throw new Error(`user ${this.user._id} has no subscription`);
            }

            subscription.status = subscriptionStatusEnum.PENDING;
            try {
                await subscription.save();
            } catch (error) {
                console.log(error);
            }

            let old_subscription_plan = await SubscriptionPlan.findOne({
                _id: subscription.subscriptionPlan
            });

            
            if(old_subscription_plan?.includes?.messages) {
                messages_used = old_subscription_plan.includes.messages - subscription.messages_left;
            }
        }

        let renewal = SubscriptionPlanRenewalField.MONTHLY;
        
        if(this.subscriptionPlan.yearly_price_id === this.checkout_data.line_item) {
            renewal = SubscriptionPlanRenewalField.YEARLY;
        }

        let messages_left = this.subscriptionPlan.includes.messages - messages_used;

        if(!this.subscriptionPlan.includes.messages) {
            messages_left = null;
        }
        if(messages_left < 0) {
            messages_left = 0;
        }

        const today = new Date();

        let new_subscription = {
            user: this.user._id,
            subscriptionPlan: this.subscriptionPlan._id,
            onRenewal: this.subscriptionPlan._id,
            stripe_id: this.checkout_data?.subscription,
            subscriptionPlan_renewal_field: renewal,
            status: subscriptionStatusEnum.ACTIVE,
            messages_left: messages_left,
        };

        if(!this.do_not_reset) {
            new_subscription.last_reset = today;
        }

        if(!subscription) {
            subscription = await Subscription.create(new_subscription);
        } else {
            subscription.user = this.user._id;
            subscription.subscriptionPlan = this.subscriptionPlan._id;
            subscription.onRenewal = this.subscriptionPlan._id;
            subscription.stripe_id = this.checkout_data?.subscription;
            subscription.subscriptionPlan_renewal_field = renewal;
            subscription.status = subscriptionStatusEnum.ACTIVE;
            subscription.messages_left = messages_left;

            if(!this.do_not_reset) {
                subscription.last_reset = today;
            }
            await subscription.save();
        }

        return {
            subscription, 
            user: this.user,
            subscriptionPlan: this.subscriptionPlan            
        }
    }  
};

module.exports = {
    SignupUserWithStripeBehavior
}