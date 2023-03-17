const { ObjectId } = require('mongodb');

const { Database } = require('../database/index');

const COLLECTION = 'sales';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION)
    const objectId = new ObjectId(id)
    return await collection.findOne({ _id: objectId })
}

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result =  await collection.insertOne(product);
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

module.exports.SalesService = {
    getAll,
    getById,
    create,
    update,
    deleteProduct
}