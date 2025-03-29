exports.up = function (knex) {
	return knex.schema.createTable('subscribes', table => {
		table.increments('id').primary()
		table.integer('user_id').unique().unsigned().notNullable()
		table.date('start_date').notNullable()
		table.date('end_date').notNullable()
		table.string('status').notNullable()
		table.timestamps(true, true)
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('subscribes')
}
