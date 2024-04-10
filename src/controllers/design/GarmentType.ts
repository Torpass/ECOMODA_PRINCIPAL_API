import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import GarmentType from '../../models/design/GarmentType';
import GarmentTypeModel from '../../models/design/GarmentType';
import GarmentModel from '../../models/design/Garment';

export async function createGarmentType (req: Request, res: Response) {
	try {
        const { type } = matchedData(req);

        const typeCreate = await GarmentType.create({ type });

        return res.status(200).send({typeCreate});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_CREATING_TYPE');
	}
}

export async function updateGarmentType(req: Request, res: Response) {
	try {
        const {idtype} = req.params;
        const { type } = matchedData(req);
            
        const typeUp = await GarmentType.update({
            type
        },{
            where: {id: idtype}
        });

        const typeUpted = await GarmentType.findOne({where: {id: idtype}})

        if(!typeUpted) return res.status(404).send('Type_Not_Found')

        return res.status(200).send({typeUpted, typeUp})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_TYPE');
	}
}

export async function getOneGarmentType(req: Request, res: Response) {
	try {
        const {idtype} = req.params;

        const type = await GarmentType.findOne({
            where: {id: idtype, activo: 1}
        });

        if(!type) return res.status(404).send('TYPE_NOT_FOUND');


        return res.status(200).send({type});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_TYPE');
	}
}

export async function getAllGarmentType (_req: Request, res: Response) {
	try {
        const types = await GarmentType.findAll({
            where: {activo: 1}
        });
        

        return res.status(200).send({types});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_TYPES');
	}
}

export async function deleteGarmentType(req: Request, res: Response) {
	try {
        const {idtype} = req.params;
            
        await GarmentTypeModel.update(
            { activo: false },
            { where: { id: idtype } }
          );
        await GarmentModel.update(
            { garment_type_id: null as any}, 
            { where: { garment_type_id: idtype } }
          );
        

        const garmentTypeDeleted = await GarmentTypeModel.findOne({where: {id: idtype}})

        if(!garmentTypeDeleted) return res.status(404).send('Garment_Type_Not_Found')

        return res.status(200).send({garmentTypeDeleted})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_DELETING_GARMENT_TYPE');
	}
}