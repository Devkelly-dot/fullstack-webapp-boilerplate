const subscriptionPlanTitlesEnum = Object.freeze({
    FREE: 'Free',
    TIER1: 'Standard',
    TIER2: 'Premium',
    TIER3: 'Deluxe',
});

const chatPriorityEnum = Object.freeze({
    SHARED: 'Shared',
    LOW: 'Basic',
    MEDIUM: 'Medium',
    HIGH: 'High',
});

const subscriptionStatusEnum = Object.freeze({
    PENDING: 'Pending',
    ACTIVE: 'Active',
    INACTIVE: 'Inactive'
});

const SubscriptionRenewalStatusEnum = Object.freeze({
    RENEW: 'Renew',
    CANCEL: 'Cancel'
});

const SubscriptionPlanRenewalField = Object.freeze({
    MONTHLY: 'monthly_price_id',
    YEARLY: 'yearly_price_id'
});

module.exports = { chatPriorityEnum, subscriptionStatusEnum, SubscriptionRenewalStatusEnum, SubscriptionPlanRenewalField, subscriptionPlanTitlesEnum };