
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_URL || "127.0.0.1",
    port: process.env.DB_PORT || '3306',
    database: process.env.DB_PORT || 'todo_db',
    username: process.env.DB_PORT || 'root',
    password: process.env.DB_PORT || '1506',
    define: {
        timestamps: true,
        freezeTableName: true
    }
});

const connect = () => {
    sequelize.authenticate()
    .then(() => console.log("Database is connected"))
    .catch((err) => console.log(`Database is not connected: ${err}`));
};

module.exports = { sequelize, connect };
