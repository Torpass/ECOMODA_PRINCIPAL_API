import express from 'express';
import {createSupplier, getAllSuppliers, getAllSupplierById, updateSupplier} from "../controllers/suppliers"; 
import {SupplierValidator, SupplierValidatorUpdate} from "../validators/SupplierValidator";
const router = express.Router();


router.post('/createSupplier',
            SupplierValidator,
            createSupplier
);


router.get('/getAllSuppliers',
            getAllSuppliers
);


router.get('/getSupplierById/:idSupplier',
            getAllSupplierById
);


router.put('/updateSupplier/:idSupplier',
            SupplierValidatorUpdate,
            updateSupplier
);



module.exports = router;
