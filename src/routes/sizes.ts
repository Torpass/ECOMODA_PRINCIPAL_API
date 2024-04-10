import express from 'express';
import {createSize, updateSize, getOneSize, getAllSizes, deleteSize} from '../controllers/design/Sizes';
import { sizeValidator } from '../validators/sizeValidator';
const router = express.Router();

router.post('/createsize',
            sizeValidator,
            createSize
);

router.put('/updatesize/:idsize',
            sizeValidator,
            updateSize
);

router.get('/getonesize/:idsize', getOneSize);

router.get('/getallsizes', getAllSizes);

router.put('/deletesize/:idsize',
            deleteSize
);
module.exports = router;