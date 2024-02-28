import express from 'express';
import {createMaterial, updateMaterial, getoneMaterial, getAllMaterials, deleteMaterial} from '../controllers/design/Materials';
import { materialValidator } from '../validators/materialValidator';
const router = express.Router();

router.post('/creatematerial',
            materialValidator,//aqui va el validador
            createMaterial
);

router.put('/updatematerial/:idmaterial',
            materialValidator,
            updateMaterial
);

router.get('/getonematerial/:idmaterial', getoneMaterial);

router.get('/getallmaterial', getAllMaterials);

router.delete('/deletematerial/:idmaterial',
            deleteMaterial
);
module.exports = router;