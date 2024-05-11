require("dotenv").config();
const mongoose = require("mongoose");
const app = require('./app');
const port = process.env.PORT || 5000;


async function main() {
    try {
        await mongoose.connect(
            `mongodb+srv://${process?.env.DB_USER}:${process?.env.DB_PASS}@cluster0.s79pxyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        );
        console.log('MongoDB is connected')
        app.listen(port, () => {
            console.log("Live Server: http://localhost:5000");
        });
    } catch (error) {
        console.log("Error :", error);
    }
}
main();



