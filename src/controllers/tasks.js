
const asyncHandler = require("express-async-handler");

const { Tasks, validateTask } = require("../models/tasks");

const addNewTask = asyncHandler(async (req, res) => {

  try {

    const { error } = validateTask(req.body);
    if (error) {
        res.status(400);
        throw new Error(error);
    }

    let taskCreated = await Tasks.create(req.body);
    if (!taskCreated) {
      res.status(400);
      throw new Error("Task cannot be added");
    }
    taskCreated = taskCreated.dataValues;
    taskCreated.days = Math.round((new Date() - new Date(taskCreated.createdAt)) / (1000 * 60 * 60 * 24));
    return res.status(200).json(taskCreated);
  } catch (error) {
    throw new Error(
      `${error.statusCode !== 400 && res.statusCode !== 400
        ? "Something went wrong during create-op: "
        : ""
      }${error.message}`
    );
  }
});

const getAllTasks = asyncHandler(async (req, res) => {

  try {

    let tasks = await Tasks.findAll({
      order: [['createdAt', 'DESC']],
    });
    if (tasks.length == 0) {
      return res.status(200).send([]);
    }
    let today = new Date();
    tasks = tasks.map(t => {
      t = t.dataValues;
      t.days = Math.round((today - new Date(t.createdAt)) / (1000 * 60 * 60 * 24));
      return t;
    });
    return res.status(200).send(tasks);

  } catch (error) {
    throw new Error(
      `${error.statusCode !== 400 && res.statusCode !== 400
        ? "Something went wrong during fetch-op: "
        : ""
      }${error.message}`
    );
  }
});

const updateAnyTask = asyncHandler(async (req, res) => {

  try {

    const { error } = validateTask(req.body);
    if (error) {
        res.status(400);
        throw new Error(error);
    }

    let tasksUpdated = await Tasks.update({detail: req.body.detail}, {
      where: {
        id: req.body.id
      }
    });
    if (tasksUpdated[0] == 0) {
      res.status(400);
      throw new Error("No Task to update");
    }
    //
    let taskUpdated = await Tasks.findByPk(req.body.id);
    if(!taskUpdated) {
      res.status(400);
      throw new Error("Cannot get Updated task");
    }
    //
    taskUpdated = taskUpdated.dataValues;
    taskUpdated.days = Math.round((new Date() - new Date(taskUpdated.createdAt)) / (1000 * 60 * 60 * 24));
    return res.status(200).json(taskUpdated);
  } catch (error) {
    throw new Error(
      `${error.statusCode !== 400 && res.statusCode !== 400
        ? "Something went wrong during update-op: "
        : ""
      }${error.message}`
    );
  }
});

const removeAnyTask = asyncHandler(async (req, res) => {

  try {

    let tasksDestroyed = await Tasks.destroy({
      where: {
        id: req.body.id
      }
    });
    if (tasksDestroyed == 0) {
      res.status(400);
      throw new Error("No Task to delete");
    }
    return res.status(200).json({ message: "Task was deleted." });
  } catch (error) {
    throw new Error(
      `${error.statusCode !== 400 && res.statusCode !== 400
        ? "Something went wrong during remove-op: "
        : ""
      }${error.message}`
    );
  }
});


module.exports = {
  addNewTask,
  getAllTasks,
  updateAnyTask,
  removeAnyTask,
};
