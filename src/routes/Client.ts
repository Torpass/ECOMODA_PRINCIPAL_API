import express from 'express';
import {createclient, updateclient, getoneclient, getAllClients, deleteclient} from '../controllers/Clients';
import { clientvalt } from '../validators/cValidator';
const router = express.Router();

router.post('/createclient', clientvalt, createclient);

router.put('/updateclient/:id',clientvalt,          
    updateclient
);

router.get('/getoneclient/:id', getoneclient);

router.get('/getAllClients', getAllClients);

router.delete('/deleteclient/:id',
    deleteclient
);
module.exports = router;
