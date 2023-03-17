require("dotenv").config(); //nos ayuda a traer todas las variables .env en el archivo que necesitemos

module.exports.Config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    mongoDbname: process.env.MONGO_DBNAME
};