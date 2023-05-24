const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function authenticate({ username, password }) {
  const user = await db.User.scope('withHash').findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.hash)))
    throw 'Username or password is incorrect';

  // authentication successful
  const token = generateJwtToken(user);
  return { ...omitHash(user.get()), token };
}

async function getAll() {
  return await db.User.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // validate
  if (await db.User.findOne({ where: { username: params.username } })) {
    throw 'Username "' + params.username + '" is already registered';
  }
  console.log("test")

  // hash password
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }
  // save user
  await db.User.create(params);
}

async function update(id, params) {
  const user = await getUser(id);

  // validate
  const usernameChanged = params.username && user.username !== params.username;
  if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
    throw 'Username "' + params.username + '" is already registered';
  }

  // hash password if it was entered
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function _delete(id) {
  const user = await getUser(id);
  await user.destroy();
}

async function revokeToken({ token, ipAddress }) {
  const user = await db.User.findOne({ where: { token } });

  // revoke token
  if (!user) throw 'Invalid token';
  user.refreshTokens = user.refreshTokens.filter(t => t.token !== token);
  await user.save();

  // log user out of other devices
  await db.RefreshToken.destroy({ where: { userId: user.id, token: { [Op.ne]: token } } });
}

// helper functions

function generateJwtToken(user) {
  // create a JWT token containing the user ID
  return jwt.sign({ sub: user.id }, config.secret, { expiresIn: '1hr' });
}

async function getUser(id) {
  const user = await db.User.findByPk(id);
  if (!user) throw 'User not found';
  return user;
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}
