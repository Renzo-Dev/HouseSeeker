const path = require('node:path')
const fs = require('node:fs')
const start = require('./handlers/start')


class Commands {
	commands = [
		{
			command: 'start', action: (ctx) => {
				return ctx.reply(start(ctx))
			}
		}
	]
	
	constructor(bot) {
		this.bot = bot
	}
	
	// загрузить команды
	async loadCommands() {
		try {
			console.log('Load commands...')
			this.commands.forEach(({command, action}) => {
				console.log(`👉 Commands: /${command}`)
				this.bot.command(command, async (ctx) => {
					await action(ctx)
				})
				console.log('✅ Commands loaded...')
			})
			this.bot.hears(/^\/sub.*/, (ctx) => {
				ctx.command = 'subscribe'
				this.bot.commands.find(({command}) => command === 'subscribe').action(ctx)
			})
		} catch (err) {
			console.log('❌ Error loading commands...\n' + err.message)
		}
	}
}

module.exports = {
	Commands: Commands
}