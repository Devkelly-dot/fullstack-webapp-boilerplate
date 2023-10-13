const User = require('../../../../../db/models/User');

class FindUserBehavior {
    constructor() {
        this.checkout_data = null;
    }

    async do() {
        if(!this.checkout_data) {
            throw new Error("FindUserBehavior needs checkout_data")
        }

        let user = await this.findUser();
        return user;
    }

    async findUser() {
        throw new Error("FindUserBehavior needs a findUser method");
    }
}

class FindUserByStripeIdBehavior extends FindUserBehavior {
    constructor() {
        super();
    }

    async findUser() {
        if(!this.checkout_data?.customer) {
            throw new Error("FindUserByStripeIdBehavior checkout_data needs customer");
        }

        let stripe_id = this.checkout_data.customer;
        let user = await User.findOne({
            stripe_id: stripe_id
        });

        if(!user){ 
            throw new Error("User with this stripe id does not exist: FindUserByStripeIdBehavior");
        }

        return user;
    }
}

module.exports = {
    FindUserByStripeIdBehavior
}