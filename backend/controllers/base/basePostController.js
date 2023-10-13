class basePostController {
    constructor() {
        this.required_fields = [];
        this.optional_fields = [];
    }

    async do(req, res) {
        try {
            let validated_fields = {};
        
            let missing_fields = [];

            for(let i = 0; i < this.required_fields.length; i++) {
                const field = this.required_fields[i];
                if(!req.body[field]) {
                    missing_fields.push(field);
                }
    
                validated_fields[field] = req.body[field];
            }
    
            if(missing_fields.length > 0) {
                return res.status(400).send({Error: `Missing Fields: ${missing_fields}`});
            }
            for(let i = 0; i < this.optional_fields.length; i++) {
                const field = this.optional_fields[i];
                if(req.body[field] !== null && req.body[field] !== undefined) {
                    validated_fields[field] = req.body[field];
                }
            }
    
            try {
                let response = await this.handleRequest(req, validated_fields);
                if(!response) {
                    throw new Error("PostControllers should return a response");
                }
                if(response.error) {
                    return res.status(response.error.code).send({Error: response.error.message});
                } else {
                    return res.status(200).send(response);
                }
            } catch (e) {
                console.log(e);
                return res.status(500).send({Error: "Something went wrong, please try again later"});
            }
        } catch (error) {
            return res.status(500).send({Error: "Something went wrong, please try again later"});
        }
    }

    async handleRequest(req, validated_fields) {
        throw new Error("Define handleRequest method on controller")
    }
}

module.exports = {
    basePostController
}