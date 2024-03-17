import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import Factura_Cabe_Model from '../models/sells/factura_cabecera';

export async function createinvoce(req: Request, res: Response) {
	try {
        const {customer_id} = matchedData(req);
        const Factura_Cabe_cred = await Factura_Cabe_Model.create({customer_id});

        return res.status(200).send({Factura_Cabe_cred});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_CREATING_INVOICE_HEAD');
	}
}

export async function updateinvoice(req: Request, res: Response) {
	try {
        const {id} = req.params;
        const {customer_id} = matchedData(req);
            
        const inup = await Factura_Cabe_Model.update({
            customer_id
        },{
            where: {id: id}
        });

        const invupted = await Factura_Cabe_Model.findOne({where: {id: this.id}})



        if(!invupted) return res.status(404).send('Invoice_Not_Found')

        return res.status(200).send({invupted, inup})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_INVOICE');
	}
}

export async function getoneInvoice(req: Request, res: Response) {
	try {
        const {id} = req.params;

        const invoice = await Factura_Cabe_Model.findOne({
            where: {id: id}
        });

        if(!invoice) return res.status(404).send('INVOICE_NOT_FOUND');


        return res.status(200).send({invoice});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_INVOICES');
	}
}

export async function getAllINVOICE(_req: Request, res: Response) {
	try {
        const invoice = await Factura_Cabe_Model.findAll();

        return res.status(200).send({invoice});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_INVOICE');
	}
}

export async function deletgetAllINVOICE(req: Request, res : Response) {
    try{
        const {id} = req.params;
        
        await Factura_Cabe_Model.destroy({
            where: {
              id: id
            },
          });
        return res.status(200).send('INVOICE_DELETED');
    }catch(error: any){
        console.log(error);
        return res.status(500).send('ERROR_DELETING_INVOICE');
    }
    
}

