const { ResetYearlyMessagesBehavior } = require("../../subscriptions/subscriptionRenewal/behaviors/resetSubscriptionBehavior");
const { CollectYearlySubsForMonthlyReset } = require("./behaviors/collectSubscriptionsBehavior");

class ResetSubscriptionsMonthlyService {
    constructor() {
        this.collectSubscriptionsBehavior = null;
        this.resetSubscriptionBehavior = null;
    }

    async do() {
        if(!this.collectSubscriptionsBehavior) {
            throw new Error("ResetSubscriptionsMonthlyService needs collectSubscriptionsBehavior")
        }
        if(!this.resetSubscriptionBehavior) {
            throw new Error("ResetSubscriptionsMonthlyService needs resetSubscriptionBehavior")
        }

        let collectBehavior = new this.collectSubscriptionsBehavior();
        let subscriptions = await collectBehavior.do();

        console.log(`${subscriptions.length} subscriptions to reset`)
        let resetBehavior = new this.resetSubscriptionBehavior();
        for(let i = 0; i < subscriptions.length; i++) {
            resetBehavior.subscription = subscriptions[i];

            let reset_sub = await resetBehavior.do();
            console.log(`sub ${subscriptions[i]._id} was reset`);
        }
    }
}

class ResetSubscriptionsMonthlyMessagesService extends ResetSubscriptionsMonthlyService {
    constructor() {
        super();
        // only collect yearly subs that renew today because monthly subs renew from stripe
        this.collectSubscriptionsBehavior = CollectYearlySubsForMonthlyReset; 
        
        this.resetSubscriptionBehavior = ResetYearlyMessagesBehavior; 
    }
}

module.exports = {
    ResetSubscriptionsMonthlyMessagesService
}