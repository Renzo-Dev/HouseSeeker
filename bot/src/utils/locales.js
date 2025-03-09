const {resolve} = require('node:path')
const {readFileSync} = require('node:fs')

class Locales {
	locales = []
	
	constructor(language) {
		// загружаем сообщения на языке
		try {
			if (!['en', 'ru', 'de'].includes(language)) {
				language = 'en'
			}
			const filePath = resolve(`src/locales/${language}.json`)
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