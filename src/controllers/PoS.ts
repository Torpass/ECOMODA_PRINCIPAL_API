import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import StoreModel from '../models/sells/store';

export async function createstore(req: Request, res: Response) {
	try {
        const {name} = matchedData(req);
        console.log(name);
        const storecred = await StoreModel.create({name});

        return res.status(200).send({storecred});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_CREATING_STORE');
	}
}

export async function updatestore(req: Request, res: Response) {
	try {
        const {idstore} = req.params;
        const { name} = matchedData(req);
            
        const posup = await StoreModel.update({
            name
        },{
            where: {id: idstore}
        });

        const posupted = await StoreModel.findOne({where: {id: idstore}})



        if(!posupted) return res.status(404).send('Store_Not_Found')

        return res.status(200).send({posupted, posup})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_STORES');
	}
}

export async function getonetores(req: Request, res: Response) {
	try {
        const {idstore} = req.params;

        const store = await StoreModel.findOne({
            where: {id: idstore}
        });

        if(!store) return res.status(404).send('STORE_NOT_FOUND');


        return res.status(200).send({store});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_STORES');
	}
}

export async function getAllStores(_req: Request, res: Response) {
	try {
        const stores = await StoreModel.findAll();

        return res.status(200).send({stores});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_STORES');
	}
}

export async function deletestore(req: Request, res : Response) {
    try{
        const {idstore} = req.params;
        
        await StoreModel.destroy({
            where: {
              id: idstore
            },
          });
        return res.status(500).send('STORE_DELETED');
    }catch(error: any){
        console.log(error);
        return res.status(500).send('ERROR_DELETING_STORE');
    }
    
}