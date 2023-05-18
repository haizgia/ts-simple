import { RequestHandler } from "express";
import { internalServerError } from "../middlewares/handle-error";
import { transport } from "../config/mailer";
import Mail = require("nodemailer/lib/mailer");

export const sendMail: RequestHandler = async (req, res, next) => {
  try {
    const { email, subject, content } = req.body;
    const mailOptions: Mail.Options = {
      from: '<admin@blurdybloop.com>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      // text: 'Hello world?', // plain text body
      html: content, // html body
      attachDataUrls: false,
    };

    transport(res, mailOptions)
  } catch (error) {
    return internalServerError(res);
  }
};
