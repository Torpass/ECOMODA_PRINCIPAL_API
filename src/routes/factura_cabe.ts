import express from 'express';
import {createinvoce, updateinvoice, getoneInvoice, getAllINVOICE, deletgetAllINVOICE} from '../controllers/Factura_cabe';
const router = express.Router();

router.post('/createinvoce',
            createinvoce
);

router.put('/updatestore/:idstore',
            updateinvoice
);

router.get('/getonestore/:idstore', getoneInvoice);

router.get('/getallstores', getAllINVOICE);

router.delete('/deletestore/:idstore',
deletgetAllINVOICE
);
module.exports = router;