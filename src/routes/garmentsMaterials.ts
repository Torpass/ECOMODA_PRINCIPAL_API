import express from 'express';
import {createGarmentsMaterials, updateGarmentsMaterials, getOneGarmentsMaterials, getUnusedGarmentsMaterials, getAllGarmentsMaterials, deleteGarmentsMaterials} from '../controllers/design/GarmentsMaterials';
import { GarmentsMaterialsValidator } from '../validators/garmentsMaterialsValidator';
const router = express.Router();

router.post('/creategarmentsmaterials',
            GarmentsMaterialsValidator,
            createGarmentsMaterials
);

router.put('/updategarmentsmaterials/:idgarmentsmaterials',
            updateGarmentsMaterials
);

router.get('/getonegarmentsmaterials/:idgarmentsmaterials', getOneGarmentsMaterials);

router.get('/getunusedgarmentsmaterials/:idgarmentsmaterials', getUnusedGarmentsMaterials);

router.get('/getallgarmentsmaterials', getAllGarmentsMaterials);

router.delete('/deletegarmentsmaterials/:idgarmentsmaterials',
            deleteGarmentsMaterials
);
module.exports = router;