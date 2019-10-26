const express = require( "express" );
const bcrypt = require( "bcryptjs" );
const { restricted } = require( "../middleware/restricted" );

const router = express.Router();
const db = require( "../data/dbConfig" );
const errorMessage = require( "../utils/errorMessage" );
const responseMessage = require( "../utils/responseMessage" );

const Events = require( "../api/helpers/eventsHelpers" );
const Tasks = require( "../api/helpers/tasksHelpers" );

// [GET] tasks for event
router.get( "/", restricted, ( req, res ) => {
  if( req.query && req.query.event_id ){
    Tasks.getTasksForEvent( req.query.event_id )
      .then( ( tasks ) => {
        if( !tasks ){
          res.status( 404 ).json( errorMessage.tasksNotFound );
        }else{
          res.status( 200 ).json( tasks );
        }
      } )
      .catch( ( error ) => {
        res.status( 500 ).json( errorMessage.tasksNotRetrieved );
      } );
  }else{
    Tasks.getTasks()
      .then( ( tasks ) => {
        res.status( 200 ).json( tasks );
      } )
      .catch( ( error ) => {
        res.status( 500 ).json( errorMessage.tasksNotRetrieved );
      } );
  }
} );

//[GET] Task by id
router.get( "/:id", restricted, ( req, res ) => {
  const { id } = req.params;
  Tasks.getTaskById( id )
    .then( ( task ) => {
      if( !task ){
        res.status( 404 ).json( errorMessage.taskNotFound );
      }else{
        res.status( 200 )
          .json( { ...task, task_completed: Boolean( task.task_completed ) } );
      }
    } )
    .catch( ( error ) => {
      res.status( 500 ).json( errorMessage.taskNotRetrieved );
    } );
} );

// [POST] a task
router.post( "/", restricted, ( req, res ) => {
  const { task_name, task_completed } = req.body;
  const event_id = req.query.event_id;
  const user_id = req.decoded.subject;
  if( !task_name || !user_id || !event_id ){
    res.status( 400 ).json( errorMessage.missingEventInfo );
  }else{
    
    db( "tasks" )
      .insert( { task_name, task_completed, event_id } ).returning( "*" )
      .then( tasks => {
        res.status( 201 ).json( tasks[ 0 ] );
      } ).catch( err => {
      console.log( err );
      res.status( 500 ).json( { error: err.message } );
    } );
  }
} );

//[DELETE] a task
router.delete( "/:id", restricted, ( req, res ) => {
  const { id } = req.params;
  Tasks.deleteTask( id )
    .then( ( data ) => {
      if( !data ){
        res.status( 404 ).json( errorMessage.taskNotFound );
      }else{
        res.status( 200 ).json( responseMessage.deleteTask );
      }
    } )
    .catch( ( error ) => {
      res.status( 500 ).json( errorMessage.taskNotRemoved );
    } );
} );

// [PUT] task by id
router.put( "/:id", restricted, async( req, res ) => {
  console.log( "Inside tasks" );
  console.log( req.params );
  console.log( req.body );
  const { id } = req.params;
  const task = req.body;
  try{
    console.log( task, id );
    const task = await Tasks.updateTask( task, id );
    console.log( task );
    if( !task ){
      res.status( 404 ).json( errorMessage.taskNotFound );
    }else{
      res.status( 200 ).json( task[ 0 ] );
    }
  }catch( error ){
    res.status( 500 ).json( errorMessage.taskNotUpdated );
  }
} );

module.exports = router;
