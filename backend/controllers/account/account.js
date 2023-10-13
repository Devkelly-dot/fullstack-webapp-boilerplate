const { FetchMyAccountByEmailService } = require("../../services/account/fetchAccount/fetchAccountService");

class AccountController {
    constructor() {
    }

    async do(req, res) {
        try {
            let user = req.user;
            if(!user) {
                return res.status(403).send({
                    message: "This user doesn't exist"
                })
            }
    
            let fetch_service = new FetchMyAccountByEmailService();
            fetch_service.account = user;
            user = await fetch_service.do();

            return res.status(200).send(user);
        } catch (e) {
            console.log(e)
            return res.status(500).send({message: "Something went wrong with account fetching, try again later"});
        }
    }
}

module.exports = {
    AccountController
}