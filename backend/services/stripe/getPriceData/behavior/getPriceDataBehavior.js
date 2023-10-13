require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class GetPriceDataBehavior {
    constructor() {
        this.prices = null;
    }

    async do() {
        if(!this.prices) {
            throw new Error("GetPriceDataBehavior needs prices");
        }

        let data = await this.getPrices();
        return data;
    }

    async getPrices() {
        throw new Error("GetPriceDataBehavior needs getPrices method");
    }
}

class GetStripePriceDataBehavior extends GetPriceDataBehavior {
    constructor() {
        super();
    }
    async getPrices() {
        const prices = this.prices;
        let return_data = {};
        try {
            for(let i = 0; i < prices.length; i++) {
                const stripeId = prices[i];
                try {
                    const priceData = await stripe.prices.retrieve(stripeId);
                    return_data[stripeId] = priceData; 
                } catch(e) {
                    console.log("ERROR fetching price data for ", stripeId)
                    console.log(e);
                }
            }
            return return_data;
        } catch (error) {
            console.error('Error fetching price data:', error);
            throw error;
        }
    }
}

module.exports = {
    GetStripePriceDataBehavior
}