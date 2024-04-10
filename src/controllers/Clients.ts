import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import ClientModel from '../models/sells/client';


export async function createclient(req: Request, res: Response) {   
	try {
        const {id} = matchedData(req);
        const {name} = matchedData(req)
        // const storecred = await InventoryModel.create({name});
        const client_cred = await ClientModel.create({id, name})
        return res.status(200).send({client_cred});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_CREATING_COSTUMERS');
	}
}

export async function updateclient(req: Request, res: Response) {
	try {
        const id = req.params['id'];
        const {name} = matchedData(req);
        console.log(id);
        const posup = await ClientModel.update({
            name
        },{
            where: {id} 
        });

        const posupted = await ClientModel.findOne({where: {id: id}})



        if(!posupted) return res.status(404).send('ID_Not_Found')

        return res.status(200).send({posupted, posup})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_COSTUMER');
	}
}

export async function getoneclient(req: Request, res: Response) {
	try {
        const id = req.params['id'];
        // const name = req.params['nombre'];
        const client = await ClientModel.findOne({
            where: {id:id}
        });

        if(!client) return res.status(404).send('ID_NOT_FOUND');


        return res.status(200).send({client});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_COSTUMERS');
	}
}

export async function getAllClients(_req: Request, res: Response) {
	try {
        const clients = await ClientModel.findAll();

        return res.status(200).send({clients});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_COSTUMERS');
	}
}

export async function deleteclient(req: Request, res : Response) {
    try{
        const id = req.params['id'];
        const name = req.params['name'];
        
        await ClientModel.destroy({
            where: {
              id: id,
              name: name
            },
          });
        return res.status(500).send('COSTUMER_DELETED');
    }catch(error: any){
        console.log(error);
        return res.status(500).send('ERROR_DELETING_COSTUMER');
    }
    
}