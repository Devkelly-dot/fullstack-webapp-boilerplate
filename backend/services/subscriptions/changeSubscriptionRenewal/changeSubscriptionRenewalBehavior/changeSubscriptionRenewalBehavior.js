const { SubscriptionRenewalStatusEnum } = require('../../../../utils/enums/subscriptionEnums');

require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class changeSubscriptionRenewalBehavior {
    constructor() {
        this.subscription = null;
    }

    async do() {
        if(!this.subscription) {
            throw new Error("changeSubscriptionRenewalBehavior needs subscription");
        }

        let data = await this.cancel();
        return data;
    }

    async cancel() {
        throw new Error("changeSubscriptionRenewalBehavior needs cancel method");
    }
}

class SetStripeSubscriptionToNotRenewBehavior extends changeSubscriptionRenewalBehavior {
    constructor(){
        super();
        this.do_renew = null;
    }
    
    async set_cancel_local() {
        let renewal_status = SubscriptionRenewalStatusEnum.CANCEL;

        if(this.do_renew) {
            renewal_status = SubscriptionRenewalStatusEnum.RENEW;
        }

        this.subscription.renewal_status = renewal_status;
        await this.subscription.save();
    }

    async set_cancel_stripe() {
        const updatedSubscription = await stripe.subscriptions.update(this.subscription.stripe_id, {
            cancel_at_period_end: !this.do_renew,
        });

        return updatedSubscription;   
    }

    async cancel() {
        if(!this.subscription?.stripe_id) {
            throw new Error("SetStripeSubscriptionToNotRenewBehavior needs subscription.stripe_id");
        }

        if(!this.do_renew) {
            this.do_renew = false;
        }

        await this.set_cancel_stripe();
        await this.set_cancel_local();

        return this.subscription;
    }
}

class SetStripeSubscriptionToRenewBehavior extends SetStripeSubscriptionToNotRenewBehavior {
    constructor() {
        super();
        this.do_renew = true;
    }
}
module.exports = {
    SetStripeSubscriptionToNotRenewBehavior,
    SetStripeSubscriptionToRenewBehavior
}