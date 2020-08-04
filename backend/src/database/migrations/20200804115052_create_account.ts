import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('accounts', (table) => {
        table.increments('id').primary();

        table.string('type').notNullable();
        table.string('description').notNullable();
        table.float('value').notNullable();
        table.string('field').notNullable();
        table.string('nature');
        
        table.integer('entry_id').references('id').inTable('entries');

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('accounts');
}

