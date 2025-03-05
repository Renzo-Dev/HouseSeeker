import fs from 'fs'
import * as path from 'node:path'

const filePath = path.resolve('languages/texts.json');
console.log(filePath)
// Load the file
let texts = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

export default texts