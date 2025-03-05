import start from './start.js'
import subscribe from './subscribe.js'

const commands = [
	{
		command: 'start', action: (ctx) => {
			return start(ctx)
		}
	},
	// {
	// 	command: 'help', action: (ctx) => {
	// 		return ctx.reply(help(ctx))
	// 	}
	// },
	{
		command: 'subscribe', action: (ctx) => {
			return subscribe(ctx)
		}
	}
]

export default commands