import express from 'express';
import AccountController from './controllers/accountController';

const routes = express.Router();
const accountController = new AccountController();

routes.get('/', (req,res)=>{
    return res.status(200).send('sucesso');
});

routes.post('/accounts', accountController.create);
routes.get('/accounts', accountController.index);
routes.delete('/accounts/:id', accountController.delete);

export default routes;
