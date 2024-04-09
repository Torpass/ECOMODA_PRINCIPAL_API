import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import garmentModel from '../../models/design/Garment';
import GarmentImagenModel from '../../models/design/GarmentImg';
import GarmentTypeModel from '../../models/design/GarmentType';
import CollectionModel from '../../models/design/Collections';
import SizeModel from '../../models/design/Sizes';
import '../../models/design/associations';
import { sequelize } from "../../config/db";
import GarmentsMaterialsModel from '../../models/design/GarmentsMaterials';

export async function createGarment(req: Request, res: Response) {
  try {
        if (!req.body.imagen) return res.status(400).send('ERROR_GETTING_IMAGES');

        const { garment, collection_id, garment_type_id, size_id } = matchedData(req);

        const numericCollectionId = parseInt(collection_id);
        const numericGarmentTypeId = parseInt(garment_type_id);
        const numericSizeId = parseInt(size_id);
        let imagenesReq = req.body.imagen;
        
        const imagenesArray = imagenesReq.split(' ');
        const pattern: string = imagenesArray.length > 0 ? imagenesArray[imagenesArray.length - 1].trim() : '';
        
        
        const resultTransaction = await sequelize.transaction(async (t: any) => {
            const garmentCreated = await garmentModel.create({
                garment,
                collection_id: numericCollectionId,
                size_id: numericSizeId,
                garment_type_id: numericGarmentTypeId,
                pattern,
            }, { transaction: t });

            const imagenes = imagenesReq.split(' ').map((imagen: string) => {
                return {
                    garment_id: garmentCreated.id,
                    URL: imagen.trim() 
                };
            });
        

            await GarmentImagenModel.bulkCreate(imagenes, { transaction: t });
            return {
                garmentCreated,
                imagenesReq
            };
        });
        
            return res.status(200).send({
                garmentCreated: resultTransaction.garmentCreated,
                garmentImagenes: resultTransaction.imagenesReq
            });
    } catch (err: any) {
        throw err;
        console.log(err);
        return res.status(500).send('Error al crear la prenda');
    }
}

export async function updateGarment(req: Request, res: Response) {
	try {
        const {idgarment} = req.params;
        const { garment, collection_id, size_id, garment_type_id } = matchedData(req);
            
        const garmentUp = await garmentModel.update({
            garment, collection_id, size_id, garment_type_id
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

        const garments = await garmentModel.findOne({
            include: [
                { model: CollectionModel},
                { model: SizeModel},
                { model: GarmentTypeModel},
                { model: GarmentImagenModel}
              ],       
            where: {id: idgarment, activo:1}
        });

        if(!garments) return res.status(404).send('GARMENT_NOT_FOUND');


        return res.status(200).send({garments});

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
            { model: SizeModel},
            { model: GarmentTypeModel},
            { model: GarmentImagenModel} 
            ],
            where: {activo:1}});

        return res.status(200).send({garments});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_GARMENTS');
	}
}

  export async function deleteGarment(req: Request, res: Response) {
	try {
        const {idgarment} = req.params;
            
        await garmentModel.update(
            { activo: false },
            { where: { id: idgarment } }
          );
          await GarmentImagenModel.update(
            { garment_id: null as any},
            { where: { garment_id: idgarment } }
          );
          await GarmentsMaterialsModel.update(
            { garment_id: null as any}, 
            { where: { garment_id: idgarment } }
          );
        

        const garmentDeleted = await garmentModel.findOne({where: {id: idgarment}})

        if(!garmentDeleted) return res.status(404).send('Garment_Not_Found')

        return res.status(200).send({garmentDeleted})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_DELETING_GARMENT');
	}
}

