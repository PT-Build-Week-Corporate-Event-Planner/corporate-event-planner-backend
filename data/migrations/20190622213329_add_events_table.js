exports.up = function( knex, Promise ){
  return knex.schema.createTable( "events", ( tbl ) => {
    tbl.increments();
    tbl
      .string( "event_title", 255 )
      .notNullable();
    tbl
      .string( "event_description", 255 );
    tbl
      .string( "image_url", 255 ).defaultTo( "" );
    tbl
      .date( "event_date" );
    tbl
      .time( "event_time" );
    tbl
      .integer( "attendees", 255 );
    tbl
      .integer( "budget" );
    tbl
      .integer( "user_id" )
      .unsigned()
      .references( "id" )
      .inTable( "users" )
      .onDelete( "CASCADE" )
      .onUpdate( "CASCADE" );
    tbl
      .boolean( "completed" ).defaultTo( false );
  } );
};

exports.down = function( knex, Promise ){
  return knex.schema.dropTableIfExists( "events" );
};
