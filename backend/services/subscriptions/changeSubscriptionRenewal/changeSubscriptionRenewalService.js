const { SetStripeSubscriptionToNotRenewBehavior, SetStripeSubscriptionToRenewBehavior } = require("./changeSubscriptionRenewalBehavior/changeSubscriptionRenewalBehavior");

class changeSubscriptionRenewalService {
    constructor() {
        this.cancelBehavior = null;

        this.subscription = null;
    }

    async do() {
        if(!this.cancelBehavior) {
            throw new Error("changeSubscriptionRenewalService needs cancelBehavior")
        }
        if(!this.subscription) {
            throw new Error("changeSubscriptionRenewalService needs subscription")
        }

        let cancelBehavior = new this.cancelBehavior();
        cancelBehavior.subscription = this.subscription;

        let cancel_data = await cancelBehavior.do();
        return cancel_data;
    }
}

class SetUserSubscriptionToNotRenewService extends changeSubscriptionRenewalService{
    constructor() {
        super();
        this.cancelBehavior = SetStripeSubscriptionToNotRenewBehavior;
    }
}
class SetUserSubscriptionToRenewService extends changeSubscriptionRenewalService {
    constructor() {
        super();
        this.cancelBehavior = SetStripeSubscriptionToRenewBehavior;
    }
}

module.exports = {
    SetUserSubscriptionToNotRenewService,
    SetUserSubscriptionToRenewService
}