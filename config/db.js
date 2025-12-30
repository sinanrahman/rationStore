const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('DB Connected');
    } catch (e) {
        console.error('DB connection error:', e);
        process.exit(1);
    }
}

module.exports = connectDB;
