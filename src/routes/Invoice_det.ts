import express from 'express';
import {createinvoice, updateinvoice, getoneInvoice, getAllInvoices, deleteInvoice} from '../controllers/Invoice_det';
const router = express.Router();

router.post('/createinvoice',
            //aqui va el validador
            createinvoice
);

router.put('/updateinvoice/:inventory_id/:invoice_id',
           
updateinvoice
);

router.get('/getoneInvoice/:inventory_id/:invoice_id', getoneInvoice);

router.get('/getAllInvoices', getAllInvoices);

router.delete('/deleteInvoice/:inventory_id/:invoice_id',
deleteInvoice
);
module.exports = router;