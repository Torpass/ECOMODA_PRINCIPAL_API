import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import InventoryModel from '../models/sells/inventory_m';


export async function createinventory(req: Request, res: Response) {
	try {
        const {store_id} = matchedData(req);
        const {product_id} = matchedData(req)
        const {quantity} = matchedData(req)
        console.log(store_id);
        // const storecred = await InventoryModel.create({name});
        const inven_cred = await InventoryModel.create({store_id, product_id, quantity})
        return res.status(200).send({inven_cred});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_CREATING_INVENTORY');
	}
}

export async function updateinventory(req: Request, res: Response) {
	try {
        const store_id = req.params['idstore'];
        const product_id = req.params['product_id'];
        const {quantity} = matchedData(req)
            
        const posup = await InventoryModel.update({
            quantity
        },{
            where: {store_id: store_id, product_id:product_id} 
        });

        const posupted = await InventoryModel.findOne({where: {store_id: store_id}})



        if(!posupted) return res.status(404).send('Store_Not_Found')

        return res.status(200).send({posupted, posup})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_INVENTORY');
	}
}

export async function getoneinventory(req: Request, res: Response) {
	try {
        const store_id = req.params['idstore'];
        const product_id = req.params['product_id'];
        const Inventory = await InventoryModel.findOne({
            where: {store_id: store_id, product_id:product_id}
        });

        if(!Inventory) return res.status(404).send('INVENTORY_NOT_FOUND');


        return res.status(200).send({Inventory});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_INVENTORIES');
	}
}

export async function getAllInventories(_req: Request, res: Response) {
	try {
        const inventories = await InventoryModel.findAll();

        return res.status(200).send({inventories});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_iNVENTORIES');
	}
}

export async function deleteinventory(req: Request, res : Response) {
    try{
        const store_id = req.params['idstore'];
        const product_id = req.params['product_id'];
        
        await InventoryModel.destroy({
            where: {
              store_id: store_id,
              product_id: product_id
            },
          });
        return res.status(500).send('INVENTORY_DELETED');
    }catch(error: any){
        console.log(error);
        return res.status(500).send('ERROR_DELETING_INVENTORY');
    }
    
}