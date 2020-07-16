import express from 'express';
import routes from './routes';
import cors from 'cors';
const app = express();

const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.use(routes);


app.listen(3333, () => {
    console.log(`Server started on port ${PORT}`);
});
