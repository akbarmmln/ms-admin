const Sequelize = require('sequelize');
const dbConnection = require('../config/db').Sequelize;

const AksAdmAkses = dbConnection.define('aks_adm_akses', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    created_dt: Sequelize.DATE,
    created_BY: Sequelize.STRING,
    modified_dt: Sequelize.DATE,
    modified_by: Sequelize.STRING,
    is_deleted: Sequelize.INTEGER,
    group_id: Sequelize.STRING,
    profil_id: Sequelize.STRING,
    pages_id: Sequelize.STRING,
    view: Sequelize.INTEGER,
    create: Sequelize.INTEGER,
    edit: Sequelize.INTEGER,
    delete: Sequelize.INTEGER
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'aks_adm_akses'
});

module.exports = AksAdmAkses;