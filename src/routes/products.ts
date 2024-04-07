import express from 'express';
import {createProduct, deleteProduct, getAllProduct, getoneProduct, updateProduct} from "../controllers/products"; 
import { materialValidator } from '../validators/materialValidator';
import ValidatorRegisterProduct from '../validators/productValidator';
const router = express.Router();


router.post('/createProduct',
            ValidatorRegisterProduct,
            createProduct,
);

router.put('/createProduct/:name',
            updateProduct
);

router.get('/getoneProduct/:name', getoneProduct );

router.get('/getAllProduct', getAllProduct );

router.delete('/deleteProduct/:name', deleteProduct);



module.exports = router;
