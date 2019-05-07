const twilio = require('twilio');

/**
 * Function that returns a token to connect users via video
 * @param {string} identity
 * @param {string} room
 * @param {number} ttl
 * @returns{string}
 */
function generateVideoToken(identity, room, ttl = 36000) {
  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const accessToken = new twilio.jwt.AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET,
    {
      ttl, //time to live in seconds
      identity
    }
  );

  // create Video Grant
  const grant = new twilio.jwt.AccessToken.VideoGrant({ room });
  grant.toPayload();
  accessToken.addGrant(grant);

  return accessToken.toJwt();
}

exports.generateVideoToken = generateVideoToken;
