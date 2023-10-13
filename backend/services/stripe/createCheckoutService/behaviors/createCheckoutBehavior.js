require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class CreateCheckoutBehavior {
    constructor() {
        this.items = null;
        this.user = null;
    }

    async do() {
        if(!this.user) {
            throw new Error("You must give CreateCheckoutBehavior a user");
        }

        if(!this.items) {
            throw new Error("You must give CreateCheckoutBehavior items");
        }

        let data = await this.createCheckout();
        return data;
    }

    async createCheckout() {
        throw new Error("You must give CreateCheckoutBehavior a createCheckout method");
    }
}

class CreateStripeCheckoutBehavior extends CreateCheckoutBehavior {
    constructor() {
        super();
    }

    createLineItems(items) {
        if(!items[0]?.stripe_id) {
            throw new Error("CreateStripeCheckoutBehavior needs an items[0].stripe_id");
        }

        let price_id = items[0].stripe_id; 
        let line_items = [
            {
                price: price_id,
                quantity: 1
            }
        ];

        return line_items;
    }

    async createCheckout() {
        if(!this.user.stripe_id) {
            try {
                const customer = await stripe.customers.create({
                    email: this.user.email,
                });
                this.user.stripe_id = customer.id;
                await this.user.save();
            } catch (error) {
                console.log(error);
                return {
                    error: {
                        code: 403,
                        message: "User has no email"
                    }
                }
            }
        } else {
            try {
                const retrievedCustomer = await stripe.customers.retrieve(this.user.stripe_id);
                if(!retrievedCustomer) {
                    const customer = await stripe.customers.create({
                        email: this.user.email,
                    });
                    this.user.stripe_id = customer.id;
                    await this.user.save(); 
                } 
            } catch (error) {
                console.log(error);
                return {
                    error: {
                        code: 500,
                        message: "Something went wrong retrieving customer data"
                    }
                }
            }
        }

        let line_items = this.createLineItems(this.items);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'subscription',
            success_url: `${process.env.FRONTEND_URL}?success=true`,
            cancel_url: `${process.env.FRONTEND_URL}pricing?cancel=true`,
            customer: this.user.stripe_id
        });

        return session;
    }
}

module.exports = {
    CreateStripeCheckoutBehavior
}