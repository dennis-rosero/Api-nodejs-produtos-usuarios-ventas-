const createError = require('http-errors');
const debug = require('debug')('app:module-Sales-controller');

const { SalesService } = require('./services');
const { Response } = require('../common/response');

module.exports.SalesController = {
    getSales: async (req, res) => {
        try {
            let sales = await SalesService.getAll();
            Response.success(res, 200, 'Lista de ventas', sales)
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getSale: async (req, res) => {
        try {
            const { params: { id } } = req;
            let Sales = await SalesService.getById(id);
            if (!Sales) {
                Response.error(res, new createError.NotFound())
            } else {
                Response.success(res, 200, `Saleo ${id}`, Sales)
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createSale: async (req, res) => {
        try {
            console.log("create si entra");
            const { body } = req;
            console.log(body);
            if (!body || Object.keys(body).length===0) {
                Response.error(res, new createError.BadRequest())
            } else{
                const insertedId = await SalesService.create(body);
                Response.success(res, 201, 'Venta agregada', insertedId)
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    updateSale: async(req, res) => {
        try {
            const { params: { id } } = req;
            console.log(id);
            const { body } = req;
            if (!body || Object.keys(body).length===0) {
                Response.error(res, new createError.BadRequest());
            } else {
                let Sale = await SalesService.update(id, body)
                if (!Sale) {
                    Response.error(new createError.NotFound());
                } else {
                    Response.success(res, 200, 'Saleo modificado correctamente', Sale)
                }
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteSale: async(req, res) => {
        try {
            const { params: { id } } = req;
            let Sale = await SalesService.getById(id);
            if (!Sale) {
                Response.error(res, new createError.NotFound());
            } else {
                const deletedCount = await SalesService.deleteSale(id);
                Response.success(res, 200, `${deletedCount} Saleo eliminado correctamente`, Sale)
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    generateReport: (req, res) => {
        try {
            SalesService.generateReport('Inventario', res);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
}