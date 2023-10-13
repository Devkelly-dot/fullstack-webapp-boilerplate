require('dotenv').config()
const jwt = require('jsonwebtoken');
const User = require('../db/models/User');

async function authenticateUser(req, res, next) {
    try {
        let token = req.header('Authorization');
        token = token?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    
        try {
            let this_user = await new Promise((resolve, reject)=>{
                jwt.verify(token, process.env.JWT_KEY, (err, user) => {
                    if (err) {
                        reject({message: 'Your login has expired or you are not logged in.'});
                    } else {
                        resolve(user)
                    }
                });
            });
    
            try {
                this_user = await User.findOne({
                    _id: this_user.id
                });
    
                if(!this_user) {
                    return res.status(403).send({message: "You are not logged in"})
                }
                req.user = this_user;
                next();
            } catch(error) {
                console.log(error);
                return res.status(500).send({message: "Something went wrong, try again later."});
            }
    
        } catch (error) {
            return res.status(500).send(error)
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send({message: "Could not authenticate user"})
    }
}

module.exports = authenticateUser;