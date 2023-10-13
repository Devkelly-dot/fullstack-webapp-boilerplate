const { SendNodemailerEmailBehavior } = require("./behaviors/sendEmailBehavior");

class SendEmailService {
    constructor() {
        this.mail = null;
        this.sendBehavior = null;
    }

    async do() {
        if(!this.mail) {
            throw new Error("SendEmailService needs a mail object");
        }

        if(!this.sendBehavior) {
            throw new Error("SendEmailService needs a sendBehavior class");
        }

        let send_behavior = new this.sendBehavior();
        send_behavior.mail = this.mail;
        let send_data = await send_behavior.do();
        return send_data;
    }
}

class SendNodemailerService extends SendEmailService {
    constructor() {
        super();
        this.sendBehavior = SendNodemailerEmailBehavior;
    }
};

module.exports = {
    SendNodemailerService
}