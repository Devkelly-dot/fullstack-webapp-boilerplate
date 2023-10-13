const { EditAccountProfileBehavior } = require("./behaviors/editBehavior");

class EditAccountService {
    constructor() {
        this.form = null;
        this.account = null;
        this.editAccountBehavior = null;
    }

    async do() {
        if(!this.form) {
            throw new Error("Please provide a form to EditAccountService");
        }
        if(!this.account) {
            throw new Error("Please provide a account to EditAccountService");
        }
        if(!this.editAccountBehavior) {
            throw new Error("Please provide an editAccountBehavior to EditAccountService");
        }

        let edit_account_behavior = new this.editAccountBehavior();
        edit_account_behavior.form = this.form;
        edit_account_behavior.account = this.account;

        let new_account = await edit_account_behavior.do();
        return new_account;
    }
}

class EditAccountProfileService extends EditAccountService {
    constructor() {
        super();
        this.editAccountBehavior = EditAccountProfileBehavior;
    }
}

module.exports = {
    EditAccountProfileService
}