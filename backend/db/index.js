require('dotenv').config()
const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to DB');
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  connect,
  mongoose
};