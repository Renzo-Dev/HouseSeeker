import {getText} from '../utils/helpers.js'

function help(ctx) {
	return getText('help', ctx.from.language_code)
}

export default help