import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import materialModel from '../../models/design/Materials';

export async function createMaterial(req: Request, res: Response) {
	try {
        const { material, unit, description } = matchedData(req);

        const materialcred = await materialModel.create({material, unit, description});

        return res.status(200).send({materialcred});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_CREATING_MATERIAL');
	}
}

export async function updateMaterial(req: Request, res: Response) {
	try {
        const {idmaterial} = req.params;
        const { material, unit, description } = matchedData(req);
            
        const materialUp = await materialModel.update({
            material, unit, description
        },{
            where: {id: idmaterial}
        });

        const materialUpted = await materialModel.findOne({where: {id: idmaterial}})



        if(!materialUpted) return res.status(404).send('Material_Not_Found')

        return res.status(200).send({materialUpted, materialUp})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_MATERIALS');
	}
}

export async function getOneMaterial(req: Request, res: Response) {
	try {
        const {idmaterial} = req.params;

        const material = await materialModel.findOne({
            where: {id: idmaterial}
        });

        if(!material) return res.status(404).send('MATERIAL_NOT_FOUND');


        return res.status(200).send({material});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_MATERIAL');
	}
}

export async function getAllMaterials(_req: Request, res: Response) {
	try {
        const materials = await materialModel.findAll();

        return res.status(200).send({materials});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_MATERIALS');
	}
}

export async function deleteMaterial(req: Request, res : Response) {
    try{
        const {idmaterial} = req.params;
        
        await materialModel.destroy({
            where: {
              id: idmaterial
            },
          });
        return res.status(200).send('MATERIAL_DELETED');
    }catch(error: any){
        console.log(error);
        return res.status(500).send('ERROR_DELETING_MATERIAL');
    }
}