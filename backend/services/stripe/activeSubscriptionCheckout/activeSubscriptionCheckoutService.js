const { HandleActiveStripeCheckoutBehavior, HandleCalculateActiveStripeCheckoutBehavior } = require("./behaviors/handleActiveCheckoutBehavior");

class ActiveSubscriptionCheckoutService {
    constructor() {
        this.user = null;
        this.new_plan = null;
        this.yearly = null;

        this.handleActiveCheckoutBehavior = null;
    }

    async do() {
        if(!this.user) {
            throw new Error("ActiveSubscriptionCheckoutService needs user");
        }
        if(!this.new_plan) {
            throw new Error("ActiveSubscriptionCheckoutService needs new_plan");
        }

        let handleCheckoutBehavior = new this.handleActiveCheckoutBehavior();
        handleCheckoutBehavior.user = this.user;
        handleCheckoutBehavior.new_plan = this.new_plan;
        handleCheckoutBehavior.yearly = this.yearly;
        
        let data = await handleCheckoutBehavior.do();
        return data;
    }
}

class UpgradeDowngradeActiveSubscriptionService extends ActiveSubscriptionCheckoutService {
    constructor() {
        super();
        this.handleActiveCheckoutBehavior = HandleActiveStripeCheckoutBehavior;
    }
}

class CalculateUpgradeDowngradeActiveSubscriptionService extends ActiveSubscriptionCheckoutService {
    constructor() {
        super();
        this.handleActiveCheckoutBehavior = HandleCalculateActiveStripeCheckoutBehavior;
    }
}

module.exports = {
    UpgradeDowngradeActiveSubscriptionService,
    CalculateUpgradeDowngradeActiveSubscriptionService
}