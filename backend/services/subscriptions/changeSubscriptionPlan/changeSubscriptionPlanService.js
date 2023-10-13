const { UpgradeDowngradeFromNewPlanBehavior, CalculateUpgradeDowngradeFromNewPlanBehavior } = require("./behaviors/upgradeOrDowngradeBehavior");

class ChangeSubscriptionPlanService {
    constructor() {
        this.new_plan = null;
        this.old_plan = null;
        this.user = null;
        this.subscription = null;
        this.subscription_data = null;

        this.changePlanBehavior = null;
    }

    async do() {
        if(!this.new_plan) {
            throw new Error("ChangeSubscriptionPlanService needs new_plan")
        }
        if(!this.old_plan) {
            throw new Error("ChangeSubscriptionPlanService needs old_plan")
        }
        if(!this.user) {
            throw new Error("ChangeSubscriptionPlanService needs user")
        }
        if(!this.subscription) {
            throw new Error("ChangeSubscriptionPlanService needs subscription")
        }

        let change_behavior = new this.changePlanBehavior();
        change_behavior.new_plan = this.new_plan;
        change_behavior.old_plan = this.old_plan;
        change_behavior.user = this.user;
        change_behavior.subscription = this.subscription;
        change_behavior.subscription_data = this.subscription_data; 

        let data = await change_behavior.do();
        return data;
    }
}

class UpgradeOrDowngradePlanService extends ChangeSubscriptionPlanService {
    constructor() {
        super();
        this.changePlanBehavior = UpgradeDowngradeFromNewPlanBehavior;
    }
}
class CalculateUpgradeOrDowngradePlanService extends ChangeSubscriptionPlanService {
    constructor() {
        super();
        this.changePlanBehavior = CalculateUpgradeDowngradeFromNewPlanBehavior;
    }
}
module.exports = {
    UpgradeOrDowngradePlanService,
    CalculateUpgradeOrDowngradePlanService
}