require('dotenv').config()
const nodemailer = require("nodemailer");

class SendEmailBehavior {
    constructor() {
        this.mail = null;
    }

    async do() {
        if(!this.mail) {
            throw new Error("SendEmailBehavior needs a mail object")
        }

        let email_data = await this.send();
        return email_data;
    }

    async send() {
        throw new Error("SendEmailBehavior needs a send method");
    }
}

class SendNodemailerEmailBehavior extends SendEmailBehavior {
    constructor() {
        super();
    }
    async send() {
        if(!this.mail.to) {
            throw new Error("SendNodemailerEmailBehavior requires a mail.to");
        }

        if(!this.mail.subject) {
            throw new Error("SendNodemailerEmailBehavior requires a mail.subject");
        }

        if(!this.mail.text) {
            throw new Error("SendNodemailerEmailBehavior requires a mail.text");
        }
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: this.mail.from,
            to: this.mail.to,
            subject: this.mail.subject,
            text: this.mail.text
        }

        transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                console.log(error);
                throw new Error("Something went wrong sending the email");
            } else {
                return {success: info}; 
            }
        });
    }
}

module.exports = {
    SendNodemailerEmailBehavior
}