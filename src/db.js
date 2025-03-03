
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_URL,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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
