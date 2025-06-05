const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("school", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(() => {
    console.log("bd conectado")
}).catch( err => {
    console.log(`Erro: ${err}`)
});

module.exports = {
    sequelize, Sequelize
};