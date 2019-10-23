const bcrypt = require( "bcryptjs" );
exports.seed = function( knex, Promise ){
  // Deletes ALL existing entries
  return knex( "users" ).del()
    .then( function(){
      // Inserts seed entries
      return knex( "users" ).insert( [
        {
          email: "lana@testemail.com",
          first_name: "lana",
          last_name: "lang",
          password: bcrypt.hashSync( "1234", 10 ),
          company: "Best Tech Co",
          role: "admin"
        }, {
          email: "anton@testemail.com",
          first_name: "anton",
          last_name: "kent",
          password: bcrypt.hashSync( "1234", 10 ),
          company: "Marketing Gods",
          role: "admin",
        }, {
          email: "jasmine@testemail.com",
          first_name: "jasmine",
          last_name: "lane",
          password: bcrypt.hashSync( "1234", 10 ),
          company: "Life Coaching Inc",
          role: "admin",
        },
      ] );
    } );
};
