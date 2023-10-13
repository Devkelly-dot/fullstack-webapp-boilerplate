const { basePostController } = require("../base/basePostController");

class ChangePasswordController  extends basePostController {
    constructor() {
        super();
        this.required_fields = [
            'new_password'
        ]
    }

    async handleRequest(req, validated_fields) {
        const {new_password} = validated_fields;
        if(!req.user) {
            return {
                error: {
                    code: 403,
                    message: "No user found, can't edit account"
                }
            }
        }

        if(!new_password || new_password.length < 8) {
            return {
                error: {
                    code: 400, 
                    message: "Please make your password at least 8 characters long"
                }
            }
        }

        req.user.password = new_password;
        try {
            await req.user.save();
            return {message: 'Password successfully changed'}
        } catch (error) {
            return {
                error: {
                    code: 500,
                    message: "Couldn't change password"
                }
            }
        }
    }
}

module.exports = {
    ChangePasswordController
}