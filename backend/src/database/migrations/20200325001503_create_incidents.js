
exports.up = function(knex) {
  
    return knex.schema.createTable('incidents', function (table){
        table.increments(); //primary
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        //Id da ONG
        table.string('ong_id').notNullable();

        //Foreign
        table.foreign('ong_id').references('id').inTable('ongs');

    });

};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
