const SubscriptionPlan = require('../../../../db/models/SubscriptionPlan');

class ChangePlanBehavior {
    constructor() {
        this.subscription = null;
    }

    async do() {
        if(!this.subscription) {
            throw new Error("ChangePlanBehavior needs a subscription");
        }

        let new_sub = await this.changePlan();
        return new_sub;
    }

    async changePlan() {
        throw new Error("ChangePlanBehavior needs changePlan method");
    }
}

class ChangeToOnRenewPlanBehavior extends ChangePlanBehavior {
    constructor() {
        super();
    }

    async changePlan() {
        if(!this.subscription.onRenewal) {
            this.subscription.onRenewal = this.subscription.SubscriptionPlan;
        }

        if(this.subscription.onRenewal.toString() !== this.subscription.subscriptionPlan.toString()) {
            let newPlan = await SubscriptionPlan.findOne({
                _id: this.subscription.onRenewal
            });

            if(newPlan) {
                this.subscription.subscriptionPlan = newPlan._id;
                this.subscription.onRenewal = newPlan._id;
            } else {    
                console.log(`subscription ${this.subscription._id} onRenewal points to non existant plan`);
                this.subscription.onRenewal = this.subscription.subscriptionPlan;
            }
        }
        await this.subscription.save();
        return this.subscription;
    }
}

module.exports = {
    ChangeToOnRenewPlanBehavior
}