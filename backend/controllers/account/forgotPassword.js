const { ForgotPasswordEmailService } = require("../../services/forgotPasswordService/forgotPasswordService");
const { basePostController } = require("../base/basePostController");

class ForgotPasswordController extends basePostController {
    constructor() {
        super();
        this.required_fields = [
            'email'
        ]
    }

    async handleRequest(req, validated_fields) {
        let forgotPasswordService = new ForgotPasswordEmailService();
        forgotPasswordService.user = {
            email: validated_fields.email
        }

        try {
            const data = await forgotPasswordService.do();
            return {message: 'If this email is in our database, you will receieve and email shortly'}
        } catch (error) {
            console.log(error)
            return {
                error: {
                    code: 500,
                    message: "Something went wrong, please try again later"
                }
            }
        }
    }
}

module.exports = {
    ForgotPasswordController
}