import express from 'express';
import {createinventory, updateinventory, getoneinventory, getAllInventories, deleteinventory} from '../controllers/Inventory';
const router = express.Router();

router.post('/createinventory',
            //aqui va el validador
            createinventory
);

router.put('/updateinventory/:store_id/:product_id',
            
            updateinventory
);

router.get('/getoneinventory/:store_id/:product_id', getoneinventory);

router.get('/getAllInventories', getAllInventories);

router.delete('/deleteinventory/:store_id/:product_id',
    deleteinventory
);
module.exports = router;