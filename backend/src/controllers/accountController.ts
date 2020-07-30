import knex from '../database/connection';
import {Request, Response} from 'express';
class AccountController {
    async create(request: Request, response: Response) {
        try {
            const {description, field} = request.body;
            var nature = '';
            if(String(field).toLowerCase().includes('ativo')){
                nature = 'devedora';
            } else if (String(field).toLowerCase().includes('passivo') || String(field).toLowerCase().includes('patrimônio líquido')) {
                nature = 'credora';
            }

            const [id] = await knex('accounts').insert({
                description,
                field,
                nature
            });

            return response.json({
                'id': id,
                description,
                field,
                nature
            });
        } catch (e){
            console.log(e);
        }
    }

    async index(request:Request, response: Response){
        const accounts = await knex('accounts').select('*');

        return response.json(accounts);
    }
}

export default AccountController;