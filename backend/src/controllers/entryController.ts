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
        const entriesWithAccounts: any[] = [];
        const entries = await knex('entries').select('*');

        const {description} = request.query;
        
        for (let i = 0; i < entries.length; i ++) {
            let account = [];
            if(description){
                account = (await knex('accounts').select('accounts.*').innerJoin('entries','entries.id','accounts.entry_id').where('accounts.entry_id','=',entries[i].id)).filter((value) => String(value.description).includes(String(description)));
            }else{
                account = await knex('accounts').select('accounts.*').innerJoin('entries','entries.id','accounts.entry_id').where('accounts.entry_id','=',entries[i].id);
            }

            if(account.length != 0){
                entriesWithAccounts.push({
                    id: entries[i].id,
                    data: entries[i].data,
                    historic: entries[i].historic,
                    created_at: entries[i].created_at,
                    updated_at: entries[i].updated_at,
                    accounts: account
                });
            }
        }

        return response.json(entriesWithAccounts);
    }

    async accountsPerEntry(request: Request, response: Response){
        const id = request.params.id;

        const accounts = await knex('accounts').select('accounts.*').innerJoin('entries','entries.id','accounts.entry_id').where('entries.id',id);

        const entry = await knex('entries').select('*').where('id',id);

        const result = {
            id: entry[0].id,
            data: entry[0].data,
            historic: entry[0].historic,
            created_at: entry[0].created_at,
            updated_at: entry[0].updated_at,
            accounts
        }

        return response.json(result);
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