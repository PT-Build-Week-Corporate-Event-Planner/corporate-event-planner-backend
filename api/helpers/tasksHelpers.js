const db = require('../../data/dbConfig');

const getTasks = () => db('tasks');

const getTaskById = id => db('tasks')
    .where({ id })
    .first();

const getTasksForEvent = id => db('tasks').where({ event_id: id });

const addTask = (task) => db('tasks')
    .where({task_id: id })
    .insert(task)
    .then(ids => getTaskById(ids[0]));

const deleteTask = id => db('tasks')
    .where({ id })
    .del();

const updateTask = (task, id) => db('tasks')
    .where({ id })
    .update(task).returning('&');

const markAsCompleted = (task, id) => db('tasks')
    .where({ id })
    .update(task);

const markAsPending = (task, id) => db('tasks')
    .where({ id })

    .update(task)
    .then(ids => getTaskById(ids[0]));


const notUndefined = (value) => value !== undefined;

const verifyAndCleanTask = (taskName, taskCompleted, eventId) => {
  if (!taskName && !notUndefined(taskCompleted) && !eventId) {
    throw new Error('Invalid task');
  }

  if (!notUndefined(taskCompleted) && !taskName) {
    return {
      event_id: eventId,
    };
  }

  if (!notUndefined(taskCompleted) && !eventId) {
    return {
      task_name: taskName,
    };
  }

  if (!taskName && !eventId) {
    return {
      task_completed: taskCompleted,
    };
  }

  if (!taskName) {
    return {
      task_completed: taskCompleted,
      event_id: eventId,
    };
  }

  if (!eventId) {
    return {
      task_completed: taskCompleted,
      task_name: taskName,
    };
  }

  if (!notUndefined(taskCompleted)) {
    return {
      task_name: taskName,
      event_id: eventId,
    };
  }

  return {
    task_name: taskName,
    task_completed: taskCompleted,
    event_id: eventId,
  };
};

module.exports = {
  getTasks,
  getTaskById,
  getTasksForEvent,
  addTask,
  deleteTask,
  updateTask,
  markAsCompleted,
  markAsPending,
  notUndefined,
  verifyAndCleanTask,

};
