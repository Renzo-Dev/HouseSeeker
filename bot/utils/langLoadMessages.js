import fs from 'fs'
import * as path from 'node:path'

let messages
try {
	const filePath = path.resolve('languages/texts.json')
	
	// Загружаем JSON-файл с текстами
	messages = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
} catch (err) {
	console.error('❌ Ошибка при загрузке текстов:', err)
}
export default messages