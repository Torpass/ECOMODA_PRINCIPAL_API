import express from 'express';
import {createstore, updatestore, getonetores, getAllStores, deletestore} from '../controllers/PoS';
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

router.get('/getonestore/:idstore', getonetores);

router.get('/getallstores', getAllStores);

router.delete('/deletestore/:idstore',
            deletestore
);
module.exports = router;