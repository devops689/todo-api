
const express = require("express");
const route = express.Router();
const { body } = require("express-validator");

const validateRequestData = require("../middleware/validation");

const {
    addNewTask,
    getAllTasks,
    updateAnyTask,
    removeAnyTask,
} = require("../controllers/tasks");


route.post(
    "/add",
    [
        body("detail")
            .isString()
            .withMessage("Please enter a valid detail-value"),
    ],
    validateRequestData,
    addNewTask
);

route.get(
    `/all`,
    getAllTasks
);

route.post(
    "/update",
    [
        body("id")
            .isUUID(4)
            .withMessage("Invalid identifier for this entity"),
        body("detail")
            .isString()
            .withMessage("Please enter a valid detail-value"),
    ],
    validateRequestData,
    updateAnyTask
);

route.post(
    "/remove",
    [
        body("id")
            .isUUID(4)
            .withMessage("Invalid identifier for this entity"),
    ],
    validateRequestData,
    removeAnyTask
);


module.exports = route;
