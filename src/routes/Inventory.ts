import express from 'express';
import {createinventory, updateinventory, getoneinventory, getAllInventories, deleteinventory} from '../controllers/Inventory';
const router = express.Router();

router.post('/createstore',
            //aqui va el validador
            createinventory
);

router.put('/updatestore/:idstore/:product_id',
            
            updateinventory
);

router.get('/getoneinventory/:idstore/:product_id', getoneinventory);

router.get('/getAllInventories', getAllInventories);

router.delete('/deleteinventory/:idstore/:product_id',
    deleteinventory
);
module.exports = router;