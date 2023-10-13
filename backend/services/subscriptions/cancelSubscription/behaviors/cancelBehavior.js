const { subscriptionPlanTitlesEnum, SubscriptionPlanRenewalField, subscriptionStatusEnum } = require("../../../../utils/enums/subscriptionEnums");
const SubscriptionPlan = require("../../../../db/models/SubscriptionPlan");

class cancelBehavior {
    constructor() {
        this.subscription = null;
    }

    async do() {
        if(!this.subscription) {
            throw new Error("cancelBehavior needs a subscription");
        }

        let data = await this.cancel();
        return data;
    }

    async cancel() {
        throw new Error("cancelBehavior needs cancel method");
    }
}

class SetUserToFreeBehavior extends cancelBehavior {
    constructor() {
        super();
    }

    async cancel() {
        const freePlan = await SubscriptionPlan.findOne({
            title: subscriptionPlanTitlesEnum.FREE
        });

        if(!freePlan) {
            throw new Error("Free plan not found in the database");
        }

        this.subscription.subscriptionPlan = freePlan._id;
        this.subscription.onRenewal = freePlan._id;
        this.subscription.stripe_id = null;
        this.subscription.subscriptionPlan_renewal_field = SubscriptionPlanRenewalField.MONTHLY;
        this.subscription.status = subscriptionStatusEnum.ACTIVE;
        this.subscription.messages_left = freePlan.includes.messages;

        await this.subscription.save();
        return this.subscription;
    }
}

module.exports = {
    SetUserToFreeBehavior
}