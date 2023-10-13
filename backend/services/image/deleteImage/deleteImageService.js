const { DeleteCloudinaryImageBehavior } = require("./behaviors/deleteImageBehavior");

class DeleteImageService {
    constructor() {
        this.image = null;
        this.deleteBehavior = null;
    }

    async do() {
        if(!this.image) {
            throw new Error("DeleteImageService needs an image");
        }

        if(!this.deleteBehavior) {
            throw new Error("DeleteImageService needs deleteBehavior");
        }

        let delete_behavior = new this.deleteBehavior();
        delete_behavior.image = this.image;

        let image_data = await delete_behavior.do();
        return image_data;
    }
}

class DeleteCloudinaryImageService extends DeleteImageService {
    constructor() {
        super();
        this.deleteBehavior = DeleteCloudinaryImageBehavior;
    }
}

module.exports = {
    DeleteCloudinaryImageService
}