const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
  create,
  fetchAll,
  findOne,
  deleteProduct,
  update,
};
async function create(params) {
  if (
    await db.Product.findOne({ where: { roduct_name: params.product_name } })
  ) {
    return "Product " + params.product_name + " is already exists";
  }
  const product = new db.Product(params);

  await product.save();
  return product;
}
async function fetchAll() {
  return await db.Product.findAll();
}
async function findOne(id, callback) {
  getProduct(id)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}
async function update(id, params) {
  const product = await getProduct(id);
  const nameChanged =
    params.product_name && params.product_name !== product.product_name;
  if (
    nameChanged &&
    (await db.Product.findOne({ where: { product_name: params.product_name } }))
  ) {
    return "Product with name " + params.product_name + " is already exists";
  }
  Object.assign(product, params);
  await product.save();
  return product;
}
async function deleteProduct(id) {
  const product = await getProduct(id);

  if (product.product_status) {
    product.product_status = false;
  } else {
    product.product_status = true;
  }
  await product.save();
  return product;
}
async function getProduct(id) {
  const product = await db.Product.findByPk(id);
  if (!product) return "Product not found";
  return product;
}