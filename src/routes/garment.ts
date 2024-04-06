import express from 'express';
import { createGarment, updateGarment, getOneGarment, getAllGarments, deleteGarment} from '../controllers/design/Garment';
import { garmentValidator } from '../validators/garmentValidator';
import  upload  from '../utils/design/handleStorage'

const router = express.Router();

router.post('/creategarment',
    upload.fields([
        {name: 'imagen', maxCount: 3},
        {name: 'pattern', maxCount: 1}
    ]), 
    garmentValidator,
    createGarment,
);

router.put('/updategarment/:idgarment',
            garmentValidator,
            updateGarment
);

router.get('/getonegarment/:idgarment', getOneGarment);

router.get('/getallgarments', getAllGarments);

router.put('/deletegarment/:idgarment',
            deleteGarment
);
module.exports = router;