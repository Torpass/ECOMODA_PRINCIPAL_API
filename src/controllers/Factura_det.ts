import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import InventoryModel from '../models/sells/factura_det';
import Factura_det_Model from '../models/sells/factura_det';


export async function createfactura(req: Request, res: Response) {
	try {
        const {product_ID} = matchedData(req);
        const {venta_cab} = matchedData(req)
        const {quantity} = matchedData(req)
        const {price} = matchedData(req)
        const {discount} = matchedData(req)
        console.log(product_ID);
        // const storecred = await InventoryModel.create({name});
        const fact_cred = await InventoryModel.create({product_ID, venta_cab, quantity, price, discount})
        return res.status(200).send({fact_cred});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_CREATING_FACTURA');
	}
}

export async function updatefactura(req: Request, res: Response) {
	try {
        const product_ID = req.params['productoID'];
        const venta_cab = req.params['ventaCabeceraID'];
        const {quantity} = matchedData(req)
        const {price} = matchedData(req)
        const {discount} = matchedData(req)
        
            
        const posup = await Factura_det_Model.update({
            quantity, price, discount
        },{
            where: {product_ID: product_ID, venta_cab:venta_cab} 
        });

        //creo que hice la vaina 2 veces xdxd, por si acaso aca este comentario
        const posupted = await Factura_det_Model.findOne({where: {product_ID: product_ID}})
        if(!posupted) return res.status(404).send('Factura_Not_Found')

        return res.status(200).send({posupted, posup})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_Factura');
	}
}

export async function getoneFactura(req: Request, res: Response) {
	try {
        const product_ID = req.params['productoID'];
        const venta_cab = req.params['ventaCabeceraID'];

        
        const Factura = await Factura_det_Model.findOne({
            where: {product_ID: product_ID, venta_cab:venta_cab}
        });

        if(!Factura) return res.status(404).send('FACTURA_NOT_FOUND');


        return res.status(200).send({Factura});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_FACTURA');
	}
}

export async function getAllFactura(_req: Request, res: Response) {
	try {
        const facturas = await Factura_det_Model.findAll();

        return res.status(200).send({facturas});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_FACTURAS');
	}
}

export async function deleteFactura(req: Request, res : Response) {
    try{
        const product_ID = req.params['productoID'];
        const venta_cab = req.params['ventaCabeceraID'];
        
        await InventoryModel.destroy({
            where: {
              product_ID: product_ID,
              venta_cab: venta_cab
            },
          });
        return res.status(500).send('FACTURA_DELETED');
    }catch(error: any){
        console.log(error);
        return res.status(500).send('ERROR_DELETING_FACTURA');
    }
    
}