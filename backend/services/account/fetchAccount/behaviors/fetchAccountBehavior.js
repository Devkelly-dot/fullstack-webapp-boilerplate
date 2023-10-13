const User = require("../../../../db/models/User");

class FetchAccountBehavior {
    constructor() {
        this.account = null;
    }

    async do() {
        if(!this.account) {
            throw new Error("FetchAccountBehavior needs account");
        }

        let data = await this.fetch();
        return data;
    }

    async fetch() {
        throw new Error("Define fetch method on FetchAccountBehavior")
    }
}

class FetchAccountByEmailBehavior extends FetchAccountBehavior {
    constructor() {
        super();
    }

    async fetch() {
        const user = await User.findOne({
            email: this.account.email
        });

        if(!user) {
            return {
                error: {
                    code: 403,
                    message: "Could not get your account information"
                }
            }
        }
        return {
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
    FetchAccountByEmailBehavior
}