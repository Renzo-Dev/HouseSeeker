const express = require('express')
const crypto = require('crypto')
const axios = require('axios')

const app = express()
app.use(express.urlencoded({extended: true}))

// Твои секретные слова из FreeKassa
const SECRET_WORD_1 = '_)+dtd8W%309k=N'
const SECRET_WORD_2 = 'k)dXfM.VDK=PQ9G'

// Telegram Bot API
const TELEGRAM_BOT_URL = 'http://localhost:3000/notify' // или внешний адрес твоего бота

// Уведомление от FreeKassa

app.get('/notify', (req, res) => {
})
app.get('/success', (req, res) => {
})
app.get('/fail', (req, res) => {
})