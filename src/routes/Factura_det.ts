import express from 'express';
import {createfactura, updatefactura, getoneFactura, getAllFactura, deleteFactura} from '../controllers/Factura_det';
const router = express.Router();

router.post('/createfactura',
            //aqui va el validador
            createfactura
);

router.put('/updatefactura/:productoID/:ventaCabeceraID',
           
updatefactura
);

router.get('/getoneFactura/:productoID/:ventaCabeceraID', getoneFactura);

router.get('/getAllFactura', getAllFactura);

router.delete('/deleteFactura/:productoID/:ventaCabeceraID',
deleteFactura
);
module.exports = router;