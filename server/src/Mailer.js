import nodemailer from 'nodemailer';
import { mailConfig } from './config.js';

class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: mailConfig.host,
            port: mailConfig.port,
            secure: true,
            auth: {
              user: mailConfig.user,
              pass: mailConfig.pass
            }
          });
    }

    sendMail(message) {
        var mailOptions = {
            from: 'laba456kpi@lizalysenko.online',
            to: 'laba456kpi@lizalysenko.online',
            subject: 'ТР-13 Лисенко Єлизавета Олександрівна ЛР456 JS2023',
            text: message
        };

        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

export const mailer = new Mailer();