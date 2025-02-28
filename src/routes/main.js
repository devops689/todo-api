
const express = require("express");

const task = require("./tasks");

module.exports = (app) => {
    app.use(express.json({ limit: "128kb" }));
    app.use(express.urlencoded({ limit: "128kb" }));
    app.use("/tasks", task);
};
