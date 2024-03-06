import express from 'express';
import {createGarmentType, updateGarmentType, getAllGarmentType, getOneGarmentType, deleteGarmentType} from '../controllers/design/GarmentType';
import { typeValidator } from '../validators/typeValidator';
const router = express.Router();

router.post('/createtype',
            typeValidator,
            createGarmentType
);

router.put('/updatetype/:idtype',
            typeValidator,
            updateGarmentType
);

router.get('/getonetype/:idtype', getOneGarmentType);

router.get('/getalltype', getAllGarmentType);

router.delete('/deletetype/:idtype',
            deleteGarmentType
);
module.exports = router;