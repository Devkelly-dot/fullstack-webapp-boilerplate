const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const BaseModelSchema = require('./base/Base');
const Subscription = require('./Subscription');
const SubscriptionPlan = require('./SubscriptionPlan');
const { subscriptionPlanTitlesEnum } = require('../../utils/enums/subscriptionEnums');
const { CheckAndCreateFourSubscriptionPlansService } = require('../../services/subscriptions/createSubscriptionPlans/createBaseSubscriptionPlansService');

const UserModel = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        maxlength: 12,
        required: true,
        unique: true,
        validate: {
            validator: function(username) {
                return /^[^\s]+$/.test(username) && username.length >= 1;
            },
            message: 'Username must not contain spaces and should have a minimum length of 1 character.'
        }
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    profile_image_url: {
      type: mongoose.SchemaTypes.String,
    },
    bio: {
      type: mongoose.SchemaTypes.String,
      maxlength: 200,
    },
    tokens: {
      type: mongoose.SchemaTypes.Number,
      default: 0
    },
    extra_messages: {
      type: mongoose.SchemaTypes.Number,
      default: 0
    },
    show_nsfw: {
      type: mongoose.SchemaTypes.Boolean,
      default: false
    },
    stripe_id: {
      type: mongoose.SchemaTypes.String,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubscriptionModel'
    }
});

UserModel.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;

      let current_sub = this.subscription;
      if(current_sub) {
        current_sub = await Subscription.findOne({
          _id: current_sub
        });
      }

      if(!current_sub) {
        // if user doesn't have a subscription, set them up with a free one.

        let free_plan = await SubscriptionPlan.findOne({
          title: subscriptionPlanTitlesEnum.FREE
        });

        if(!free_plan) {
          // if free subscription plan doesn't exist we have to create it (and the rest)
          let createPlansService = new CheckAndCreateFourSubscriptionPlansService();
          await createPlansService.do();

          free_plan = await SubscriptionPlan.findOne({
            title: subscriptionPlanTitlesEnum.FREE
          });
        }

        if(free_plan) {
          const subscription = await Subscription.create({
            user: this._id,
            subscriptionPlan: free_plan._id,
            onRenewal: free_plan._id,
            messages_left: free_plan.includes.messages
          });

          this.subscription = subscription._id;
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  });

UserModel.add(BaseModelSchema)
module.exports = mongoose.model('user', UserModel);