const User = require('../../../../db/models/User') 

class CheckExistingBehavior {
    constructor() {
        this.form = null;
        this.required_fields = [];
    }

    async do() {
        if(!this.form) {
            throw new Error("Please provide a form to CheckExistingBehavior")
        }

        let missing_fields = [];
        
        for(let i = 0; i < this.required_fields.length; i++) {
            const field = this.required_fields[i];

            if(!this.form[field]) {
                missing_fields.push(field);
            }
        }

        if(missing_fields.length > 0) {
            throw new Error("CheckExistingBehavior form missing fields: "+missing_fields)
        }

        let existing = await this.checkExisting();
        return existing;
    }

    async checkExisting() {
        throw new Error("Define checkExisting method on CheckExistingBehavior")
    }
}

class CheckExistingEmailBehavior extends CheckExistingBehavior {
    constructor() {
        super();
        this.required_fields = ['email', 'username']
    }

    async checkExisting() {
        const existingUser = await User.findOne({
            $or: [
                {
                    email: this.form.email
                },
                {
                    username: this.form.username
                }
            ]
        });
        
        if(existingUser) {
            if(existingUser.email === this.form.email) {
                return {
                    error: {
                        code: 409,
                        message: "User with that email already exists"
                    }
                }
            } else if(existingUser.username === this.form.username) {
                return {
                    error: {
                        code: 409,
                        message: "User with that username already exists"
                    }
                }  
            } else {
                return {
                    error: {
                        code: 409,
                        message: "User with this username / email already exists"
                    }
                }
            }
        } else {
            return {
                unique: true
            }
        }
    }
}

module.exports = {
    CheckExistingEmailBehavior
}