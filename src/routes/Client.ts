import express from 'express';
import {createclient, updateclient, getoneclient, getAllClients, deleteclient} from '../controllers/Clients';
const router = express.Router();

router.post('/createclient',
            //aqui va el validador
            createclient
);

router.put('/updatestore/:cedula',
           
    updateclient
);

router.get('/getoneclient/:cedula', getoneclient);

router.get('/getAllClients', getAllClients);

router.delete('/deleteclient/:cedula',
    deleteclient
);
module.exports = router;