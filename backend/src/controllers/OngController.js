//import da conexão criada (connection.js)
const connection = require('../database/connection');

//pacote nativo do node para criptografia
const crypto = require ('crypto');

module.exports = {

    //lista de todos os dados
    async index(request, response){
            const ongs = await connection('ongs').select('*');
            return response.json( ongs );
    },

    //criando uma nova ONG
    async create(request, response){
    
    const { name, email, whatsapp, city, uf} = request.body;

    const id = crypto.randomBytes(4).toString("HEX");

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    });

    return response.json({ id });
    }

};