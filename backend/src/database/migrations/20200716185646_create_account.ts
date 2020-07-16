import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('accounts', (table) => {
        table.increments('id').primary();
        table.string('description').notNullable();
        table.string('field').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('accounts');
}

