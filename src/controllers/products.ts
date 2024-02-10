import { Request, Response } from 'express';
import ProductModel from '../models/produts';

export async function createProduct(req: Request, res: Response) {
	try {
        const {id} = req.body;

        const product = await ProductModel.create({id})

        if(!product) return res.status(400).send('ERROR_CREATING_PRODUCT');


		return res.status(200).send({ sucsses: product });
	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_PRODUCTS');
	}
}
