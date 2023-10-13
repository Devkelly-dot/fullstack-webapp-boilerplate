const { EditAccountProfileService } = require("../../services/account/editAccount/editAccountService");
const { basePostController } = require("../base/basePostController");

class EditAccountController extends basePostController {
    constructor() {
        super();
        this.optional_fields = [
            'username',
            'bio',
            'show_nsfw'
        ]
    }

    async handleRequest(req, validated_fields) {
        let edit_account_service = new EditAccountProfileService();
        edit_account_service.form = validated_fields;
        if(!req.user) {
            return {
                error: {
                    code: 403,
                    message: "No user found, can't edit account"
                }
            }
        }
        edit_account_service.account = req.user;
        let new_user = await edit_account_service.do();

        if(new_user.error) {
            return new_user;
        }
        return {user: {
            _id: new_user._id ,
            username: new_user.username ,
            email: new_user.email ,
            tokens: new_user.tokens ,
            profile_image_url: new_user.profile_image_url ,
            bio: new_user.bio,
            extra_messages: new_user.extra_messages,
            show_nsfw: new_user.show_nsfw
        }}
    }
}

module.exports = {
    EditAccountController
}