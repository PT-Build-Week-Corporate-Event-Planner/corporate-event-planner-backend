const express = require('express');
const bcrypt = require('bcryptjs');
const { restricted } = require('../middleware/restricted');

const router = express.Router();
const db = require('../data/dbConfig');
const errorMessage = require('../utils/errorMessage');
const responseMessage = require('../utils/responseMessage');


const Events = require('../api/helpers/eventsHelpers');
const Tasks = require('../api/helpers/tasksHelpers');

// [GET] tasks for event
router.get('/', (req, res) => {
  if (req.query && req.query.event_id) {
    Tasks.getTasksForEvent(req.query.event_id)
        .then((tasks) => {
          if (!tasks) {
            res.status(404).json(errorMessage.tasksNotFound);
          } else {
            res.status(200).json(tasks);
          }
        })
        .catch((error) => {
          res.status(500).json(errorMessage.tasksNotRetrieved);
        });
  } else {
    Tasks.getTasks()
        .then((tasks) => {
          res.status(200).json(tasks);
        })
        .catch((error) => {
          res.status(500).json(errorMessage.tasksNotRetrieved);
        });
  }
});

//[GET] Task by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Tasks.getTaskById(id)
      .then((task) => {
        if (!task) {
          res.status(404).json(errorMessage.taskNotFound);
        } else {
          res.status(200).json(task);
        }
      })
      .catch((error) => {
        res.status(500).json(errorMessage.taskNotRetrieved);
      });
});

// [POST] a task
// will need restricted middleware
router.post('/', restricted, (req, res) => {
  const { task_name, task_completed } = req.body;
  const event_id = req.query.event_id;
  const user_id = req.decoded.subject;
  if (!task_name || !user_id || !event_id) {
    res.status(400).json(errorMessage.missingEventInfo);
  } else {
    db('tasks')
        .insert({ task_name, task_completed, event_id })
        .then(arrayOfIds => {
          return db('tasks').where({id: arrayOfIds[0]})
              .then(arrayOfTasks => {
                res.status(201).json({...arrayOfTasks[0], task_completed: Boolean(arrayOfTasks[0].task_completed)})
              })
              .catch(error => {
                res.status(500).json({ errorMessage: 'The action record could not be created. '});
              });

        });
  }
});

//[DELETE] a task
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  Tasks.deleteTask(id)
      .then((data) => {
        if (!data) {
          res.status(404).json(errorMessage.taskNotFound);
        } else {
          res.status(200).json(responseMessage.deleteTask);
        }
      })
      .catch((error) => {
        res.status(500).json(errorMessage.taskNotRemoved);
      });
});

// [PUT] task by id
// will require restricted middleware
router.put('/:id', restricted, async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  const user_id = req.decoded.subject;
  try {
    const data = await Tasks.updateTask(task, id);
    if (!data) {
      res.status(404).json(errorMessage.taskNotFound);
    } else {
      const updatedTask = { ...task, id: Number(id), user_id };
      res.status(200).json(updatedTask);
    }
  } catch (error) {
    res.status(500).json(errorMessage.taskNotUpdated);
  }
});

// [PUT] mark task as completed
// will require restricted middleware
router.put('/:id/complete', restricted, async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  const user_id = req.decoded.subject;
  try {
    const data = await Tasks.markAsCompleted(task, id);
    if (!data) {
      res.status(404).json(errorMessage.taskNotFound);
    } else {
      const updatedTask = { ...task, task_completed: true, id: Number(id), user_id };
      res.status(200).json(updatedTask);
    }
  } catch (error) {
    res.status(500).json(errorMessage.taskNotUpdated);
  }
});

// [PUT] mark task as pending
// will require restricted middleware
router.put('/:id/pending', restricted, async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  const user_id = req.decoded.subject;
  try {
    const data = await Tasks.markAsPending(task, id);
    if (!data) {
      res.status(404).json(errorMessage.taskNotFound);
    } else {
      const updatedTask = { ...task, task_completed: false, id: Number(id), user_id };
      res.status(200).json(updatedTask);
    }
  } catch (error) {
    res.status(500).json(errorMessage.taskNotUpdated);
  }
});

module.exports = router;
