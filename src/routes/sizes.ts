import express from 'express';
import {createSize, updateSize, getAllSize, getOneSize, deleteSize} from '../controllers/design/Size';
import { sizeValidator } from '../validators/sizeValidator';
const router = express.Router();

router.post('/createsize',
            sizeValidator,
            createSize
);

router.put('/updatesize/:idsize',
            sizeValidator   ,
            updateSize
);

router.get('/getonesize/:idsize', getOneSize);

router.get('/getallsize', getAllSize);

router.delete('/deletesize/:idsize',
            deleteSize
);
module.exports = router;