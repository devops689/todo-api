
const Joi = require("joi");
const DataTypes = require("sequelize").DataTypes;
const { sequelize } = require("../db");

const Tasks = sequelize.define(
  "tasks",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    detail: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "tasks"
  }
);

function validateTask(task) {
  const schema = Joi.object({
    id: Joi.string().max(36).optional(),
    detail: Joi.string().max(255),
  });
  return schema.validate(task);
}

exports.Tasks = Tasks;
exports.validateTask = validateTask;
