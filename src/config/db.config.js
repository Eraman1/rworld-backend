const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const db = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;