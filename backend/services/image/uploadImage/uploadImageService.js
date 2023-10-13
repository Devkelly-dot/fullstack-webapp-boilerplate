const { UploadToCloudinaryBehavior } = require("./behaviors/uploadBehavior");

class UploadImageService {
    constructor() {
        this.image = null;
        this.uploadBehavior = null;
    }

    async do() {
        if(!this.image) {
            throw new Error("UploadImageService needs an image");
        }

        if(!this.uploadBehavior) {
            throw new Error("UploadImageService needs an uploadBehavior");
        }

        let upload_behavior = new this.uploadBehavior();
        upload_behavior.image = this.image;

        let image_data = await upload_behavior.do();
        return image_data;
    }
}

class UploadToCloudinarService extends UploadImageService {
    constructor() {
        super();
        this.uploadBehavior = UploadToCloudinaryBehavior
    }
}

module.exports = {
    UploadToCloudinarService
}