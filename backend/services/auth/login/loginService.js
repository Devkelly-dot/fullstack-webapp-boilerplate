const { LoginUserBehavior } = require("./behaviors/loginBehavior");

class LoginService {
    constructor() {
        this.form = null;
        this.loginBehavior = null;
    }

    async do() {
        if(!this.form) {
            throw new Error("Give LoginService a form");
        }
        if(!this.loginBehavior) {
            throw new Error("Give LoginService a loginBehavior");
        }

        let login_behavior = new this.loginBehavior();
        login_behavior.form = this.form;

        let return_data = await login_behavior.do();

        if(!return_data) {
            throw new Error("loginBehavior must return something")
        }

        if(return_data.error) {
            const error = return_data.error;
            return {
                error: {
                    code: error.code,
                    message: error.message
                }
            }
        }
        
        return return_data;
    }
}

class LoginUserService extends LoginService {
    constructor() {
        super();
        this.loginBehavior = LoginUserBehavior
    }
}

module.exports = {
    LoginUserService
}