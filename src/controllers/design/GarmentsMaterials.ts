import { Request, Response } from 'express';
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
        const { quantity } = req.body;   
        const garmentsmaterialsUpted = await GarmentsMaterialsModel.update(
            { quantity },
            { 
                where: { id: idgarmentsmaterials },
                returning: true 
            }
        );
    
        if(!garmentsmaterialsUpted) return res.status(404).send('Garment_Material_Not_Found')
            const garmentsmaterialsUp = await GarmentsMaterialsModel.findOne({where: {id: idgarmentsmaterials}})
        return res.status(200).send({garmentsmaterialsUpted, garmentsmaterialsUp})
    
    } catch (error: any) {
        console.log(error);
        return res.status(500).send('ERROR_DELETING_GARMENT_MATERIAL');
    }
}



export async function getOneGarmentsMaterials(req: Request, res: Response) {
	try {
        const {idgarmentsmaterials} = req.params;

        const garmentsMaterials = await GarmentsMaterialsModel.findAll({
            include: [
                { model: GarmentModel, where: {activo: true}}, 
                { model: MaterialModel}
              ],   
            where: {garment_id: idgarmentsmaterials, activo: 1}
        });

        if(garmentsMaterials.length === 0) return res.status(404).send('GARMENTS_MATERIALS_NOT_FOUND');

        return res.status(200).send({garmentsMaterials});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_GARMENTS_MATERIALS');
	}
}

export async function getUnusedGarmentsMaterials(req: Request, res: Response) {
	try {
        const { idgarmentsmaterials } = req.params;

        // Primero, obtenemos todos los ids de los materiales que ya están asignados al garment_id en la tabla GarmentMaterials
        const usedMaterials = await GarmentsMaterialsModel.findAll({
            attributes: ['material_id'],
            where: { garment_id: idgarmentsmaterials, activo: 1 },
            raw: true
        });

        // Extraemos solo los ids de los materiales usados
        const usedMaterialIds = usedMaterials.map(material => material.material_id);

        // Luego, buscamos en la tabla Materials aquellos que no están en la lista de usados
        const unusedMaterials = await MaterialModel.findAll({
            where: { id: { [Op.notIn]: usedMaterialIds, activo: 1 } }
        });

        if(unusedMaterials.length === 0) return res.status(404).send('MATERIALS_NOT_FOUND');

        return res.status(200).send({unusedMaterials});

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
                { model: MaterialModel, where: {activo: 1}}
              ], where: {activo: 1}
            });

        return res.status(200).send({garmentsmaterials});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_GARMENTS_MATERIALS');
	}
}

export async function deleteGarmentsMaterials(req: Request, res: Response) {
	try {
        const {idgarmentsmaterials} = req.params;
            
        await GarmentsMaterialsModel.update(
            { activo: false },
            { where: { id: idgarmentsmaterials } }
          );
        

        const garmentMaterialDeleted = await GarmentsMaterialsModel.findOne({where: {id: idgarmentsmaterials}})

        if(!garmentMaterialDeleted) return res.status(404).send('Garment_Material_Not_Found')

        return res.status(200).send({garmentMaterialDeleted})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_DELETING_GARMENT_MATERIAL');
	}
}