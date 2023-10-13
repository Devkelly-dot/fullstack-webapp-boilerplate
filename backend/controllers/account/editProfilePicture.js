const User = require("../../db/models/User");
const { DeleteCloudinaryImageService } = require("../../services/image/deleteImage/deleteImageService");
require('dotenv').config()

const { UploadToCloudinarService } = require("../../services/image/uploadImage/uploadImageService");

class EditProfilePictureController {
    constructor() {
    }

    async do(req , res) {
        try {
            const uploadedFile = req.file;
            const user = req.user;

            if(uploadedFile) {
                let upload_image_service = new UploadToCloudinarService();
                upload_image_service.image = uploadedFile;

                let uploaded_data = await upload_image_service.do();
                if(uploaded_data && uploaded_data.error) {
                    return res.status(uploaded_data.error.code).send({message: uploaded_data.error.message});
                } else {
                    let user_db = await User.findOne({
                        _id: user._id
                    });

                    if(user_db) {
                        const old_profile_url = user_db.profile_image_url;
                        user_db.profile_image_url = uploaded_data.url;

                        try {
                            if(old_profile_url && old_profile_url!==process.env.DEFAULT_PROFILE_PICTURE_URL) {
                                let publicId = old_profile_url.split('/').pop().split('.')[0];
                                publicId = `uploads/profile_pictures/${publicId}`;
    
                                let delete_image_service = new DeleteCloudinaryImageService();
                                delete_image_service.image = {
                                    public_id: publicId
                                }

                                let delete_image_data = await delete_image_service.do();
                                console.log("Deleted old user image: ",delete_image_data);
                            }
                        } catch (error) {
                            console.log("ERROR DELETING USER'S OLD PROFILE PICTURE: ", error);
                        }
                        await user_db.save();
                        return res.status(200).send({user})
                    } else {
                        return res.status(500).send({message: "something went wrong setting user's new profile picture"})
                    }
                }
            } else {
                return res.status(400).send({message: 'Please provide a profile picture'})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: "Something went wrong, try again later"})
        } 
    }
}

module.exports = {
    EditProfilePictureController
}