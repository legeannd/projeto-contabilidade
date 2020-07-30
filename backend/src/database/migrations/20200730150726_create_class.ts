import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('classes',(table)=>{
        table.increments('id').primary();
        table.string('name');

        table.string('username_teacher').references('username').inTable('users');
        table.specificType('pupils','text ARRAY');

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('classes');
}

