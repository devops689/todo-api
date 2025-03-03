
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_URL || '127.0.0.1',
    port: process.env.DB_PORT || '3306',
    database: process.env.DB_NAME || 'todo_db',
    username: process.env.DB_USER || 'znz',
    password: process.env.DB_PASSWORD || 'smacltd',
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
