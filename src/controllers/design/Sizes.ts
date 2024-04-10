import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import sizeModel from '../../models/design/Sizes';
import GarmentModel from '../../models/design/Garment';

export async function createSize(req: Request, res: Response) {
	try {
        const { size } = matchedData(req);

        const sizecred = await sizeModel.create({size});

        return res.status(200).send({sizecred});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_CREATING_SIZE');
	}
}

export async function updateSize(req: Request, res: Response) {
	try {
        const {idsize} = req.params;
        const { size } = matchedData(req);
            
        const sizeUp = await sizeModel.update({
            size
        },{
            where: {id: idsize}
        });

        const sizeUpted = await sizeModel.findOne({where: {id: idsize}})



        if(!sizeUpted) return res.status(404).send('Material_Not_Found')

        return res.status(200).send({sizeUpted, sizeUp})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_SIZE');
	}
}

export async function getOneSize(req: Request, res: Response) {
	try {
        const {idsize} = req.params;

        const size = await sizeModel.findOne({
            where: {id: idsize, activo: 1}
        });

        if(!size) return res.status(404).send('SIZE_NOT_FOUND');


        return res.status(200).send({size});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_SIZE');
	}
}

export async function getAllSizes(_req: Request, res: Response) {
	try {
        const sizes = await sizeModel.findAll({
            where: {activo: 1}
        });

        return res.status(200).send({sizes});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_SIZES');
	}
}

export async function deleteSize(req: Request, res: Response) {
	try {
        const {idsize} = req.params;
            
        await sizeModel.update(
            { activo: false },
            { where: { id: idsize } }
          );
        await GarmentModel.update(
            { size_id: null as any}, 
            { where: { size_id: idsize } }
          );
        

        const sizeDeleted = await sizeModel.findOne({where: {id: idsize}})

        if(!sizeDeleted) return res.status(404).send('Size_Not_Found')

        return res.status(200).send({sizeDeleted})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_DELETING_SIZE');
	}
}