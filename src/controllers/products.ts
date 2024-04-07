import { Request, Response } from 'express';
import ProductModel from '../models/production/products';

export async function createProduct(req: Request, res: Response) {
	try {
        const {name} = matchedData(req);

        const product = await ProductModel.create({name});


        if(!product) return res.status(400).send('ERROR_CREATING_PRODUCT');

		return res.status(200).send({ sucsses: product });
	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_PRODUCTS');
	}
}

export async function updateProduct(req: Request, res: Response) {
	try {
        const {name} = matchedData(req);

        const product = await ProductModel.update({name});


        if(!product) return res.status(404).send('ERROR_update_PRODUCT');

		return res.status(200).send({ sucsses: product });
	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_update_PRODUCTS');
	}
}

export async function getoneProduct(req: Request, res: Response) {
	try {
        const {name} = matchedData(req);

        const product = await ProductModel.findOne({where: {name: name}});


        if(!product) return res.status(404).send('PRODUCT_NOT_FOUND');

		return res.status(200).send({ sucsses: product });
	} catch (error: any) {
		console.log(error);
		return res.status(500).send('PRODUCT_NOT_FOUND');
	}
}


export async function getAllProduct(req: Request, res: Response) {
	try {
        const {name} = matchedData(req);

        const product = await ProductModel.findAll();


        if(!product) return res.status(404).send('PRODUCT_NOT_FOUND');

		return res.status(200).send({ sucsses: product });
	} catch (error: any) {
		console.log(error);
		return res.status(500).send('PRODUCT_NOT_FOUND');
	}
}


export async function deleteProduct(req: Request, res: Response) {
	try {
        const {name} = matchedData(req);

        const product = await ProductModel.destroy({ where: {
			name : name
		}});



		return res.status(500).send('Product_DELETED');
	} catch (error: any) {
		console.log(error);
		return res.status(500).send('PRODUCT_NOT_FOUND');
	}
}