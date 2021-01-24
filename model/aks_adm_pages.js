const Sequelize = require('sequelize');
const dbConnection = require('../config/db').Sequelize;

const AksAdmPages = dbConnection.define('aks_adm_pages', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    created_dt: Sequelize.DATE,
    created_BY: Sequelize.STRING,
    modified_dt: Sequelize.DATE,
    modified_by: Sequelize.STRING,
    is_deleted: Sequelize.INTEGER,
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    unique_tag: Sequelize.STRING,
    pages: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'aks_adm_pages'
});

module.exports = AksAdmPages;