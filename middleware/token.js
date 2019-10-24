const jwt = require( "jsonwebtoken" );
const jwtKey = process.env.JWT_SECRET;

const generateToken = ( user ) => {
  const payload = {
    subject: user.id, username: user.username, email: user.email,
  };
  const options = {
    expiresIn: "24h",
  };
  const token = jwt.sign( payload, jwtKey, options );
  return token;
};

module.exports = generateToken;
