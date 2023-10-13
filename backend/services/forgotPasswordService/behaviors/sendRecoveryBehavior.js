const { SendNodemailerService } = require("../../sendEmailService/sendEmailService");

class SendRecoveryBehavior {
    constructor() {
        this.mail = null;
    }

    async do() {
        if(!this.mail) {
            throw new Error("SendRecoveryBehavior needs a mail object");
        }

        let data = await this.send();
        return data;
    }

    async send() {
        throw new Error("SendRecoveryBehavior needs a send method");
    }
}

class SendRecoveryEmailBehavior extends SendRecoveryBehavior {
    constructor() {
        super();
        this.sendService = null;
    }

    async send() {
        if(!this.sendService) {
            throw new Error("SendRecoveryBehavior needs a sendService");
        }

        let sendService = new this.sendService();
        sendService.mail = this.mail; 

        let data = await sendService.do();
        return data;
    }
}

class SendNodemailerRecoveryEmailBehavior extends SendRecoveryEmailBehavior {
    constructor() {
        super();
        this.sendService = SendNodemailerService;
    }
}

module.exports = {
    SendNodemailerRecoveryEmailBehavior
}