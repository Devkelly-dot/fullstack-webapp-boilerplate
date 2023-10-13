const { SignupWithStripeService } = require("../../../subscriptions/signupForSubscriptionService/signUpForsubscriptionService");
const { FindSubscriptionPlanByLineItem } = require("./behaviors/findSubscriptionPlanBehavior");
const { FindUserByStripeIdBehavior } = require("./behaviors/findUserBehavior");

class HandleSuccessfulCheckoutService {
    constructor() {
        this.checkout_data = null;
        
        this.findUserBehavior = null;
        this.findSubscriptionPlanBehavior = null;
        this.signUpForSubscriptionService = null;
    }

    async do() {
        let findUserBehavior = new this.findUserBehavior();
        findUserBehavior.checkout_data = this.checkout_data;
        let user = await findUserBehavior.do();

        let findSubscriptionPlanBehavior = new this.findSubscriptionPlanBehavior();
        findSubscriptionPlanBehavior.checkout_data = this.checkout_data;
        let subscriptionPlan = await findSubscriptionPlanBehavior.do();

        let signUpForSubscriptionService = new this.signUpForSubscriptionService();
        signUpForSubscriptionService.user = user;
        signUpForSubscriptionService.subscriptionPlan = subscriptionPlan;
        signUpForSubscriptionService.checkout_data = this.checkout_data;
        
        let subscription_data = await signUpForSubscriptionService.do();

        return {
            subscription_data,
            user,
            subscriptionPlan
        }
    }
}

class HandleStripeSubscriptionCheckoutService extends HandleSuccessfulCheckoutService {
    constructor() {
        super();
        this.findUserBehavior = FindUserByStripeIdBehavior;
        this.findSubscriptionPlanBehavior = FindSubscriptionPlanByLineItem;
        this.signUpForSubscriptionService = SignupWithStripeService;
    }
}

module.exports = {
    HandleStripeSubscriptionCheckoutService
}