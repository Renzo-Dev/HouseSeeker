// разные вспомогательные функции

import axios from 'axios'
import texts from './langLoadText.js'

// Очистка очереди обновлений перед запуском
export async function clearPendingUpdates() {
	const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getUpdates?offset=-1`
	try {
		await axios.get(url)
		console.log('Очередь обновлений очищена.')
	} catch (error) {
		console.error('Ошибка при очистке очереди:', error)
	}
}

export function getText(section, language) {
	const userLang = language || 'en' // Дефолтный язык - английский
	return texts[section][userLang] || texts[section]['en'] // Если язык не поддерживается, показываем английский
}
