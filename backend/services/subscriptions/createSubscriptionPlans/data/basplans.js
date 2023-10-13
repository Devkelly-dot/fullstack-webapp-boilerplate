const { subscriptionPlanTitlesEnum, chatPriorityEnum } = require("../../../../utils/enums/subscriptionEnums");
require('dotenv').config()

class GetBasePlansClass {
    constructor() {

    }

    getPlans() {
        const subscriptionPlansBasePlans = [
            
            {
                monthly_price_id: null,
                yearly_price_id: null,
                displayName: 'Free',
                title: subscriptionPlanTitlesEnum.FREE,
                description: 'Try out our ai chat bot',
                includes: {
                    messages: 50,
                    can_create_characters: true,
                    can_access_community_characters: true,
                    memory_size: 1750,
                    can_edit_memory_size: false,
                    max_ai_message_length: 250,
                    can_edit_ai_message_length: false,
                    chat_priority: chatPriorityEnum.SHARED
                },
                monthly_price: 0,
                yearly_price: 0,
                currency: 'usd',
                grade_level: 0, // for upgrades. Moving from grade_level 0 to 4 would be an upgrade. 4 to 1 would be downgrade, etc. 
            },
            {
                monthly_price_id: process.env.STRIPE_TIER1_MONTHLY_ID,
                yearly_price_id: process.env.STRIPE_TIER1_YEARLY_ID,
                displayName: 'Standard',
                title: subscriptionPlanTitlesEnum.TIER1,
                description: 'More messages and priority chat',
                includes: {
                    messages: 2000,
                    can_create_characters: true,
                    can_access_community_characters: true,
                    memory_size: 1750,
                    can_edit_memory_size: false,
                    max_ai_message_length: 250,
                    can_edit_ai_message_length: false,
                    chat_priority: chatPriorityEnum.LOW
                },
                monthly_price: 5.99,
                yearly_price: 58.88,
                currency: 'usd',
                grade_level: 1,
            },
            {
                monthly_price_id: process.env.STRIPE_TIER2_MONTHLY_ID,
                yearly_price_id: process.env.STRIPE_TIER2_YEARLY_ID,
                displayName: 'Premium',
                title: subscriptionPlanTitlesEnum.TIER2,
                description: 'More messages, memory, and higher priority',
                includes: {
                    messages: 6000,
                    can_create_characters: true,
                    can_access_community_characters: true,
                    memory_size: 1750,
                    can_edit_memory_size: false,
                    max_ai_message_length: 250,
                    can_edit_ai_message_length: false,
                    chat_priority: chatPriorityEnum.SHARED
                },
                monthly_price: 14.99,
                yearly_price: 94.88,
                currency: 'usd',
                grade_level: 2,
            },
            {
                monthly_price_id: process.env.STRIPE_TIER3_MONTHLY_ID,
                yearly_price_id: process.env.STRIPE_TIER3_YEARLY_ID,
                displayName: 'Deluxe',
                title: subscriptionPlanTitlesEnum.TIER3,
                description: 'Maximum memory, highest priority, and unlimited messages.',
                includes: {
                    messages: null, // max
                    can_create_characters: true,
                    can_access_community_characters: true,
                    memory_size: 1750,
                    can_edit_memory_size: false,
                    max_ai_message_length: 250,
                    can_edit_ai_message_length: false,
                    chat_priority: chatPriorityEnum.SHARED
                },
                monthly_price: 49.99,
                yearly_price: 358.88,
                currency: 'usd',
                grade_level: 3,
            }
        ];

        return subscriptionPlansBasePlans
    }
}

module.exports = {
    GetBasePlansClass
}