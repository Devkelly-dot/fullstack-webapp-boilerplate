const { ReplaceStripeLineitemsBehavior, upgradeLineItemBehavior } = require("./behaviors/changeLineitemBehavior");

class ChangeSubscriptionLineitemService {
    constructor() {
        this.prorate_behavior = null;

        this.changeLineitemBehavior = null;
        this.subscription_data = null;
        this.subscription = null;
    }

    async do() {
        if(!this.changeLineitemBehavior) {
            throw new Error("ChangeSubscriptionLineitemService needs changeLineitemBehavior");
        }
        if(!this.subscription_data) {
            throw new Error("ChangeSubscriptionLineitemService needs subscription_data");
        }
        if(!this.prorate_behavior) {
            throw new Error("ChangeSubscriptionLineitemService needs prorate_behavior");
        }

        let changeLineitemBehavior = new this.changeLineitemBehavior();
        changeLineitemBehavior.subscription_data = this.subscription_data;
        changeLineitemBehavior.prorate_behavior = this.prorate_behavior;
        changeLineitemBehavior.subscription = this.subscription; 

        let data = await changeLineitemBehavior.do();
        return data; 
    }
}

class ChangeStripeSubscriptionLineitemsService extends ChangeSubscriptionLineitemService{
    constructor() {
        super();
        this.changeLineitemBehavior = ReplaceStripeLineitemsBehavior;
    }
}
class ChangeStripeSubscriptionLineitemsWithoutChargeService extends ChangeStripeSubscriptionLineitemsService{
    constructor() {
        super();
        this.prorate_behavior = 'none';
    }
}
class UpgradeSubscriptionLineitemService extends ChangeStripeSubscriptionLineitemsService {
    constructor() {
        super();
        this.prorate_behavior = 'always_invoice';
        this.changeLineitemBehavior = upgradeLineItemBehavior;
    }
}

class DowngradeSubscriptionLineitemService extends ChangeStripeSubscriptionLineitemsService {
    constructor() {
        super();
        this.prorate_behavior = 'none';
    }
}

module.exports = {
    UpgradeSubscriptionLineitemService,
    DowngradeSubscriptionLineitemService,
    ChangeStripeSubscriptionLineitemsWithoutChargeService
}