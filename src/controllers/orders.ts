import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import SupplierModel from '../models/pursheses/suppliers';

export async function createorder(req: Request, res: Response) {
	try {
        const {fecha_orden, unidad_de_medida, cantidad} = matchedData(req);

        const ordercreated = await SupplierModel.create({
            fecha_orden,
            unidad_de_medida,
            cantidad,
        });

        return res.status(200).send({ordercreated});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_ORDERS');
	}
}

export async function getallorders(_req: Request, res: Response) {
	try {
        const orders = await SupplierModel.findAll();

        return res.status(200).send({orders});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_ORDERS');
	}
}

export async function getallordersByid(req: Request, res: Response) {
	try {
        const {idorder} = req.params;

        const order = await SupplierModel.findOne({
            where: {id: idorder}
        });

        if(!order) return res.status(404).send('ORDER_NOT_FOUND');


        return res.status(200).send({order});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_ORDERS');
	}
}

export async function updateorder(req: Request, res: Response) {
	try {
        const {idorder} = req.params;
        const {fecha_orden, unidad_de_medida, cantidad} = matchedData(req);
            
        const orderupdate = await SupplierModel.update({
            fecha_orden,
            unidad_de_medida,
            cantidad,
        },{
            where: {id: idorder}
        });

        const orderupdated = await SupplierModel.findOne({where: {id: idorder}})



        if(!orderupdated) return res.status(404).send('ORDER_NOT_FOUND')

        return res.status(200).send({orderupdated, orderupdate})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_ORDERS');
	}
}

