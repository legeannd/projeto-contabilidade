import knex from '../database/connection';
import {Request, Response} from 'express';
class AccountController {
    async create(request: Request, response: Response) {
        const {description, field} = request.body;

        const account = await knex('accounts').insert({
            description,
            field
        });

        return response.json(account);
    }

    async index(request:Request, response: Response){
        const accounts = await knex('accounts').select('*');

        return response.json(accounts);
    }
}

export default AccountController;