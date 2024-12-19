const ItemModel = require('../models/ItemSingleEditalModel');

const getAllItems = async (page, limit, search, sort) => {
  return await ItemModel.getAllItems(page, limit, search, sort);
};

const addItem = async ({ name, description }) => {
  return await ItemModel.addItem({ name, description });
};

const deleteItem = async (id) => {
  return await ItemModel.deleteItem(id);
};

module.exports = { getAllItems, addItem, deleteItem };
