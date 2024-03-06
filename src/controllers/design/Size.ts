import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import  SizeModel  from '../../models/design/Sizes'

export async function createSize (req: Request, res: Response) {
	try {
        const { size } = matchedData(req);

        const sizeCreate = await SizeModel.create({ size });

        return res.status(200).send({sizeCreate});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_CREATING_MATERIAL');
	}
}

export async function updateSize(req: Request, res: Response) {
	try {
        const {idsize} = req.params;
        const { size } = matchedData(req);
            
        const sizeUp = await SizeModel.update({
            size
        },{
            where: {id: idsize}
        });

        const sizeUpted = await SizeModel.findOne({where: {id: idsize}})

        if(!sizeUpted) return res.status(404).send('Size_Not_Found')

        return res.status(200).send({sizeUpted, sizeUp})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_SIZES');
	}
}

export async function getOneSize(req: Request, res: Response) {
	try {
        const {idsize} = req.params;

        const size = await SizeModel.findOne({
            where: {id: idsize}
        });

        if(!size) return res.status(404).send('SIZE_NOT_FOUND');


        return res.status(200).send({size});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_SIZE');
	}
}

export async function getAllSize (_req: Request, res: Response) {
	try {
        const sizes = await SizeModel.findAll();

        return res.status(200).send({sizes});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_SIZES');
	}
}

export async function deleteSize (req: Request, res : Response) {
    try{
        const {idsize} = req.params;
        
        await SizeModel.destroy({
            where: {
              id: idsize
            },
          });
        return res.status(200).send('SIZE_DELETED');
    }catch(error: any){
        console.log(error);
        return res.status(500).send('ERROR_DELETING_SIZE');
    }
}