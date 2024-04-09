import express from 'express';
import {createCollection, updateCollection, getOneCollection, getAllCollection, deleteCollection, getCounts, getLastCollectionGarments} from '../controllers/design/Collections';
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

router.put('/deletecollection/:idcollection',
            deleteCollection
);

router.get('/getlastcollectiongarments', getLastCollectionGarments);

router.get('/getcounts', getCounts);

module.exports = router;