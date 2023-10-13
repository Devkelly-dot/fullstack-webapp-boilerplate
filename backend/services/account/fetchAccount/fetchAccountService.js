const { FetchAccountByEmailBehavior } = require("./behaviors/fetchAccountBehavior");

class FetchAccountService {
    // fetches redacted account for the user to see
    constructor() {
        this.fetchAccountBehavior = null;
        this.account = null;
    }

    async do() {
        if(!this.fetchAccountBehavior) {
            throw new Error("FetchAccountService needs fetchAccountBehavior");
        }
        if(!this.account) {
            throw new Error("FetchAccountService needs account");
        }
        let fetch_behavior = new this.fetchAccountBehavior();
        fetch_behavior.account = this.account;
        
        const data = await fetch_behavior.do();
        return data;
    }
}

class FetchMyAccountByEmailService extends FetchAccountService {
    constructor() {
        super();
        this.fetchAccountBehavior = FetchAccountByEmailBehavior;
    }
}

module.exports = {
    FetchMyAccountByEmailService
}