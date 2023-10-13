const Subscription = require("../../../../db/models/Subscription");
const { SubscriptionPlanRenewalField } = require("../../../../utils/enums/subscriptionEnums");

class CollectSubscriptionsBehavior {
    constructor() {
    }

    async do() {
        let subs = await this.collect();
        return subs;
    }

    async collect() {
        throw new Error("CollectSubscriptionsBehavior needs collect method");
    }
}

class CollectYearlySubsForMonthlyReset extends CollectSubscriptionsBehavior{
    constructor() {
        super();
    }

    async collect() {
        const today = new Date();
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1)
        console.log(oneMonthAgo)
        console.log(oneMonthAgo < today)
        let subs = await Subscription.find({
            last_reset: { $lte: oneMonthAgo },
            subscriptionPlan_renewal_field: SubscriptionPlanRenewalField.YEARLY
        });

        return subs;
    }
}

module.exports = {
    CollectYearlySubsForMonthlyReset
}