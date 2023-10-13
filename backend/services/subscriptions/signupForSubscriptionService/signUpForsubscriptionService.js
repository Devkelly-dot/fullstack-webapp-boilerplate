const { SignupUserWithStripeBehavior } = require("./behaviors/signupBehavior");

class SignUpforSubscriptionService {
    constructor(){ 
        this.signupBehavior = null;

        this.user = null;
        this.subscriptionPlan = null;
        this.checkout_data = null;
        this.do_not_reset = false;
    }

    async do(){
        if(!this.signupBehavior) {
            throw new Error("SignUpforSubscriptionService needs a signupBehavior");
        }
        if(!this.user) {
            throw new Error("SignUpforSubscriptionService needs a user");
        }
        if(!this.checkout_data) {
            throw new Error("SignUpforSubscriptionService needs checkout_data");
        }
        if(!this.subscriptionPlan) {
            throw new Error("SignUpforSubscriptionService needs a subscriptionPlan");
        }
        
        let signupBehavior = new this.signupBehavior();
        signupBehavior.user = this.user;
        signupBehavior.subscriptionPlan = this.subscriptionPlan;
        signupBehavior.checkout_data = this.checkout_data;
        signupBehavior.do_not_reset = this.do_not_reset;
        
        let signupData = await signupBehavior.do();
        return signupData;
    }
}

class SignupWithStripeService extends SignUpforSubscriptionService {
    constructor() {
        super();
        this.signupBehavior = SignupUserWithStripeBehavior;
    }
}

module.exports = {
    SignupWithStripeService
}