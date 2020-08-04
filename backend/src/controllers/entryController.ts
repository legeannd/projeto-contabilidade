import knex from '../database/connection';
import { Request, Response } from 'express';

class EntryController {
    async create(request: Request, response: Response) {
        try {
            const { data, historic } = request.body;

            const [id] = await knex('entries').insert({
                data,
                historic
            });

            return response.json({
                id,
                data,
                historic
            });
        } catch (e) {
            console.log(e);
        }
    }

    async index(request: Request, response: Response) {
        const entries = await knex('entries').select('*');

        return response.json(entries);
    }

    async accountsPerEntry(request: Request, response: Response){
        const id = request.params.id;

        const accounts = await knex('accounts').select('*').innerJoin('entries','entries.id','accounts.entry_id').where('entries.id',id);

        return response.json(accounts);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        const entries = await knex('entries').where('id', id).delete();
        if (entries) {
            return response.json({
                message: "deletado com sucesso"
            });
        } else {
            return response.json({
                message: "Problema ao deletar"
            });
        }
    }
}

export default EntryController;