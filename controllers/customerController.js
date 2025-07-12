const { body, validationResult } = require('express-validator');
const Customer = require('../models/Customer');

const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

const createCustomer = async (req, res) => {
    try {
      console.log("xxxxxxxxxxxxx")
        const { name, email, phone, status } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and contact_info are required' });
        }
 console.log("23232323",email)
        const customer = new Customer({ name, email, status, phone });
        console.log("23232323",customer)
        await customer.save();
        res.status(201).json(customer);
    } catch (err) {
        res.status(500).json({ error: 'Error creating customer' });
    }
};

const updateCustomer = [
  body('name').optional().notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('phone').optional().matches(/^\d{3}-\d{3}-\d{4}$/).withMessage('Phone must be in format 123-456-7890'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.json(customer);
    } catch (error) {
      next(error);
    }
  },
];

const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer };