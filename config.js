const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";
const DB = "mongodb://localhost:27017/mis";

module.exports = {
    DB,
    HOST,
    PORT
}