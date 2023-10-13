const User = require("../../../../db/models/User");
const generateToken = require("../../../../utils/auth/generateToken");

class RegisterBehavior {
    constructor() {
        this.form = null;
    }

    async do() {
        if(!this.form) {
            throw new Error("RegisterBehavior needs a form");
        }

        const register_data = await this.register();
        return register_data;
    }

    async register() {
        throw new Error("Define register method on RegisterBehavior");
    }
}

class RegisterUserBehavior extends RegisterBehavior {
    constructor() {
        super();
    }

    async register() {
        const { username, email, password } = this.form;
        try {
            const user = await User.create({ username, email, password });
            const token = generateToken(user);
            return {
                user: {
                    username: user.username,
                    email: user.email,
                    _id: user._id
                },
                token: token
            }
        } catch (e) {
            throw e;
        }
    }
}

module.exports = {
    RegisterUserBehavior
}