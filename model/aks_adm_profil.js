const Sequelize = require('sequelize');
const dbConnection = require('../config/db').Sequelize;

const AksAdmProfil = dbConnection.define('aks_adm_profil', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    created_dt: Sequelize.DATE,
    created_BY: Sequelize.STRING,
    modified_dt: Sequelize.DATE,
    modified_by: Sequelize.STRING,
    is_deleted: Sequelize.INTEGER,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    status: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'aks_adm_profil'
});

module.exports = AksAdmProfil;