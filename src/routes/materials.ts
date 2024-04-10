import express from 'express';
import {createMaterial, updateMaterial, getOneMaterial, getAllMaterials, deleteMaterial} from '../controllers/design/Materials';
import { materialValidator } from '../validators/materialValidator';
const router = express.Router();

router.post('/creatematerial',
            materialValidator,
            createMaterial
);

router.put('/updatematerial/:idmaterial',
            materialValidator,
            updateMaterial
);

router.get('/getonematerial/:idmaterial', getOneMaterial);

router.get('/getallmaterial', getAllMaterials);

router.put('/deletematerial/:idmaterial',
            deleteMaterial
);
module.exports = router;