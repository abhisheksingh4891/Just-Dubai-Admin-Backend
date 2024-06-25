const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const conn = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log("Database Connected")
        })
    } catch (error) {
        res.status(400).json({
            message: "Database Not Connected",
        });
    }
}

conn();