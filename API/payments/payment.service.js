// const bcrypt = require('bcryptjs');
const db = require("_helpers/db");
const { Sequelize } = require('sequelize');


module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  createProcedure,
  process
};

async function process(data) {
  const processPayment = `
  CALL ProcessPayment(:customerNum,:paymentAmount,:paymentType)
  `;

  await db.sequelize.query(processPayment, 
    { 
      replacements: { 
        customerNum: data.customerNum, 
        paymentAmount: data.paymentAmount, 
        paymentType: data.paymentType
      }, 
      type: Sequelize.QueryTypes.RAW 
    }
  );
}

async function createProcedure() {
  const createPaymentProcedure = 
  `
  CREATE PROCEDURE ProcessPayment(
    IN in_customerNumber INT, 
    IN in_amount DECIMAL(10,2), 
    IN in_paymentType ENUM('cash', 'credit')
  )
  BEGIN
    DECLARE customerExists INT;
    DECLARE currentCreditLimit DECIMAL(10,2);
  
    SELECT COUNT(*) INTO customerExists FROM customers WHERE customerNumber = in_customerNumber;
    SELECT creditLimit INTO currentCreditLimit FROM customers WHERE customerNumber = in_customerNumber;
  
    IF customerExists > 0 THEN
      IF in_paymentType = 'credit' THEN
        IF currentCreditLimit >= in_amount THEN
          UPDATE customers SET creditLimit = creditLimit - in_amount WHERE customerNumber = in_customerNumber;
          INSERT INTO payments(customerNumber, amount, paymentType, paymentDate, status) 
          VALUES (in_customerNumber, in_amount, in_paymentType, CURDATE(), 'approved');
        ELSE
          INSERT INTO payments(customerNumber, amount, paymentType, paymentDate, status) 
          VALUES (in_customerNumber, in_amount, in_paymentType, CURDATE(), 'denied');
        END IF;
      ELSE
        INSERT INTO payments(customerNumber, amount, paymentType, paymentDate, status) 
        VALUES (in_customerNumber, in_amount, in_paymentType, CURDATE(), 'approved');
      END IF;
    ELSE
      INSERT INTO customers(customerNumber, creditLimit) VALUES (in_customerNumber, in_amount);
      INSERT INTO payments(customerNumber, amount, paymentType, paymentDate, status) 
      VALUES (in_customerNumber, in_amount, in_paymentType, CURDATE(), 'approved');
    END IF;
  
  END 
  


  `;

  await db.sequelize.query(createPaymentProcedure);
}

async function getAll() {
  return await db.payments.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // validate
  if (
    await db.payments.findOne({ where: { customerNumber: params.customerNumber } })
  ) {
    throw 'custumerNumber  "' + params.customerNumber + '" is already created';
  }

  const customerNumber = new db.payments(params);

  // save Product
  await customerNumber.save();
}

async function update(id, params) {
  const customerNumber = await getUser(id);

  // copy params to Product and save
  Object.assign(customerNumber, params);
  await customerNumber.save();

  return customerNumber.get();
}

async function _delete(id) {
  const customerNumber = await getUser(id);
  await customerNumber.destroy();
}

// helper functions

async function getUser(id) {
  const customerNumber = await db.payments.findByPk(id);
  if (!customerNumber) throw "Product not found";
  return customerNumber;
}


