import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import garmentModel from '../../models/design/Garment';
import CollectionModel from '../../models/design/Collections';
import SizeModel from '../../models/design/Sizes';
import '../../models/design/associations';

export async function createGarment(req: Request, res: Response) {
	try {
        const { garment, collection_id, size_id, pattern } = matchedData(req);

        const garmentcred = await garmentModel.create({garment, collection_id, size_id, pattern});

        return res.status(200).send({garmentcred});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_CREATING_GARMENT');
	}
}

export async function updateGarment(req: Request, res: Response) {
	try {
        const {idgarment} = req.params;
        const { garment, collection_id, size_id, pattern } = matchedData(req);
            
        const garmentUp = await garmentModel.update({
            garment, collection_id, size_id, pattern
        },{
            where: {id: idgarment}
        });

        const garmentUpted = await garmentModel.findOne({where: {id: idgarment}})



        if(!garmentUpted) return res.status(404).send('Garment_Not_Found')

        return res.status(200).send({garmentUpted, garmentUp})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_GARMENT');
	}
}

export async function getOneGarment(req: Request, res: Response) {
	try {
        const {idgarment} = req.params;

        const garment = await garmentModel.findOne({
            include: [
                { model: CollectionModel},
                { model: SizeModel}
              ],       
            where: {id: idgarment}
        });

        if(!garment) return res.status(404).send('GARMENT_NOT_FOUND');


        return res.status(200).send({garment});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_GARMENT');
	}
}

export async function getAllGarments(_req: Request, res: Response) {
	try {
        const garments = await garmentModel.findAll({
            include: [
            { model: CollectionModel},
            { model: SizeModel}
          ]});

        return res.status(200).send({garments});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_GARMENTS');
	}
}

export async function deleteGarment(req: Request, res : Response) {
    try{
        const {idgarment} = req.params;
        
        await garmentModel.destroy({
            where: {
              id: idgarment
            },
          });
        return res.status(200).send('GARMENT_DELETED');
    }catch(error: any){
        console.log(error);
        return res.status(500).send('ERROR_DELETING_GARMENT');
    }
}