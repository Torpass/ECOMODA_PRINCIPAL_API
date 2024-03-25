import express from 'express';
import {createGarment, updateGarment, getOneGarment, getAllGarments, deleteGarment} from '../controllers/design/Garment';
import { garmentValidator } from '../validators/garmentValidator';
const router = express.Router();

router.post('/creategarment',
            garmentValidator,
            createGarment
);

router.put('/updategarment/:idgarment',
            garmentValidator,
            updateGarment
);

router.get('/getonegarment/:idgarment', getOneGarment);

router.get('/getallgarments', getAllGarments);

router.delete('/deletegarment/:idgarment',
            deleteGarment
);
module.exports = router;