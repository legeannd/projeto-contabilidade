import knex from '../database/connection';
import {Request, Response} from 'express';
class AccountController {
    async create(request: Request, response: Response) {
        try {
            const {description, field} = request.body;

            const [id] = await knex('accounts').insert({
                description,
                field
            });

            return response.json({
                'id': id,
                description,
                field
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