const validator = require('validator');

class ValidateFormBehavior {
    constructor() {
        this.form = null;
    }

    async do() {
        if(!this.form) {
            throw new Error("Please give ValidateFormBehavior a form");
        }

        let validated = await this.validate();
        return validated;
    }   

    async validate() {
        throw new Error("Please give ValidateFormBehavior a validate method");
    }
}

class ValidateUserForm extends ValidateFormBehavior {
    constructor() {
        super();
    }

    async validate() {
        let email = this.form?.email;
        let password = this.form?.password;
        let username = this.form?.username;

        if(!validator.isEmail(email)) {
            return {
                error: {
                    code: 400,
                    message: "Invalid email address"
                }
            }
        }

        
        if(!password || password.length < 8) {
            return {
                error: {
                    code: 400, 
                    message: "Please make your password at least 8 characters long"
                }
            }
        }

        if(username && username.includes(' ')) {
            return {
                error: {
                    code: 400,
                    message: "Your username cannot have a space."
                }
            }
        }

        if (username && username.toLowerCase() === 'admin') {
            return {
                error: {
                    code: 400,
                    message: "Your username cannot be admin."
                }
            }
        }

        if(username && username.length > 12) {
            return {
                error: {
                    code: 400,
                    message: "Your username must be under 12 characters"
                }
            } 
        }
        
        return {
            username,
            email, 
            password
        }
    }
}

module.exports = {
    ValidateUserForm
}