const path = require('node:path')
const fs = require('node:fs')
const start = require('./handlers/start')
const subscribe = require('./handlers/subscribe')


class Commands {
	commands = [
		{
			command: 'start', action: (ctx) => {
				return start(ctx)
			}
		},
		{
			command: 'subscribe', action: (ctx) => {
				return subscribe(ctx)
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
			})
			console.log('\n✅ Commands loaded...')
			this.bot.hears(/^\/sub.*/, async (ctx) => {
				try {
					ctx.command = 'subscribe'
					await this.commands.find(({command}) => command === 'subscribe').action(ctx)
				} catch (err) {
					console.error('⚠️ Ошибка в команде /sub:', err)
				}
			})
		} catch (err) {
			console.log('❌ Error loading commands...\n' + err.message)
		}
	}
}

module.exports = {
	Commands: Commands
}