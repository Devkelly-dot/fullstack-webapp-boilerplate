const SubscriptionPlan = require('../../../../db/models/SubscriptionPlan');
const { SubscriptionPlanRenewalField } = require('../../../../utils/enums/subscriptionEnums');

class ResetSubscriptionBehavior {
    constructor() {
        this.subscription = null;
    }

    async do() {
        if(!this.subscription) {
            throw new Error("ResetSubscriptionBehavior needs subscription");
        }

        let data = await this.reset();
        return data;
    }

    async reset() {
        throw new Error("ResetSubscriptionBehavior needs reset method");
    }
}

class ResetMonthlyMessagesBehavior extends ResetSubscriptionBehavior {
    constructor() {
        super();
        this.renew_field = SubscriptionPlanRenewalField.MONTHLY;
    }

    async reset() {
        let plan = await SubscriptionPlan.findOne({
            _id: this.subscription.subscriptionPlan
        });

        if(this.subscription.subscriptionPlan_renewal_field === this.renew_field) {
            // only reset monthly because yearly renewing subscriptions will be reset by the cron job 
            this.subscription.messages_left = plan.includes.messages;
            this.subscription.last_reset = new Date();
        }

        await this.subscription.save();
        return this.subscription;
    }
}

class ResetYearlyMessagesBehavior extends ResetMonthlyMessagesBehavior {
    constructor() {
        super();
        this.renew_field = SubscriptionPlanRenewalField.YEARLY;
    }
}

module.exports = {
    ResetMonthlyMessagesBehavior,
    ResetYearlyMessagesBehavior
}