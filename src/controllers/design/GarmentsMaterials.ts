import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import GarmentsMaterialsModel from '../../models/design/GarmentsMaterials';
import '../../models/design/associations';
import GarmentModel from '../../models/design/Garment';
import MaterialModel from '../../models/design/Materials';
import { Op } from 'sequelize';

export async function createGarmentsMaterials(req: Request, res: Response) {
    try {
        const { garmentsMaterials } = req.body; 
        console.log(garmentsMaterials);

        const createdGarmentsMaterials = await Promise.all(garmentsMaterials.map(async (item: any) => {
            const { garment_id, material_id, quantity } = item;

            return await GarmentsMaterialsModel.create({ garment_id, material_id, quantity });
        }));

        return res.status(200).send({ createdGarmentsMaterials });
    } catch (error: any) {
        console.log(error);
        return res.status(500).send('ERROR_CREATING_GARMENTS_MATERIALS');
    }
}

export async function updateGarmentsMaterials(req: Request, res: Response) {
	try {
        const {idgarmentsmaterials} = req.params;
        const { garment_id, material_id, quantity } = matchedData(req);
            
        const garmentsmaterialsUp = await GarmentsMaterialsModel.update({
            garment_id, material_id, quantity
        },{
            where: {id: idgarmentsmaterials}
        });

        const garmentsmaterialsUpted = await GarmentsMaterialsModel.findOne({where: {id: idgarmentsmaterials}})



        if(!garmentsmaterialsUpted) return res.status(404).send('GarmentsMaterials_Not_Found')

        return res.status(200).send({garmentsmaterialsUpted, garmentsmaterialsUp})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_GARMENTS_MATERIALS');
	}
}

export async function getOneGarmentsMaterials(req: Request, res: Response) {
	try {
        const {idgarmentsmaterials} = req.params;

        const garmentsmaterials = await GarmentsMaterialsModel.findAll({
            include: [
                { model: GarmentModel, where: {activo: true}}, 
                { model: MaterialModel}
              ],   
            where: {garment_id: idgarmentsmaterials}
        });

        if(garmentsmaterials.length === 0) return res.status(404).send('GARMENTS_MATERIALS_NOT_FOUND');

        return res.status(200).send({garmentsmaterials});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_GARMENTS_MATERIALS');
	}
}

export async function getUnusedGarmentsMaterials(req: Request, res: Response) {
	try {
        const {idgarmentsmaterials} = req.params;

        const garmentsmaterials = await GarmentsMaterialsModel.findAll({
            include: [
                { model: GarmentModel, where: {activo: true}}, 
                { model: MaterialModel}
              ],   
            where: {garment_id: {[Op.ne]: idgarmentsmaterials}}
        });

        if(garmentsmaterials.length === 0) return res.status(404).send('GARMENTS_MATERIALS_NOT_FOUND');


        return res.status(200).send({garmentsmaterials});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_GARMENTS_MATERIALS');
	}
}

export async function getAllGarmentsMaterials(_req: Request, res: Response) {
	try {
        const garmentsmaterials = await GarmentsMaterialsModel.findAll({
            include: [
                { model: GarmentModel, where: {activo: true}},
                { model: MaterialModel}
              ]
            });

        return res.status(200).send({garmentsmaterials});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_GARMENTS_MATERIALS');
	}
}

export async function deleteGarmentsMaterials(req: Request, res : Response) {
    try{
        const {idgarmentsmaterials} = req.params;
        
        await GarmentsMaterialsModel.destroy({
            where: {
              id: idgarmentsmaterials
            },
          });
        return res.status(200).send('GARMENTS_MATERIALS_DELETED');
    }catch(error: any){
        console.log(error);
        return res.status(500).send('ERROR_DELETING_GARMENTS_MATERIALS');
    }
}