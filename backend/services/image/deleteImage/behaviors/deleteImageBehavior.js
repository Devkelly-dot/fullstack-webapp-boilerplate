const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

class DeleteImageBehavior {
    constructor() {
        this.image = null;
    }

    async do() {
        if(!this.image) {
            throw new Error("DeleteImageBehavior needs image");
        }

        let delete_data = await this.delete();
        return delete_data;
    }

    async delete() {
        throw new Error("DeleteImageBehavior needs delete method");
    }
}

class DeleteCloudinaryImageBehavior extends DeleteImageBehavior {
    constructor() {
        super();
    }
    async cloudinaryDelete() {
        return new Promise((resolve, reject) => {
            // Delete the image by public ID
            cloudinary.uploader.destroy(this.image.public_id, (error, result) => {
                if (error) {
                    console.error('Error deleting image from Cloudinary:', error);
                    reject(error);
                } else {
                    console.log('Image deleted from Cloudinary:', result);
                    resolve(result);
                }
            });
        });
    }

    async delete() {
        if(!this.image?.public_id) {
            throw new Error("Delete Cloudinary Image Behavior image object needs public id of image");
        }

        try {
            const delete_data = await this.cloudinaryDelete();
            return delete_data;
        } catch (error) {
            console.log(error);
            throw new Error("Error deleting Cloudinary image");
        }
    }
}

module.exports = {
    DeleteCloudinaryImageBehavior
}