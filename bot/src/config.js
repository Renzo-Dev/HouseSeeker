require('dotenv').config()

module.exports = {
	botToken: process.env.BOT_TOKEN,
	url_load_apartment: process.env.BOT_URL_LOAD_APARTMENT_URL,
	url_submit_apartment: process.env.APP_SUBMIT_APARTMENT_URL,
	app_port: process.env.APP_PROT
}