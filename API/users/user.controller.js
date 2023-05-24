const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('./user.service');
const authorize = require('_middleware/authorize');
//const jwt = require('jsonwebtoken');
//const config = require('config');

// routes
router.post('/login', authenticateSchema, authenticate);
router.post('/', registerSchema, register);
router.get('/current', authorize, getCurrent);
router.get('/', authorize, getAll);
router.get('/:id', authorize, getById);
//router.post('/', authorize(), registerSchema, register);
router.put('/:id', authorize, updateSchema, update);
router.delete('/:id',authorize,  _delete);
router.post('/logout',  logout);

module.exports = router;

// route functions

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService
      .authenticate(req.body)
      .then((user) => {
        //send the cookie to the browser
        res.cookie("token", user.token);
        res.json(user);
      })
      .catch(next);
  }
  function logout(req, res, next) {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
  
      res.status(200).json({ message: "Logout Success" });
    } catch (e) {
      next();
    }
  }

function registerSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.User).required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().empty(''),
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        role: Joi.string().valid(Role.Admin, Role.User).empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}



  
/*
function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}
*/
// schema functions
/*
function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.User).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        role: Joi.string().valid(Role.Admin, Role.User).empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}





function logout(req, res) {
    // destroy session
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Could not log out." });
        }
        // clear cookie
        res.clearCookie('session');
        res.json({ message: "Logged out successfully." });
    });
}
function logout(req, res) {
    // clear cookie
    res.clearCookie('jwt');
    res.json({ message: "Logged out successfully." });
}
*/
