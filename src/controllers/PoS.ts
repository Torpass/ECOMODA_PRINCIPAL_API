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