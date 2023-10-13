require('dotenv').config()
const cloudinary = require('cloudinary').v2;

class UploadBehavior {
    constructor() {
        this.image = null;
    }

    async do() {
        if(!this.image) {
            throw new Error("UploadBehavior needs image");
        }

        let upload_data = await this.upload();
        return upload_data;
    }

    async upload() {
        throw new Error("Define upload method on UploadBehavior");
    }
}

class UploadToCloudinaryBehavior extends UploadBehavior {
    constructor() {
        super();
    }
    async uploadImageToCloudinary(imageBuffer) {
        return new Promise((resolve, reject) => {
            const cloudinary_data = cloudinary.uploader.upload_stream(
            {
                folder: 'uploads/profile_pictures',
                width: 512,
                height: 512,
                crop: 'fill',
            },
            (error, result) => {
                if (error) {
                reject({
                    error: {
                    code: 500,
                    message: "Something went wrong uploading image to Cloudinary",
                    },
                });
                } else {
                console.log(result);
                resolve(result);
                }
            }
            ).end(imageBuffer);
        });
    };

    async upload() {
        try {
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_NAME,
                api_key: process.env.CLOUDINARY_KEY,
                api_secret: process.env.CLOUDINARY_SECRET,
            });
            const imageBuffer = this.image.buffer;

            const cloudinary_data = await this.uploadImageToCloudinary(imageBuffer);
            return cloudinary_data;
            
        } catch (error) {
            console.log(error);

            return {
                error: {
                    code: 500,
                    message: "Something went wrong uploading image"
                }
            }
        }
        
    }
}

module.exports = {
    UploadToCloudinaryBehavior
}