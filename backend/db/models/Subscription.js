const { default: mongoose } = require("mongoose");
const { subscriptionStatusEnum, SubscriptionRenewalStatusEnum, SubscriptionPlanRenewalField } = require("../../utils/enums/subscriptionEnums");
const BaseModelSchema = require('./base/Base');

const SubscriptionModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel', 
        required: true,
    },
    subscriptionPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubscriptionPlanModel', 
        required: true,
    },
    onRenewal: { 
        // when user downgrades their plan, set this so that when the strpe webhook hits they have the downgraded subscription.
        // we cannot change the subscriptionPlan to the downgraded one immediately or the user will lose the features they paid for. 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubscriptionPlanModel', 
        required: true,
    },
    stripe_id: {
        type: mongoose.SchemaTypes.String
    },
    subscriptionPlan_renewal_field: { // whether subscription is yearly or monthly
        type: mongoose.SchemaTypes.String,
        enum: Object.values(SubscriptionPlanRenewalField),
        default: SubscriptionPlanRenewalField.MONTHLY,
    },
    status: {// will pretty much always be acstive or pending since we just downgrade to active free plan if no other plan is active
        type: mongoose.SchemaTypes.String,
        enum: Object.values(subscriptionStatusEnum),
        default: subscriptionStatusEnum.ACTIVE,
    },
    renewal_status: { 
        type: mongoose.SchemaTypes.String,
        enum: Object.values(SubscriptionRenewalStatusEnum),
        default: SubscriptionRenewalStatusEnum.RENEW,
    },
    messages_left: {
        type: mongoose.SchemaTypes.Number,
        default: 0
    },
    last_reset: { // last time messages were reset
      type: Date,
      default: Date.now,
    }
});

SubscriptionModel.add(BaseModelSchema)
module.exports = mongoose.model('subscription', SubscriptionModel);