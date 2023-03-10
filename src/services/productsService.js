const productsModel = require('../models/productsModel');
const { mapError } = require('../utils/errorMap');
const { schemaName } = require('./validations/schema');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (!product) {
    return { type: 404, message: 'Product not found' };
  }
  return { type: null, message: product };
};

const createProduct = async ({ name }) => {
  const { error } = schemaName.validate(name);
  if (error) {
    return mapError(error.message);
  }
  const id = await productsModel.createProduct({ name });
  return { id, name };
};

const updateProduct = async ({ id, name }) => {
    const { error } = schemaName.validate(name);
    if (error) {
      return mapError(error.message);
    }
  const updatedProduct = await productsModel.getProductById(id);
  console.log(updatedProduct);
  if (!updatedProduct) {
    return mapError('Product not found');
  }
  const response = await productsModel.updateProduct({ id, name });
  return response[1];
};

const removeProduct = async ({ id }) => {
  const deletedProduct = await productsModel.removeProduct({ id });
  if (deletedProduct.affectedRows === 0) {
    return mapError('Product not found');
  }
  return { type: null, message: '' };
};

module.exports = {
  getAll,
  getProductById,
  createProduct,
  updateProduct,
  removeProduct,
};
