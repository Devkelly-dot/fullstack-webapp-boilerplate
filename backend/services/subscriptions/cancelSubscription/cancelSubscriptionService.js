const { SetUserToFreeBehavior } = require("./behaviors/cancelBehavior");

class CancelSubscriptionService {
    constructor() {
        this.subscription = null;

        this.cancelBehavior = null;
    }

    async do() {
        if(!this.subscription) {
            throw new Error("CancelSubscriptionService needs a subscription");
        }
        if(!this.cancelBehavior) {
            throw new Error("CancelSubscriptionService needs cancelBehavior");
        }

        let cancelBehavior = new this.cancelBehavior();
        cancelBehavior.subscription = this.subscription;
        let data = await cancelBehavior.do();
        return data;
    }
}

class CanceledByWebhookService extends CancelSubscriptionService {
    constructor() {
        super();
        this.cancelBehavior = SetUserToFreeBehavior;
    }
};

module.exports = {
    CanceledByWebhookService
}