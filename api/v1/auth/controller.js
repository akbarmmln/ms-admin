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
const Client = require('ssh2').Client;
const { exec } = require('child_process');
const shell = require('shelljs');
const system = require('system-commands')

exports.adminLogin = async function (req, res) {
  try {
    let newDate = moment().format(),
      email = req.body.email,
      password = req.body.password,
      uuid = uuidv4(),
      counter = 0;

    if (await formatData.isEmpty(email)) {
      throw '10001';
    } else if (await formatData.isEmpty(password)) {
      throw '01002';
    }
    let resultLogin = await AksAdmLogin.findOne({
      raw: true,
      where: {
        is_deleted: 0,
        email: email
      }
    });
    if (!resultLogin) {
      logger.error('login, email not found or id has deleted!');
      throw '01003';
    }
    counter = resultLogin.counter === null ? 0 : parseInt(resultLogin.counter);
    if (counter === parseInt(process.env.COUNTER_BLOCKED_LOGIN)) {
      throw '01133';
    }
    let resultProfil = await AksAdmProfil.findOne({
      raw: true,
      where: {
        is_deleted: 0,
        id: resultLogin.id
      }
    });
    if (!resultProfil) {
      logger.error('login, profil not found or id has deleted!');
      throw '01003';
    }
    if (resultProfil.status !== 'active') {
      logger.error('login, user is not active!');
      throw '01004';
    }
    let resultGroup = await AksAdmGroup.findOne({
      raw: true,
      where: {
        id: resultLogin.group_id
      }
    })
    let resultAkses = await AksesLoginView.findAll({
      raw: true,
      where: {
        id_login: resultLogin.id
      }
    })
    let checkPass = await bcrypt.compare(password, resultLogin.password);
    if (checkPass) {
      logger.debug('login, login success');
      let tokenRes = await jwt.sign({
        id: resultLogin.id,
        email: resultLogin.email,
        uuid: uuid
      }, secret, {
        expiresIn: 36000 // expires in 1 hour
      });
      await AksAdmLogin.update({
        session: uuid, last_login: newDate
      }, {
        where: { email: email }
      });

      let resultJson = {
        token: tokenRes,
        id: resultLogin.id,
        email: email,
        firstname: resultProfil.firstname,
        lastname: resultProfil.lastname,
        status: resultProfil.status,
        is_deleted: resultProfil.is_deleted,
        last_login: resultLogin.last_login,
        init_login: resultLogin.pwd_init_flg,
        group_id: resultGroup.id,
        group_name: resultGroup.name,
        counter: counter,
        akses: []
      };
      for(let i=0; i<resultAkses.length; i++){
        let features = {};
        features['features'] = resultAkses[i].akses_fitur;
        features['features_to'] = resultAkses[i].akses_to;
        features['view'] = resultAkses[i].view;
        features['create'] = resultAkses[i].create;
        features['edit'] = resultAkses[i].edit;
        features['delete'] = resultAkses[i].delete;
        resultJson['akses'].push(features);
      }

      // return res.status(200).json(rsMsg(resultJson))
      return res.status(200).json('hai')
    }else{
      await AksAdmLogin.update({
        counter: counter + 1
      }, {
        where: { email: email }
      });
      logger.error('login, password not match!');
      counter = counter + 1;
      throw '01005';
    }
  } catch (e) {
    if (typeof e === 'string') {
      logger.error(`error request data - adminLogin... ${e}`);
      return res.status(400).json(errMsg(e));
    } else {
      logger.error(`internal server error - adminLogin... ${e}`);
      return res.status(500).json(errMsg('04000', e.toString()));
    }
  }
};

exports.deploy = async function(req, res){
  try{
    system('source /home/souh8667/nodevenv/ms-admin/10/bin/activate && cd /home/souh8667/ms-admin && ls').then(output => {
      logger.debug(output);
      return res.status(200).json(rsMsg(output));
    }).catch(error => {
      logger.error(error)
      return res.status(500).json(errMsg('04000', error.toString()));
    })
  }catch(e){
    return res.status(500).json(errMsg('04000', e.toString()));
  }
}