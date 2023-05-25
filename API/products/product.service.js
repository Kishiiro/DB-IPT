// const bcrypt = require('bcryptjs');
const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  sales
};

async function sales() {
  const salesbymonth = 
  `
  SELECT
  YEAR(orderDate) AS year,
  MONTH(orderDate) AS month,
    productName,
    SUM(quantityOrdered) AS totalQuantity,
    SUM(quantityOrdered * priceEach) AS totalSales
FROM
    Orders
    JOIN OrderDetails ON Orders.orderNumber = OrderDetails.orderNumber
    JOIN Products ON OrderDetails.productCode = Products.productCode
GROUP BY
    YEAR(orderDate),
    MONTH(orderDate),
    productName
ORDER BY
    YEAR(orderDate),
    MONTH(orderDate)

  `;

  return await db.sequelize.query(salesbymonth);
}

  

async function getAll() {
  return await db.Product.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // validate
  if (
    await db.Product.findOne({ where: { productCode: params.productCode } })
  ) {
    throw 'Product "' + params.productCode + '" is already created';
  }

  const product = new db.Product(params);

  // save Product
  await product.save();
}

async function update(id, params) {
  const product = await getUser(id);

  // copy params to Product and save
  Object.assign(product, params);
  await product.save();

  return product.get();
}

async function _delete(id) {
  const product = await getUser(id);
  await product.destroy();
}

// helper functions

async function getUser(id) {
  const product = await db.Product.findByPk(id);
  if (!product) throw "Product not found";
  return product;
}


