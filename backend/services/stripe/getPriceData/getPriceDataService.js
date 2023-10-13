const { GetStripePriceDataBehavior } = require("./behavior/getPriceDataBehavior");

class GetPriceDataService {
    constructor() {
        this.getPriceDataBehavior = null;
        this.prices = null;
    }

    async do() {
        if(!this.getPriceDataBehavior) {
            throw new Error("GetPriceDataService requires GetPriceDataBehavior");
        }
        if(!this.prices) {
            throw new Error("GetPriceDataService requires this.prices");
        }

        let get_price_behavior = new this.getPriceDataBehavior();
        get_price_behavior.prices = this.prices;

        let data = await get_price_behavior.do();
        return data;
    }
}

class GetStripePriceData extends GetPriceDataService {
    constructor() {
        super();
        this.getPriceDataBehavior = GetStripePriceDataBehavior;
    }
}

module.exports = {
    GetStripePriceData
}