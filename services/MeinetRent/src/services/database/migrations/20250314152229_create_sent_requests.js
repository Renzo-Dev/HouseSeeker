exports.up = function(knex) {
	return knex.schema.createTable('sent_requests', table => {
		table.increments('id').primary();
		table.integer('user_id').unsigned().notNullable();
		table.foreign('user_id').references('users.id').onDelete('CASCADE');
		table.string('house_id').notNullable();
		table.string('link').notNullable();
		table.timestamps(true, true);
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('sent_requests');
};
