const mongoose = require('mongoose');
const url = process.env.DB_CONNECT;
const connectTodb = () => {
    mongoose.connect(url)
        .then(() => {
            console.log("DataBase Connected");
        })
        .catch((err) => console.log("db errror : ", err))
}

module.exports = connectTodb;