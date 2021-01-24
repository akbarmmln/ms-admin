const logger = require('../config/logger');
const errMsg = require('../error/resError');
const nodemailer = require('nodemailer');

exports.returnFunction = function (resObject, errorMessageLogger, errorObject) {
  if (typeof errorObject === 'string') {
    logger.error(errorMessageLogger, errorObject.toString());
    return resObject.status(400).json(errMsg(errorObject));
  } else {
    logger.error(errorObject.toString());
    return resObject.status(500).json(errMsg('02000'));
  }
};

exports.sendGridMailer = async function (from, to, subject, body, attachments, bodyType = 'html') {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST_MAIL,
      port: process.env.PORT_MAIL,
      secure: true,
      // service:  'gmail',
      auth: {
        user: process.env.USER_MAIl,
        pass: process.env.PASS_MAIL
      }
    });
    let sendProps = {
      from: from,
      to: to,
      subject: subject
    };

    if (bodyType !== 'html') {
      sendProps.text = body;
    } else {
      sendProps.html = body;
    }
    if(attachments){
      sendProps.attachments = attachments
    }
    let info = await transporter.sendMail(sendProps);
    return info;
  } catch (e) {
    logger.error(`error sendGridMailer..., ${e}`);
    throw e;
  }
}
