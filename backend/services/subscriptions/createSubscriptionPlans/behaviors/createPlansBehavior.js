const SubscriptionPlan = require("../../../../db/models/SubscriptionPlan");
const { GetStripePriceData } = require("../../../stripe/getPriceData/getPriceDataService");

class CreatePlansBehavior {
    constructor() {
        this.base_plans_objects = null;
    }

    async do() {
        if(!this.base_plans_objects) {
            throw new Error("Give checkforplansservice a base_plans_objects");
        }
        
        let data = await this.check();
        return data;
    }

    async check(){ 
        throw new Error("Define check method on CheckForPlansBehavior");
    }
}

class CreateNonExistingPlansBehavior extends CreatePlansBehavior {
    constructor() {
        super();
    }

    async check() {
        let plans = [];
        for(let i = 0; i < this.base_plans_objects.length; i++) {
            let current_plan = this.base_plans_objects[i];
            const title = current_plan.title;

            let plan = await SubscriptionPlan.findOne({
                title: title,
            });
            let price_data_service = new GetStripePriceData();
            if(!plan) {
                plan = await SubscriptionPlan.create(current_plan);
                let prices = [];
                if(plan.monthly_price_id) {
                    prices.push(plan.monthly_price_id);
                }
                if(plan.yearly_price_id) {
                    prices.push(plan.yearly_price_id);
                }

                if(plans.length > 0) {
                    price_data_service.prices = prices;
                    let price_data = await price_data_service.do();

                    if(price_data[plan.monthly_price_id].unit_amount) {
                        plan.monthly_price = price_data[plan.monthly_price_id].unit_amount
                    }
                    if(price_data[plan.yearly_price_id].unit_amount) {
                        plan.yearly_price = price_data[plan.yearly_price_id].unit_amount
                    }
                    if(price_data[plan.monthly_price_id].currency) {
                        plan.currency = price_data[plan.monthly_price_id].currency;
                    }

                    await plan.save();
                }
                plans.push(plan);
            } else {
                plans.push(plan);
            }
        }

        return {
            plans,
            basePlans: this.base_plans_objects
        }
    }
}

module.exports = {
    CreateNonExistingPlansBehavior
}