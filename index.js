const express = require("express");
const debug = require("debug")("app:main");

const { Config } = require("./src/config/index");
const { ProductsAPI } = require('./src/products/index');
const { UsersAPI } = require("./src/users/index");
const { SalesAPI } = require("./src/sales/index");
const { IndexAPI, NotFoundAPI } = require('./src/index/index');

const app = express();

app.use(express.json()); //capacidad de recibir datos

IndexAPI(app);
ProductsAPI(app); 
UsersAPI(app);
SalesAPI(app);
NotFoundAPI(app);

app.listen(Config.port, () => {
    debug(`Servidor escuchando en el puerto ${Config.port}`);
});