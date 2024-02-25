import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import SupplierModel from '../models/pursheses/suppliers';

export async function createSupplier(req: Request, res: Response) {
	try {
        const {name, direction, phone, email, rif} = matchedData(req);

        const supplierCreated = await SupplierModel.create({
            name,
            direction,
            phone,
            email,
            rif
        });

        return res.status(200).send({supplierCreated});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_SUPPLIERS');
	}
}

export async function getAllSuppliers(_req: Request, res: Response) {
	try {
        const suppliers = await SupplierModel.findAll();

        return res.status(200).send({suppliers});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_SUPPLIERS');
	}
}

export async function getAllSupplierById(req: Request, res: Response) {
	try {
        const {idSupplier} = req.params;

        const supplier = await SupplierModel.findOne({
            where: {id: idSupplier}
        });

        if(!supplier) return res.status(404).send('SUPPLIER_NOT_FOUND');


        return res.status(200).send({supplier});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_SUPPLIERS');
	}
}

export async function updateSupplier(req: Request, res: Response) {
	try {
        const {idSupplier} = req.params;
        const { name, direction, phone, email, rif} = matchedData(req);
            
        const supplierUpdate = await SupplierModel.update({
            name,
            direction,
            phone,
            email,
            rif
        },{
            where: {id: idSupplier}
        });

        const supplierUpdated = await SupplierModel.findOne({where: {id: idSupplier}})



        if(!supplierUpdated) return res.status(404).send('SUPPLIER_NOT_FOUND')

        return res.status(200).send({supplierUpdated, supplierUpdate})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_SUPPLIERS');
	}
}

