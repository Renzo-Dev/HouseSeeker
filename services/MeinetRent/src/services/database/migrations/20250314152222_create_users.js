exports.up = function (knex) {
	return knex.schema.createTable('users', table => {
		table.increments('id').primary()
		table.bigInteger('telegram_id').notNullable()
		table.string('first_name').notNullable()
		table.string('last_name').notNullable()
		table.string('email').unique().notNullable()
		table.string('phone').notNullable()
		table.string('city').notNullable()
		table.integer('min_price').notNullable()
		table.integer('max_price').notNullable()
		table.integer('min_rooms').notNullable()
		table.integer('max_rooms').notNullable()
		table.text('description')
		table.timestamps(true, true)
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('users')
}
