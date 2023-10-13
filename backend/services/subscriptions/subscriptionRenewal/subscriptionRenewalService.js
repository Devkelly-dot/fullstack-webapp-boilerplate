const { ChangeToOnRenewPlanBehavior } = require("./behaviors/changePlanBehavior");
const { ResetMonthlyMessagesBehavior } = require("./behaviors/resetSubscriptionBehavior");

class SubscriptionRenewalService {
    constructor() {
        this.subscription = null;
        this.changePlanBehavior = null;
        this.resetSubscriptionBehavior = null;
    }

    async do() {
        if(!this.subscription) {
            throw new Error("SubscriptionRenewalService needs subscription");
        }

        if(!this.changePlanBehavior) {
            throw new Error("SubscriptionRenewalService needs subscription");
        }

        if(!this.resetSubscriptionBehavior) {
            throw new Error("SubscriptionRenewalService needs resetSubscriptionBehavior");
        }

        let changePlanBehavior = new this.changePlanBehavior();
        changePlanBehavior.subscription = this.subscription;

        let new_sub = await changePlanBehavior.do();

        let resetSubscriptionBehavior = new this.resetSubscriptionBehavior();
        resetSubscriptionBehavior.subscription = new_sub;

        let data = await resetSubscriptionBehavior.do();
        return data;
    }
}

class SubscriptionRenewedByWebhookService extends SubscriptionRenewalService {
    constructor() {
        super();
        this.changePlanBehavior = ChangeToOnRenewPlanBehavior;
        this.resetSubscriptionBehavior = ResetMonthlyMessagesBehavior;
    }
}

module.exports = {
    SubscriptionRenewedByWebhookService
}