import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import ClientModel from '../models/sells/client';


export async function createclient(req: Request, res: Response) {   
	try {
        const {id} = matchedData(req);
        const {name} = matchedData(req)
        console.log(id);
        // const storecred = await InventoryModel.create({name});
        const client_cred = await ClientModel.create({id, name})
        return res.status(200).send({client_cred});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_CREATING_CLIENT');
	}
}

export async function updateclient(req: Request, res: Response) {
	try {
        const id = req.params['id'];
        const {name} = matchedData(req);
            
        const posup = await ClientModel.update({
            name:name
        },{
            where: {id} 
        });

        const posupted = await ClientModel.findOne({where: {id: id}})



        if(!posupted) return res.status(404).send('ID_Not_Found')

        return res.status(200).send({posupted, posup})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_CLIENT');
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
		return res.status(500).send('ERROR_GETTING_CLIENTS');
	}
}

export async function getAllClients(_req: Request, res: Response) {
	try {
        const clients = await ClientModel.findAll();

        return res.status(200).send({clients});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_CLIENTS');
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
        return res.status(500).send('CLIENT_DELETED');
    }catch(error: any){
        console.log(error);
        return res.status(500).send('ERROR_DELETING_CLIENT');
    }
    
}