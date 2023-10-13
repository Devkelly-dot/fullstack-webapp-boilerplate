const SubscriptionPlan = require("../../db/models/SubscriptionPlan");
const { GetStripePriceData } = require("../../services/stripe/getPriceData/getPriceDataService");
const { CheckAndCreateFourSubscriptionPlansService } = require("../../services/subscriptions/createSubscriptionPlans/createBaseSubscriptionPlansService");
const { subscriptionPlanTitlesEnum } = require("../../utils/enums/subscriptionEnums");

class GetBaseSubscriptionPlans {
    constructor() {

    }

    async do(req, res) {
        try {
            let service = new CheckAndCreateFourSubscriptionPlansService();
            try {
                const plans = await service.do();
                if(plans?.plans) {
                    let returned_plans = {
                        tier0: {},
                        tier1: {},
                        tier2: {},
                        tier3: {}
                    };
                    returned_plans.tier0 = plans?.plans?.find((plan)=>plan.title === subscriptionPlanTitlesEnum.FREE);
                    returned_plans.tier1 = plans?.plans?.find((plan)=>plan.title === subscriptionPlanTitlesEnum.TIER1);
                    returned_plans.tier2 = plans?.plans?.find((plan)=>plan.title === subscriptionPlanTitlesEnum.TIER2);
                    returned_plans.tier3 = plans?.plans?.find((plan)=>plan.title === subscriptionPlanTitlesEnum.TIER3);

                    return res.status(200).send(returned_plans);
                }
                
            } catch (error) {
                throw error;
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: "Soemthing went wrong, try again later"});
        }
    }
}

module.exports = {
    GetBaseSubscriptionPlans
}