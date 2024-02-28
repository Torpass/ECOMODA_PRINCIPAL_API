import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import materialModel from '../../models/design/Materials';
import MaterialModel from '../../models/design/Materials';

export async function createMaterial(req: Request, res: Response) {
	try {
        const { material, unit, description } = matchedData(req);
        console.log(material);
        const materialcred = await materialModel.create({material, unit, description});

        return res.status(200).send({materialcred});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_CREATING_MATERIAL');
	}
}

export async function updateMaterial(req: Request, res: Response) {
	try {
        const {idMaterial} = req.params;
        const { material, unit, description } = matchedData(req);
            
        const materialUp = await materialModel.update({
            material, unit, description
        },{
            where: {id: idMaterial}
        });

        const Materialupted = await materialModel.findOne({where: {id: idMaterial}})



        if(!Materialupted) return res.status(404).send('Material_Not_Found')

        return res.status(200).send({Materialupted, materialUp})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_MATERIALS');
	}
}

export async function getoneMaterial(req: Request, res: Response) {
	try {
        const {idMaterial} = req.params;

        const material = await MaterialModel.findOne({
            where: {id: idMaterial}
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
        const {idMaterial} = req.params;
        
        await materialModel.destroy({
            where: {
              id: idMaterial
            },
          });
        return res.status(500).send('MATERIAL_DELETED');
    }catch(error: any){
        console.log(error);
        return res.status(500).send('ERROR_DELETING_MATERIAL');
    }
}