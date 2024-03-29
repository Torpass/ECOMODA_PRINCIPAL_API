import express from 'express';
import {createGarment, updateGarment, getOneGarment, getAllGarments, deleteGarment} from '../controllers/design/Garment';
import { garmentValidator } from '../validators/garmentValidator';
import  uploadImg  from '../utils/design/StorageImgs';
import uploadPattern from '../utils/design/StoragePattern';

const router = express.Router();

router.post('/creategarment',
            uploadPattern.single('pattern'),
            uploadImg.array('garmentImg'),
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