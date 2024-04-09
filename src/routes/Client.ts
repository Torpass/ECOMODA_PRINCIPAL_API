import express from 'express';
import {createclient, updateclient, getoneclient, getAllClients, deleteclient} from '../controllers/Clients';
const router = express.Router();

router.post('/createclient',
            //aqui va el validador
            createclient
);

router.put('/updateclient/:id',
           
    updateclient
);

router.get('/getoneclient/:id', getoneclient);

router.get('/getAllClients', getAllClients);

router.delete('/deleteclient/:id',
    deleteclient
);
module.exports = router;