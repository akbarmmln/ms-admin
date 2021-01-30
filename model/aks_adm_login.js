const Sequelize = require('sequelize');
const dbConnection = require('../config/db').Sequelize;
const AksAdmProfil = require('./aks_adm_profil');
const AksAdmGroup = require('./aks_adm_group');

const AksAdmLogin = dbConnection.define('aks_adm_login', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    created_dt: Sequelize.DATE,
    created_BY: Sequelize.STRING,
    modified_dt: Sequelize.DATE,
    modified_by: Sequelize.STRING,
    is_deleted: Sequelize.INTEGER,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    pwd_init_flg: Sequelize.INTEGER,
    session: Sequelize.STRING,
    last_login: Sequelize.DATE,
    counter: Sequelize.INTEGER,
    group_id: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'aks_adm_login'
});

AksAdmProfil.hasOne(AksAdmLogin, {
    foreignKey: 'id',
    as: 'login'
});

AksAdmLogin.belongsTo(AksAdmGroup,{
    foreignKey: 'group_id',
    as: 'const_group'
})

module.exports = AksAdmLogin;