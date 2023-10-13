const { SetUserSubscriptionToRenewService, SetUserSubscriptionToNotRenewService } = require("../../services/subscriptions/changeSubscriptionRenewal/changeSubscriptionRenewalService");
const { basePostController } = require("../base/basePostController");

class ChangeRenewController extends basePostController {
    constructor() {
        super();
        this.optional_fields = [
            'do_renew'
        ]
    }

    async handleRequest(req, validated_fields) {
        const {do_renew} = validated_fields;
        let service = null;

        if(do_renew) {
            service = new SetUserSubscriptionToRenewService();
        } else {
            service = new SetUserSubscriptionToNotRenewService();
        }

        let subscription = req.subscription;
        if(!subscription) {
            return {
                error: {
                    code: 400,
                    message: "Could not get user's subscription."
                }
            }
        }
        try {
            service.subscription = subscription;
            let data = await service.do();
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = {
    ChangeRenewController
}