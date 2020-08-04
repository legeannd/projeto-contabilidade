import knex from '../database/connection';
import {Request, Response} from 'express';
class AccountController {
    async create(request: Request, response: Response) {
        var accounts = [];
        let accountLength = request.body.length;
        // const entry = await knex('entries').max('id');
        try {
            for(let i = 0; i < accountLength; i++){
                const {type, description, value, field, entry_id} = request.body[i];
                var nature = '';
                if(String(field).toLowerCase().includes('ativo')){
                    nature = 'devedora';
                } else if (String(field).toLowerCase().includes('passivo') || String(field).toLowerCase().includes('patrimônio líquido')) {
                    nature = 'credora';
                }

                const [id] = await knex('accounts').insert({
                    type,
                    description,
                    value,
                    field,
                    nature,
                    // entry_id: entry[0]['max(`id`)']
                    entry_id
                });
                accounts.push({
                    'id': id,
                    type,
                    description,
                    value,
                    field,
                    nature,
                    // entry_id: entry[0]['max(`id`)']
                    entry_id
                });
            }
            return response.json(accounts);
        } catch (e){
            console.log(e);
        }
    }

    async delete(request:Request, response:Response){
        const id = request.params.id;
        try {
            const exists = await knex('accounts').select('id').where('id',id);
            if(exists.length != 0){
                const ac = await knex('accounts').delete().where('id',id);
                return response.status(200).json({
                    message: "Deletado com sucesso!"
                });
            }
            return response.status(400).json({
                message: "Código não existe!"
            });
        } catch (e) {
            console.log(e);
            return response.status(400).json({
                message: `Error: ${e}`
            });
        }
    }

    async index(request:Request, response: Response){
        const accounts = await knex('accounts').select('*');

        return response.json(accounts);
    }
}

export default AccountController;