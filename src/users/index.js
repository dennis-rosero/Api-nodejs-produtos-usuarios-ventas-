const express = require('express');

const { UsersController } = require('./controller');

const router = express.Router(); // manejar las rutas de nuestro modulo independientemente de la app

module.exports.UsersAPI = (app) => {
    router
        .get("/", UsersController.getUsers) //http://localhost:3000/api/products/
        .get("/:id", UsersController.getUser) //http://localhost:3000/api/products/23
        .post("/", UsersController.createUser)
        .put("/:id", UsersController.updateUser) //update
        .delete("/:id", UsersController.deleteUser) //delete

    app.use("/api/users", router)
};
