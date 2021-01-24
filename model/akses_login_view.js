const Sequelize = require('sequelize');
const dbConnection = require('../config/db').Sequelize;

const AksesLoginView = dbConnection.define('akses_login', {
    id_login: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    email: Sequelize.STRING,
    akses_fitur: Sequelize.STRING,
    akses_to: Sequelize.STRING,
    view: Sequelize.INTEGER,
    create: Sequelize.INTEGER,
    edit: Sequelize.INTEGER,
    delete: Sequelize.INTEGER
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'akses_login'
});
AksesLoginView.removeAttribute('id');

module.exports = AksesLoginView;