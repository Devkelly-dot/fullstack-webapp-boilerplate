const { LoginUserService } = require("../../services/auth/login/loginService");
const { basePostController } = require("../base/basePostController");

class SigninController extends basePostController{
    constructor() {
        super();
        this.required_fields = [
            "email",
            "password"
        ];

        this.optional_fields = [
            
        ];
    }

    async handleRequest(req, validated_fields) {
        let loginService = new LoginUserService();
        loginService.form = validated_fields;
        let return_data = await loginService.do();
        return return_data;
    }
}

module.exports = SigninController;