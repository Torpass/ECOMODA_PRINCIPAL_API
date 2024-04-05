import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import garmentModel from '../../models/design/Garment';
import GarmentImagenModel from '../../models/design/GarmentImg';
import GarmentTypeModel from '../../models/design/GarmentType';
import CollectionModel from '../../models/design/Collections';
import SizeModel from '../../models/design/Sizes';
import '../../models/design/associations';
import { sequelize } from "../../config/db";

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
                pattern
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
        const { idgarment } = req.params;
        const { garment, collection_id, size_id, garment_type_id } = matchedData(req);

        const existingGarment = await garmentModel.findOne({ where: { id: idgarment } });
        if (!existingGarment) {
            return res.status(404).send('Garment_Not_Found');
        }

        const updatedGarment = await garmentModel.update({
            garment, collection_id, size_id, garment_type_id
        }, {
            where: { id: idgarment }
        });

        if (updatedGarment[0] === 0) {
            return res.status(500).send('Failed to update garment');
        }

        const garmentUpdated = await garmentModel.findOne({ where: { id: idgarment } });

        return res.status(200).send({ garmentUpdated });
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
                { model: SizeModel},
                { model: GarmentTypeModel},
                { model: GarmentImagenModel}
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
            { model: SizeModel},
            { model: GarmentTypeModel},
            { model: GarmentImagenModel} 
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