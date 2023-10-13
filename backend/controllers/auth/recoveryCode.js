const PasswordRecoveryRequest = require("../../db/models/PasswordRecoveryRequest");
const { FetchMyAccountByEmailService } = require("../../services/account/fetchAccount/fetchAccountService");
const { basePostController } = require("../base/basePostController");
const generateToken = require("../../utils/auth/generateToken");
const User = require("../../db/models/User");

class RecoveryCodeController extends basePostController {
    constructor() {
        super();
        this.required_fields = [
            'code'
        ]
    }

    async handleRequest(req, validated_fields) {
        const {code} = validated_fields;

        try { 
            const recover_request = await PasswordRecoveryRequest.findOne({
                code: code
            });

            if(!recover_request) {
                return {
                    error: {
                        code: 404,
                        message: "Invalid Code"
                    }
                }
            }

            const email = recover_request.email;
            const db_user = await User.findOne({
                email: email
            });

            if(!db_user) {
                return {
                    error: {
                        code: 404,
                        message: 'User with this email not found.'
                    }
                }
            }

            let get_account_service = new FetchMyAccountByEmailService();
            get_account_service.account = {
                email: email
            }
            let user = await get_account_service.do();

            if(user.error) {
                return user;
            } else {
                await PasswordRecoveryRequest.deleteOne({
                    _id: recover_request._id
                });

                const token = generateToken(db_user);
                return {...user, token};
            }
        } catch (error) {
            console.log(error);
            return {
                error: {
                    code: 500,
                    message: "Something went wrong, try again later"
                }
            }
        }
    }
}

module.exports = {
    RecoveryCodeController
}