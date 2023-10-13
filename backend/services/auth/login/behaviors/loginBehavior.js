const bcrypt = require('bcrypt');
const User = require("../../../../db/models/User");
const generateToken = require("../../../../utils/auth/generateToken");

class LoginBehavior {
    constructor() {
        this.form = null;
    }

    async do() {
        if(!this.form) {
            throw new Error("Define form on LoginBehavior");
        }

        const return_data = await this.login();
        return return_data;
    }

    async login() {
        throw new Error("Define login method on LoginBehavior");
    }
}

class LoginUserBehavior extends LoginBehavior {
    constructor() {
        super();
    }

    async login() {
        const {email, password} = this.form;

        const user = await User.findOne({
            email
        });

        if(!user) {
            return {
                error: {
                    code: 401,
                    message: "Incorrect email and password combination"
                }
            }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return {
                error: {
                    code: 401,
                    message: "Incorrect email and password combination"
                }
            }
        }

        const token = generateToken(user);
        return {
            token: token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                tokens: user.tokens,
                profile_image_url: user.profile_image_url,
                bio: user.bio,
                extra_messages: user.extra_messages,
                show_nsfw: user.show_nsfw
            }
        }
    }
}

module.exports = {
    LoginUserBehavior
}