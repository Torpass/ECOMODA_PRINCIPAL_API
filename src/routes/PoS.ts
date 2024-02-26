import express from 'express';
import {createstore, updatestore} from '../controllers/PoS';
import { storevalidator } from '../validators/storeValidator';
const router = express.Router();

router.post('/createstore',
            storevalidator,//aqui va el validador
            createstore
);

router.put('/updatestore/:idstore',
            storevalidator,
            updatestore
);



module.exports = router;