const { CreateNodemailerMailBehavior } = require("./behaviors/createMailBehavior");
const { SendNodemailerRecoveryEmailBehavior } = require("./behaviors/sendRecoveryBehavior");

class ForgotPasswordService {
    constructor() {
        this.user = null; 
        this.createMailBehavior = null;
        this.sendRecoverBehavior = null;
    }

    async do() {
        if(!this.user) {
            throw new Error("ForgotPasswordService needs a user");
        }
        if(!this.createMailBehavior) {
            throw new Error("ForgotPasswordEmailService needs a createMailBehavior");
        }
        if(!this.sendRecoverBehavior) {
            throw new Error("ForgotPasswordEmailService needs a sendRecoverBehavior");
        }

        let createMailBehavior = new this.createMailBehavior();
        createMailBehavior.user = this.user;
        let mail = await createMailBehavior.do();
        
        if(mail.error) {
            return mail.error;
        }

        let sendRecoverBehavior = new this.sendRecoverBehavior();
        sendRecoverBehavior.mail = mail;
        let data = await sendRecoverBehavior.do();

        return data; 
    }
}

class ForgotPasswordEmailService extends ForgotPasswordService {
    constructor() {
        super();
        this.createMailBehavior = CreateNodemailerMailBehavior;
        this.sendRecoverBehavior = SendNodemailerRecoveryEmailBehavior;
    }
}

module.exports = {
    ForgotPasswordEmailService
}