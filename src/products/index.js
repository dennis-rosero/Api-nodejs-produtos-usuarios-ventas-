const express = require('express');

const {ProductsController } = require('./controller');

const router = express.Router(); // manejar las rutas de nuestro modulo independientemente de la app

module.exports.ProductsAPI = (app) => {
    router
        .get("/", ProductsController.getProducts) //http://localhost:3000/api/products/
        .get("/report", ProductsController.generateReport)
        .get("/:id", ProductsController.getProduct) //http://localhost:3000/api/products/23
        .post("/", ProductsController.createProduct)
        .put("/:id", ProductsController.updateProduct) //update
        .delete("/:id", ProductsController.deleteProduct) //delete

    app.use("/api/products", router)
};
