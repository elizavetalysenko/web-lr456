import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Telegraf } from 'telegraf';
import { apiKey, port, chatId } from './src/config.js';
import { mailer } from './src/Mailer.js';

const bot = new Telegraf(apiKey);

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (_, res) => {
  res.send('Hello')
})

app.post('/send', async (req, res) => {
    const message = `Topic: ${req.body.theme}\nStudent: ${req.body.name}\nGroup: ${req.body.group}\nResult: ${req.body.result}/${req.body.maxScore}\n`;
    bot.telegram.sendMessage(chatId, message);
    //mailer.sendMail(message);
    res.send(message);
})

app.listen(port, () => {
  console.log(`Express web server is running at http://localhost:${port}`)
})
