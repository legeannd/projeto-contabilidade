import knex from '../database/connection';
import {Request, Response} from 'express';
class AccountController {
    async create(request: Request, response: Response) {
        try {
            const {type, description, value, field} = request.body;
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
                nature
            });

            return response.json({
                'id': id,
                type,
                description,
                value,
                field,
                nature
            });
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