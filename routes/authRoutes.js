const express = require( "express" );
const bcrypt = require( "bcryptjs" );

const errorMessage = require( "../utils/errorMessage" );
const { restricted, jwtKey } = require( "../middleware/restricted" );
const generateToken = require( "../middleware/token" );
const validatePassword = require( "../middleware/validatePassword" );
const checkForDuplicateEmail = require( "../middleware/checkForDuplicateEmail" );

const db = require( "../data/dbConfig" );

const router = express.Router();

router.post( "/register",
  validatePassword,
  checkForDuplicateEmail,
  ( req, res ) => {
    const { email, first_name, last_name, password, company, role } = req.body;
    const user = req.body;
    const hashedPw = bcrypt.hashSync( user.password, 10 );
    user.password = hashedPw;
    if( !first_name || !password || !email ){
      res.status( 400 ).json( errorMessage.missingFields );
    }else{
      db( "users" ).insert( user ).returning( "*" )
        .then( user => {
          res.status( 201 ).json( user[ 0 ] );
        } )
        .catch( ( error ) => {
          res.status( 500 ).json( errorMessage.registerUser );
        } );
    }
  }
);

router.post( "/login", ( req, res ) => {
  const { email, password } = req.body;
  const user = req.body;
  if( !email || !password ){
    res.status( 400 ).json( errorMessage.missingCredentials );
  }else{
    db( "users" )
      .where( { email: user.email } )
      .first()
      .then( ( user ) => {
        if( user && bcrypt.compareSync( password, user.password ) ){
          const token = generateToken( user );
          res.status( 200 ).json( {
            user_id: user.id,
            first_name: ( user.first_name ).toLowerCase(),
            last_name: ( user.last_name ).toLowerCase(),
            email: ( user.email ).toLowerCase(),
            token,
          } );
        }else{
          res.status( 401 ).json( errorMessage.invalidCredentials );
        }
      } )
      .catch( ( error ) => {
        res.status( 500 ).json( errorMessage.loginUnsuccessful );
      } );
  }
} );

module.exports = router;
