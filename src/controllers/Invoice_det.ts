import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import InventoryModel from '../models/sells/Invoice_det';
import Factura_det_Model from '../models/sells/Invoice_det';


export async function createinvoice(req: Request, res: Response) {
	try {
        const {inventory_id} = matchedData(req);
        const {invoice_id} = matchedData(req)
        const {quantity} = matchedData(req)
        const {price} = matchedData(req)
        const {discount} = matchedData(req)
        console.log(inventory_id);
        // const storecred = await InventoryModel.create({name});
        const fact_cred = await InventoryModel.create({inventory_id, invoice_id, quantity, price, discount})
        return res.status(200).send({fact_cred});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_CREATING_FACTURA');
	}
}

export async function updateinvoice(req: Request, res: Response) {
	try {
        const inventory_id = req.params['inventory_id'];
        const invoice_id = req.params['invoice_id'];
        const {quantity} = matchedData(req)
        const {price} = matchedData(req)
        const {discount} = matchedData(req)
        
            
        const posup = await Factura_det_Model.update({
            quantity, price, discount
        },{
            where: {inventory_id: inventory_id, invoice_id:invoice_id} 
        });

        //creo que hice la vaina 2 veces xdxd, por si acaso aca este comentario
        const posupted = await Factura_det_Model.findOne({where: {inventory_id: inventory_id}})
        if(!posupted) return res.status(404).send('Factura_Not_Found')

        return res.status(200).send({posupted, posup})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_Factura');
	}
}

export async function getoneInvoice(req: Request, res: Response) {
	try {
        const inventory_id = req.params['inventory_id'];
        const invoice_id = req.params['invoice_id'];

        
        const Factura = await Factura_det_Model.findOne({
            where: {inventory_id: inventory_id, invoice_id:invoice_id}
        });

        if(!Factura) return res.status(404).send('FACTURA_NOT_FOUND');


        return res.status(200).send({Factura});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_FACTURA');
	}
}

export async function getAllInvoices(_req: Request, res: Response) {
	try {
        const Invoices = await Factura_det_Model.findAll();

        return res.status(200).send({Invoices});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_FACTURAS');
	}
}

export async function deleteInvoice(req: Request, res : Response) {
    try{
        const inventory_id = req.params['inventory_id'];
        const invoice_id = req.params['invoice_id'];
        
        await InventoryModel.destroy({
            where: {
                inventory_id: inventory_id,
                invoice_id: invoice_id
            },
          });
        return res.status(500).send('FACTURA_DELETED');
    }catch(error: any){
        console.log(error);
        return res.status(500).send('ERROR_DELETING_FACTURA');
    }
    
}