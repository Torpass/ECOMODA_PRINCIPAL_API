import express from 'express';
import {createGarmentsMaterials, updateGarmentsMaterials, getOneGarmentsMaterials, getAllGarmentsMaterials, deleteGarmentsMaterials} from '../controllers/design/GarmentsMaterials';
import { GarmentsMaterialsValidator } from '../validators/garmentsMaterialsValidator';
const router = express.Router();

router.post('/creategarmentsmaterials',
            GarmentsMaterialsValidator,
            createGarmentsMaterials
);

router.put('/updategarmentsmaterials/:idgarmentsmaterials',
            GarmentsMaterialsValidator,
            updateGarmentsMaterials
);

router.get('/getonegarmentsmaterials/:idgarmentsmaterials', getOneGarmentsMaterials);

router.get('/getallgarmentsmaterials', getAllGarmentsMaterials);

router.delete('/deletegarmentsmaterials/:idgarmentsmaterials',
            deleteGarmentsMaterials
);
module.exports = router;