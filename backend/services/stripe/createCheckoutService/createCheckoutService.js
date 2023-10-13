const { CreateStripeCheckoutBehavior } = require("./behaviors/createCheckoutBehavior");

class CreateCheckoutService {
    constructor() {
        this.createCheckoutBehavior = null;
        this.items = null;
        this.user = null;
    }

    async do() {
        if(!this.createCheckoutBehavior) {
            throw new Error("CreateCheckoutService requires createCheckoutBehavior");
        }

        if(!this.items) {
            throw new Error("CreateCheckoutService requires items");
        }
        if(!this.user) {
            throw new Error("CreateCheckoutService requires user");
        }

        let createCheckoutBehavior = new this.createCheckoutBehavior();
        createCheckoutBehavior.items = this.items;
        createCheckoutBehavior.user = this.user;
        let data = await createCheckoutBehavior.do();
        return data;
    }
}

class CreateStripeSubCheckoutService extends CreateCheckoutService {
    constructor() {
        super();
        this.createCheckoutBehavior = CreateStripeCheckoutBehavior;
    }
}

module.exports = {
    CreateStripeSubCheckoutService
}