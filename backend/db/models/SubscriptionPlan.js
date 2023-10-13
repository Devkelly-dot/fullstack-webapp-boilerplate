const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const BaseModelSchema = require('./base/Base');
const { chatPriorityEnum } = require('../../utils/enums/subscriptionEnums');

const includesSchema = new mongoose.Schema({
    messages: {
        type: mongoose.SchemaTypes.Number,
        default: 50
    },
    can_create_characters: {
        type: mongoose.SchemaTypes.Boolean,
        default: true
    },
    can_access_community_characters: {
        type: mongoose.SchemaTypes.Boolean ,
        default: true
    },
    memory_size: {
        type: mongoose.SchemaTypes.Number,
        default: 1750
    },
    can_edit_memory_size: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    },
    max_ai_message_length: {
        type: mongoose.SchemaTypes.Number,
        default: 250
    },
    can_edit_ai_message_length: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    },
    chat_priority: {
        type: String,
        enum: Object.values(chatPriorityEnum),
        default: chatPriorityEnum.SHARED,
    },
});

const SubscriptionPlanModel = new mongoose.Schema({
    monthly_price_id: {
        type: mongoose.SchemaTypes.String
    },
    yearly_price_id: {
        type: mongoose.SchemaTypes.String
    },
    title: {
        type: mongoose.SchemaTypes.String,
        default: 'Free'
    },
    displayName: {
        type: mongoose.SchemaTypes.String,
        default: 'Free'
    },
    description: {
        type: mongoose.SchemaTypes.String,
        default: 'Try out our ai chat bot'
    },
    includes: {
        type: includesSchema
    },
    monthly_price: {
        type: mongoose.SchemaTypes.Number,
        default: 0
    },
    yearly_price: {
        type: mongoose.SchemaTypes.Number,
        default: 0
    },
    currency: {
        type: mongoose.SchemaTypes.String,
        default: 'usd'
    }
});

SubscriptionPlanModel.add(BaseModelSchema)
module.exports = mongoose.model('subscriptionPlan', SubscriptionPlanModel);