const {Scenes} = require('telegraf')
const Locales = require('../utils/locales')

let msg
const editDetailsScene = new Scenes.WizardScene(
	'editDetailsScene',
	async (ctx) => {
		ctx.scene.leave()
	}
)

module.exports = editDetailsScene