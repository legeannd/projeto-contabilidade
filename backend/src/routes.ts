import express from 'express';
import AccountController from './controllers/accountController';
import EntryController from './controllers/entryController';

const routes = express.Router();
const accountController = new AccountController();
const entryController = new EntryController();

routes.get('/', (req,res)=>{
    return res.status(200).send('sucesso');
});

routes.post('/accounts', accountController.create);
routes.get('/accounts', accountController.index);
routes.delete('/accounts/:id', accountController.delete);

routes.post('/entries', entryController.create);
routes.get('/entries', entryController.index);
routes.delete('/entries/:id', entryController.delete);

export default routes;
