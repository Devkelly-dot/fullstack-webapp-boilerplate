const PasswordRecoveryRequest = require("../../../db/models/PasswordRecoveryRequest");
const User = require("../../../db/models/User");
const crypto = require('crypto');

class CreateMailBehavior {
    constructor() {
        this.user = null;
    }

    async do() {
        if(!this.user) {
            throw new Error("CreateMailBehavior needs a user");
        }

        let data = await this.create();
        return data;
    }

    async create() {
        throw new Error("CreateMailBehavior needs create method");
    }
}

class CreateNodemailerMailBehavior extends CreateMailBehavior {
    constructor() {
        super();
    }

    async create() {
        if(!this.user.email) {
            throw new Error("CreateNodemailerMailBehavior needs a user.email");
        }

        const existingUser = await User.exists({email: this.user.email});

        if (!existingUser) {
            return {error: {
                code: 404,
                message: "User with email doesn't exist"
            }}
        }
        
        const new_code = crypto.randomBytes(4).toString('hex');

        let existing_request = await PasswordRecoveryRequest.findOne({
            email: this.user.email
        });

        if(!existing_request) {
            existing_request = await PasswordRecoveryRequest.create({
                email: this.user.email,
                code: new_code
            });
        } else {
            existing_request.code = new_code;
            await existing_request.save();
        }

        const mail = {
            from: process.env.GMAIL_EMAIL,
            to: this.user.email,
            subject: 'Ai Chat App Password Recovery',
            text: `Your Recovery Code: ${new_code}\n\n Or use the following LINK: ${process.env.FRONTEND_URL}forgot-password?code=${new_code}`,
            html: `
                <h4>Your Recovery Code: ${new_code}</h4>
                <div><p>Or use the following <a href="${process.env.FRONTEND_URL}forgot-password?code=${new_code}">LINK</a></p></div>
            `
        }

        return mail;
    }
}

module.exports = {
    CreateNodemailerMailBehavior
}