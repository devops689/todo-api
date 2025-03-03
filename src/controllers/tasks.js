
const { Tasks, validateTask } = require("../models/tasks");

const addNewTask = async (req, res) => {

  try {

    const { error } = validateTask(req.body);
    if (error) {
        throw new Error(error);
    }

    let taskCreated = await Tasks.create(req.body);
    if (!taskCreated) {
      throw new Error("Task cannot be added");
    }
    taskCreated = taskCreated.dataValues;
    taskCreated.days = Math.round((new Date() - new Date(taskCreated.createdAt)) / (1000 * 60 * 60 * 24));
    res.status(200).send(taskCreated);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {

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
    res.status(200).send(tasks);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateAnyTask = async (req, res) => {

  try {

    const { error } = validateTask(req.body);
    if (error) {
        throw new Error(error);
    }

    let tasksUpdated = await Tasks.update({detail: req.body.detail}, {
      where: {
        id: req.body.id
      }
    });
    if (tasksUpdated[0] == 0) {
      throw new Error("No Such Task to update");
    }
    //
    let taskUpdated = await Tasks.findByPk(req.body.id);
    if(!taskUpdated) {
      throw new Error("Cannot get Updated task");
    }
    //
    taskUpdated = taskUpdated.dataValues;
    taskUpdated.days = Math.round((new Date() - new Date(taskUpdated.createdAt)) / (1000 * 60 * 60 * 24));
    res.status(200).send(taskUpdated);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const removeAnyTask = async (req, res) => {

  try {

    let tasksDestroyed = await Tasks.destroy({
      where: {
        id: req.body.id
      }
    });
    if (tasksDestroyed == 0) {
      console.log('kkkkkkkkkkkk')
      throw new Error("No Such Task to delete");
    }
    res.status(200).json({ message: "Task was deleted." });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


module.exports = {
  addNewTask,
  getAllTasks,
  updateAnyTask,
  removeAnyTask,
};
