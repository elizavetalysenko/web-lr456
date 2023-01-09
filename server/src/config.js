import nconf from 'nconf';

nconf.argv().env().file('config.json');

const appConfig = nconf.get('app');
export const mailConfig = nconf.get('mailer');
export const apiKey = appConfig.apiKey;
export const hostname = appConfig.hostname;
export const port = appConfig.port;
export const chatId = appConfig.chatId;
