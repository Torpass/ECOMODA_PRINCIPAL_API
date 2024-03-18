import express from 'express';
import {createCollection, updateCollection, getOneCollection, getAllCollection, deleteCollection} from '../controllers/design/Collections';
import { collectionValidator } from '../validators/collectionValidator';
const router = express.Router();

router.post('/createcollection',
            collectionValidator,
            createCollection
);

router.put('/updatecollection/:idcollection',
            collectionValidator,
            updateCollection
);

router.get('/getonecollection/:idcollection', getOneCollection);

router.get('/getallcollection', getAllCollection);

router.delete('/deletecollection/:idcollection',
            deleteCollection
);
module.exports = router;