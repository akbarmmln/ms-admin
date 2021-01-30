'use strict';

const moment = require('moment');
const uuidv4 = require('uuid/v4');
const logger = require('../../../config/logger');
const rsMsg = require('../../../response/rs');
const errMsg = require('../../../error/resError');
const formatData = require('../../../config/format');
const AksAdmLogin = require('../../../model/aks_adm_login');
const AksAdmProfil = require('../../../model/aks_adm_profil');
const AksAdmGroup = require('../../../model/aks_adm_group');
const AksAdmPages = require('../../../model/aks_adm_pages');
const AksAkses = require('../../../model/aks_adm_akses');
const AksesLoginView = require('../../../model/akses_login_view');
const secret = require('../../../setting').secret;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Sequelize = require('../../../config/db').Sequelize;

exports.accountAdmin = async function (req, res) {
  try {
    let page = parseInt(req.params.page);
    let pageLimit = parseInt(req.params.limit);
    let offset = pageLimit * (page - 1);
    let keyword = req.params.keyword;
    let resultLoginCount, resultLogin;
    let exclude = ['password', 'session'];
    let order = [
      ['status', 'DESC']
    ];

    if (keyword) {
      resultLoginCount = await AksAdmProfil.count({
        include: [{
          model: AksAdmLogin,
          as: 'login',
          required: true
        }],
        where: Sequelize.literal(`login.is_deleted=0 AND aks_adm_profil.is_deleted=0 AND (aks_adm_profil.firstname LIKE '%${keyword}%' OR aks_adm_profil.lastname LIKE '%${keyword}%' OR aks_adm_profil.status LIKE '%${keyword}%' OR login.email LIKE '%${keyword}%')`)
      });

      resultLogin = await AksAdmProfil.findAll({
        include: [{
          model: AksAdmLogin,
          as: 'login',
          required: true,
          attributes: {
            exclude: exclude
          },
          include: [{
            model: AksAdmGroup,
            as: 'const_group',
            required: true,  
          }]
        }],
        where: Sequelize.literal(`login.is_deleted=0 AND aks_adm_profil.is_deleted=0 AND (aks_adm_profil.firstname LIKE '%${keyword}%' OR aks_adm_profil.lastname LIKE '%${keyword}%' OR aks_adm_profil.status LIKE '%${keyword}%' OR login.email LIKE '%${keyword}%')`),
        limit: pageLimit,
        offset: offset,
        order: order
      })
    }else{
      resultLoginCount = await AksAdmProfil.count({
        include: [{
          model: AksAdmLogin,
          as: 'login',
          required: true
        }],
        where: {
          is_deleted: 0
        }
      });
      resultLogin = await AksAdmProfil.findAll({
        include: [{
          model: AksAdmLogin,
          as: 'login',
          required: true,
          attributes: {
            exclude: exclude
          },
          include: [{
            model: AksAdmGroup,
            as: 'const_group',
            required: true,  
          }]
        }],
        where: {
          is_deleted: 0
        },
        limit: pageLimit,
        offset: offset,
        order: order
      });
    }
    let arr=[];
    for(let i=0; i<resultLogin.length; i++){
      arr.push({
        id: resultLogin[i].id,
        firstname: resultLogin[i].firstname,
        lastname: resultLogin[i].lastname,
        email: resultLogin[i].login.email,
        role: resultLogin[i].login.const_group.description,
        status: resultLogin[i].status
      })
    }
    let response = rsMsg(arr);
    response.currentPage = page;
    response.totalPage = Math.ceil(resultLoginCount / pageLimit);
    response.totalData = resultLoginCount;
    return res.json(response);
  } catch (e) {
    if (typeof e === 'string') {
      logger.error(`error request data - accountAdmin... ${e}`);
      return res.status(400).json(errMsg(e));
    } else {
      logger.error(`internal server error - accountAdmin... ${e}`);
      return res.status(500).json(errMsg('04000', e.toString()));
    }
  }
}

exports.getAccount = async function(req, res){
  try{
    let id = req.params.id;
    let data = await AksAdmProfil.findOne({
      include: [{
        model: AksAdmLogin,
        as: 'login',
        required: true,
        include: [{
          model: AksAdmGroup,
          as: 'const_group',
          required: true,  
        }]
      }],
      where: Sequelize.literal(`login.is_deleted=0 AND aks_adm_profil.is_deleted=0 AND aks_adm_profil.id = '${id}'`)
    })
    let fin = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.login.email,
      role: data.login.const_group.description,
      status: data.status,
      features: []
    }
    let features = await AksesLoginView.findAll({
      raw: true,
      attributes: {
        exclude: ['id_login', 'firstname', 'lastname', 'email']
      },
      where: { id_login: data.id }
    })
    fin.features = features;
    return res.status(200).json(rsMsg(fin));
  }catch(e){
    if (typeof e === 'string') {
      logger.error(`error request data - getAccount... ${e}`);
      return res.status(400).json(errMsg(e));
    } else {
      logger.error(`internal server error - getAccount... ${e}`);
      return res.status(500).json(errMsg('04000', e.toString()));
    }
  }
}