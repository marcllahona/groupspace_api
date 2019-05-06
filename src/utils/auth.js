require('dotenv').config({ path: '.env' });
const { verify, sign } = require('jsonwebtoken');
const { AuthError } = require('./error');
/**
 *
 * @param {Context} context
 * @param {Boolean} isSubscription
 */
function getToken(context, isSubscription = false) {
  const Authorization = getAuthorization(context, isSubscription);
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { id, email } = verify(token, process.env.APP_SECRET);
    return {
      id,
      email
    };
  }
  throw new AuthError();
}

/**
 *
 * @param {Context} context
 * @param {Boolean} isSubscription
 */
function getAuthorization(context, isSubscription) {
  if (isSubscription) {
    return context.connection.context['authToken'];
  } else {
    return context.request.get('Authorization');
  }
}

/**
 *
 * @param {String} id -> ID of User
 * @param {String} email -> Email of User
 */
function createToken(id, email) {
  return sign({ id, email }, process.env.APP_SECRET);
}

exports.getToken = getToken;
exports.createToken = createToken;
