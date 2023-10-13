const jwt = require('jsonwebtoken');
require('dotenv').config()

function generateToken(user) {
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '24h' }); // Replace 'your-secret-key' with your secret key

    return token;
}

module.exports = generateToken;