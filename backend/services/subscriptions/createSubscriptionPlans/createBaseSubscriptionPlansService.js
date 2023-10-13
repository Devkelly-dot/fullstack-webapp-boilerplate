const { CreateNonExistingPlansBehavior } = require("./behaviors/createPlansBehavior");
const { GetBasePlansClass } = require("./data/basplans");

class CreateBaseSubscriptionPlansService {
    constructor() {
        this.get_base_plans_service = null;
        this.create_plans_behavior = null; 
    }

    async do() {
        if(!this.get_base_plans_service) {
            throw new Error("CreateBaseSubscriptionPlansService needs get_base_plans_service");
        }

        if(!this.create_plans_behavior) {
            throw new Error("CreateBaseSubscriptionPlansService needs create_plans_behavior");
        }

        let baseplan = new this.get_base_plans_service();
        let plans = baseplan.getPlans();

        let create_plans_behavior = new this.create_plans_behavior();
        create_plans_behavior.base_plans_objects = plans;
        let data = await create_plans_behavior.do();
        return data; 
    }
}

class CheckAndCreateFourSubscriptionPlansService extends CreateBaseSubscriptionPlansService {
    // checks if the pricing plans are in the database and creates any missing ones. 
    constructor() {
        super();
        this.get_base_plans_service = GetBasePlansClass;
        this.create_plans_behavior = CreateNonExistingPlansBehavior; 
    }
}

module.exports = {
    CheckAndCreateFourSubscriptionPlansService
}