const { UserRegisterService } = require("../../services/auth/register/registerService");
const { basePostController } = require("../base/basePostController");

class RegisterController extends basePostController{
    constructor() {
        super();
        this.required_fields = [
            "email",
            "username",
            "password"
        ];

        this.optional_fields = [
            
        ];
    }

    async handleRequest(req, validated_fields) {
        let registerService = new UserRegisterService();
        registerService.form = validated_fields;
        let return_data = await registerService.do();
        return return_data;
    }
}

module.exports = RegisterController;