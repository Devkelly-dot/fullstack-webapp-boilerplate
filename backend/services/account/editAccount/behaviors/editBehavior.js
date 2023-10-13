const User = require("../../../../db/models/User");

class EditBehavior {
    constructor() {
        this.account = null;
        this.form = null;
        this.account = null;
    }

    async do() {
        if(!this.account) {
            throw new Error("Please give EditBehavior an account");
        }
        if(!this.form) {
            throw new Error("Please give EditBehavior a form");
        }
        if(!this.account) {
            throw new Error("Please give EditBehavior an account");
        }
        let edited_profile = await this.edit();
        return edited_profile;
    }

    async edit() {
        throw new Error("Please define edit method on EditBehavior");
    }
}

class EditAccountProfileBehavior extends EditBehavior {
    constructor() {
        super();
    }
    async edit() {
        let new_bio = this.form?.bio;
        let new_username = this?.form?.username;
        let new_show_nsfw = this.form?.show_nsfw;

        let user = await User.findOne({
            _id: this.account._id
        });

        if(!user) {
            return {
                error: {
                    code: 404,
                    message: "No user found when trying to edit account"
                }
            }
        }

        if(new_show_nsfw === true || new_show_nsfw === false) {
            user.show_nsfw = new_show_nsfw;
        }

        if(new_bio) {
            user.bio = new_bio;
        }
        if(new_username) {
            const cleanedUsername = new_username.replace(/\s/g, '');
            if (cleanedUsername.length >= 1) {
                if(cleanedUsername.toLowerCase() === 'admin') {
                    return {
                        error: {
                            code: 400,
                            message: "Username cannot be admin."
                        }
                    }
                }
                user.username = new_username;
            } else {
                return {
                    error: {
                        code: 400,
                        message: "Username must not contain spaces."
                    }
                }
            }
            let existing_user = await User.findOne({
                username: cleanedUsername
            });

            if(existing_user && existing_user._id?.toString()!==user._id?.toString()) {
                return {
                    error: {
                        code: 409,
                        message: "This username is taken"
                    }
                }
            }
        }

        try {
            await user.save();
            return user;
        } catch (error) {
            console.log(error);
            return {
                error: {
                    code: 400, 
                    message: "Something went wrong editing the account. Make sure your username has no spaces or invalid characters."
                }
            }
        }
        
    }
}

module.exports = {
    EditAccountProfileBehavior
}