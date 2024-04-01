import express from 'express';
import router from './routes/index'
import cors from "cors";
import path from 'path';

const app = express();
app.use('/images', express.static(path.join(__dirname, 'storage/garments/images')));
app.use('/patterns', express.static(path.join(__dirname, 'storage/garments/pattern')));
app.use('/default', express.static(path.join(__dirname, 'storage/garments/default')));

app.use(cors());
app.use(express.json());
app.use('/api', router);

export { app };
