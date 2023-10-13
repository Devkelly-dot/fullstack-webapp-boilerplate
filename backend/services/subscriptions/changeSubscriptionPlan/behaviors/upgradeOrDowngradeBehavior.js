require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const SubscriptionPlan = require("../../../../db/models/SubscriptionPlan");
const { DowngradeSubscriptionLineitemService, UpgradeSubscriptionLineitemService } = require("../../../stripe/changeSubscriptionLineitems/changeSubscriptionLineitemsService");
const { GetBasePlansClass } = require("../../createSubscriptionPlans/data/basplans");
const { SignupWithStripeService } = require("../../signupForSubscriptionService/signUpForsubscriptionService");
class UpgradeOrDowngradeBehavior {
    constructor() {
        this.new_plan = null;
        this.old_plan = null;
        this.user = null;
        this.subscription = null;
        this.subscription_data = null;
    }

    async do() {
        const is_upgrading = await this.isUpgrading();
        let data = null;

        if(is_upgrading) {
            data = await this.upgrade();
        } else {
            data = await this.downgrade();
        }

        return data;
    }

    async isUpgrading() {
        throw new Error("UpgradeOrDowngradeBehavior needs isUpgrading method");
    }

    async upgrade() {
        throw new Error("UpgradeOrDowngradeBehavior needs isUpgrading method");
    }

    async downgrade(){
        throw new Error("UpgradeOrDowngradeBehavior needs isUpgrading method");
    }
}

class UpgradeDowngradeFromNewPlanBehavior extends UpgradeOrDowngradeBehavior {
    constructor() {
        super();
        this.upgradeStripeLineitemsBehavior = UpgradeSubscriptionLineitemService;
        this.downgradeStripeLineitemsBehavior = DowngradeSubscriptionLineitemService;
    }

    async isUpgrading() {
        // get base plans and compare the grade_level of subscription_id with the user's current 
        const basePlanService = new GetBasePlansClass();
        const base_plans = basePlanService.getPlans();
        let current_plan = base_plans.find((plan)=>plan.title === this.old_plan.title);
        let new_plan = base_plans.find((plan)=>plan.title === this.new_plan.title);

        // if subscription_id grade_level is lower than current, set user's subscription.onRenewal to subscription_id (they will downgrade when subscription resets)
        if(current_plan.grade_level >= new_plan.grade_level) {
            return false;
        }
        if(current_plan.grade_level < new_plan.grade_level) {
            return true;
        }
    }

    async upgrade() {
        let signupWithStripeService = new SignupWithStripeService();
        signupWithStripeService.user = this.user;
        signupWithStripeService.subscriptionPlan = this.new_plan;

        const checkout_data = {
            subscription: this.subscription.stripe_id,
            line_item: this.new_plan[this.subscription.subscriptionPlan_renewal_field]
        }

        signupWithStripeService.checkout_data = checkout_data;
        signupWithStripeService.do_not_reset = true;
        let upgrade_data = await signupWithStripeService.do();

       
        // -- also update user's line item on their subscription with prorated true 
        let upgradeStripeLineitemsBehavior = new this.upgradeStripeLineitemsBehavior();
        upgradeStripeLineitemsBehavior.subscription_data = this.subscription_data;
        upgradeStripeLineitemsBehavior.subscription = this.subscription;
        
        let stripe_data = await upgradeStripeLineitemsBehavior.do();

        return upgrade_data;

    }

    async downgrade(){
        this.subscription.onRenewal = this.new_plan._id;
        await this.subscription.save();
        // -- also update user's line item on their subscription with prorated false 
        let downgradeStripeLineitemsBehavior = new this.downgradeStripeLineitemsBehavior();
        downgradeStripeLineitemsBehavior.subscription_data = this.subscription_data;
        downgradeStripeLineitemsBehavior.subscription = this.subscription;
        let stripe_data = await downgradeStripeLineitemsBehavior.do();

        let subscriptionPlans = await SubscriptionPlan.find({
            _id: {
                $in: [this.subscription.onRenewal, this.subscription.subscriptionPlan]
            }
        });

        let onRenewal = subscriptionPlans.find((plan)=>plan._id.toString() === this.subscription.onRenewal.toString());
        let subscriptionPlan = subscriptionPlans.find((plan)=>plan._id.toString() === this.subscription.subscriptionPlan.toString());
        return {
            subscription: this.subscription,
            onRenewal,
            subscriptionPlan
        };
    }
}

class CalculateUpgradeDowngradeFromNewPlanBehavior extends UpgradeOrDowngradeBehavior {
    constructor() {
        super();
        this.upgradeStripeLineitemsBehavior = UpgradeSubscriptionLineitemService;
        this.downgradeStripeLineitemsBehavior = DowngradeSubscriptionLineitemService;
    }

    async isUpgrading() {
        // get base plans and compare the grade_level of subscription_id with the user's current 
        const basePlanService = new GetBasePlansClass();
        const base_plans = basePlanService.getPlans();
        let current_plan = base_plans.find((plan)=>plan.title === this.old_plan.title);
        let new_plan = base_plans.find((plan)=>plan.title === this.new_plan.title);

        // if subscription_id grade_level is lower than current, set user's subscription.onRenewal to subscription_id (they will downgrade when subscription resets)
        if(current_plan.grade_level >= new_plan.grade_level) {
            return false;
        }
        if(current_plan.grade_level < new_plan.grade_level) {
            return true;
        }
    }

    async upgrade() {
        let activeSubscriptionPlan = await SubscriptionPlan.findOne({
            _id: this.subscription.subscriptionPlan
        });

        const active_line_item = activeSubscriptionPlan[this.subscription.subscriptionPlan_renewal_field];
        let costDifference = 0;
        let newCost = 0;
        let line_item = this.new_plan[this.subscription.subscriptionPlan_renewal_field];
        
        if(line_item) {
            const newPrice = await stripe.prices.retrieve(line_item);
            newCost = newPrice.unit_amount / 100;
            costDifference = newCost;
        }
        

        if(active_line_item) {
            const currentLineItem = await stripe.prices.retrieve(active_line_item);
            const currentCost = currentLineItem.unit_amount / 100;
    
            costDifference = (newCost - currentCost).toFixed(2);
        }
        
        return {
            estimate_data: {
                upgrade: true,
                costDifference
            }
        };
    }

    async downgrade(){
        return {
            estimate_data: {
                upgrade: false
            }
        };
    }
}

module.exports = {
    UpgradeDowngradeFromNewPlanBehavior,
    CalculateUpgradeDowngradeFromNewPlanBehavior
}