const { CheckExistingEmailBehavior } = require("./behaviors/checkExistingBehavior");
const { RegisterUserBehavior } = require("./behaviors/registerBehavior");
const { ValidateUserForm } = require("./behaviors/validateFormBehavior");

class RegisterService {
    constructor() {
        this.form = null;

        this.validateFormBehavior = null;
        this.checkExistingBehavior = null;
        this.registerBehavior = null;
    }

    async do() {
        if(!this.form) {
            throw new Error("Please define form on RegisterService");
        }
        if(!this.validateFormBehavior) {
            throw new Error("Please define validateFormBehavior on RegisterService");
        }
        if(!this.checkExistingBehavior) {
            throw new Error("Please define checkExistingBehavior on RegisterService");
        }
        if(!this.registerBehavior) {
            throw new Error("Please define registerBehavior on RegisterService");
        }

        let validate_form_behavior = new this.validateFormBehavior();
        validate_form_behavior.form = this.form;
        let validated_form = await validate_form_behavior.do();

        if(!validated_form) {
            throw new Error("validate_form_behavior should return something");
        }

        if(validated_form.error) {
            return validated_form;
        }

        let check_existing_behavior = new this.checkExistingBehavior();
        check_existing_behavior.form = validated_form;
        let existing = await check_existing_behavior.do();

        if(!existing) {
            throw new Error("checkExistingBehavior must return something");
        }

        if(existing.error) {
            return existing;
        }
        
        let register_behavior = new this.registerBehavior();
        register_behavior.form = validated_form;

        let register_data = await register_behavior.do();

        return register_data;
    }
}

class UserRegisterService extends RegisterService {
    constructor() {
        super();
        this.validateFormBehavior = ValidateUserForm;
        this.checkExistingBehavior = CheckExistingEmailBehavior;
        this.registerBehavior = RegisterUserBehavior;
    }
}

module.exports = {
    UserRegisterService
}