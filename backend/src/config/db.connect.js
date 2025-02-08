const mongoose = require('mongoose');
require('dotenv').config();
// MongoDB Atlas connection URI
const uri = process.env.MONGODB_URL;

async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected successfully to MongoDB Atlas');
        return 'done';
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed:', error);
        return 'error';
    }
}

// Call the connect function

module.exports = {connect};
