const { ObjectId } = require('mongodb');

const { Database } = require('../database/index');
const { ProductsUtils } = require('./utils');

const COLLECTION = 'products';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION)
    const objectId = new ObjectId(id)
    return await collection.findOne({ _id: objectId })
}

const create = async (sale) => {
    const collection = await Database(COLLECTION);
    let result =  await collection.insertOne(sale);
    return result.insertedId;
}

const update = async (id, product) => {
    const collection = await Database(COLLECTION);
    const objectId = new ObjectId(id)
    await collection.updateOne({ _id: objectId}, { $set: { ...product }})
    return await getById(id);
}

const deleteProduct = async(id) => {
    const collection = await Database(COLLECTION);
    const objectId = new ObjectId(id)
    let deleteProduct = await collection.deleteOne({ _id: objectId })
    return [deleteProduct.deletedCount.id];
}

const generateReport = async (name, res) => {
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res);
};



module.exports.ProductsService = {
    getAll,
    getById,
    create,
    generateReport,
    update,
    deleteProduct
}