import express from 'express';
import {createorder, getallorders, getallordersByid, updateorder} from "../controllers/orders"; 
import {OrderValidator} from "../validators/ordersvalidator";
const router = express.Router();


router.post('/createorder',
            OrderValidator,
            createorder
);


router.get('/getallorders',
getallorders
);


router.get('/getallordersByid/:idSupplier',
getallordersByid
);


router.put('/updateorder/:idSupplier',
            updateorder
);



module.exports = router;
