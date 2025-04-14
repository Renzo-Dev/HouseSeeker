const {resolve} = require('node:path')
const {readFileSync} = require('node:fs')
const path = require('node:path')

class Locales {
	locales = []
	
	constructor(language) {
		// загружаем сообщения на языке
		try {
			if (!['en', 'ru', 'de'].includes(language)) {
				language = 'en'
			}
			const filePath = path.resolve(__dirname, '..', 'locales', `${language}.json`)
			this.locales = JSON.parse(readFileSync(filePath, 'utf-8'))
		} catch (err) {
			console.error('❌ Ошибка при загрузке сообщений:', err)
		}
	}
	
	getSection(section) {
		return this.locales[section]
	}
}

module.exports = Locales