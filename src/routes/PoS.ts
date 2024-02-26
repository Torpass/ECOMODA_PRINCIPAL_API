import express from 'express';
import {createstore} from '../controllers/PoS';
import { storevalidator } from '../validators/storeValidator';
const router = express.Router();

router.post('/createstore',
            storevalidator,//aqui va el validador
            createstore
);



module.exports = router;