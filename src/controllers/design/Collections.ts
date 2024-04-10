import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import collectionModel from '../../models/design/Collections';
import GarmentModel from '../../models/design/Garment';
import GarmentImagenModel from '../../models/design/GarmentImg';
import MaterialModel from '../../models/design/Materials';
import SizeModel from '../../models/design/Sizes';
import GarmentTypeModel from '../../models/design/GarmentType';

export async function createCollection(req: Request, res: Response) {
	try {
        const { collection, standard_quantity } = matchedData(req);

        const collectioncred = await collectionModel.create({collection, standard_quantity});

        return res.status(200).send({collectioncred});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_CREATING_COLLECTION');
	}
}

export async function updateCollection(req: Request, res: Response) {
	try {
        const {idcollection} = req.params;
        const { collection, standard_quantity } = matchedData(req);
            
        const collectionUp = await collectionModel.update({
            collection, standard_quantity
        },{
            where: {id: idcollection}
        });

        const collectionUpted = await collectionModel.findOne({where: {id: idcollection}})



        if(!collectionUpted) return res.status(404).send('Collection_Not_Found')

        return res.status(200).send({collectionUpted, collectionUp})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_COLLECTION');
	}
}

export async function getOneCollection(req: Request, res: Response) {
	try {
        const {idcollection} = req.params;

        const collections = await collectionModel.findOne({
            include: [
            { model: GarmentModel, required: false, where: {activo: true},
            include: [
                {
                  model: GarmentImagenModel,
                },
                {
                  model: SizeModel
                },
                {
                  model: GarmentTypeModel
                },
              ],
            },
            ],
            where: {id: idcollection, activo:1}
            
        });

        if(!collections) return res.status(404).send('COLLECTION_NOT_FOUND');


        return res.status(200).send({collections});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_COLLECTION');
	}
}

export async function getAllCollection(_req: Request, res: Response) {
	try {
        const collections = await collectionModel.findAll({
            include: [
                { model: GarmentModel, required: false, where: {activo: true},
                    include: [
                        {
                          model: GarmentImagenModel,
                        },
                      ],}
                ],where: {activo:1},
            });

        return res.status(200).send({collections});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_COLLECTIONS');
	}
}

export async function getLastCollectionGarments(_req: Request, res: Response) {
	try {
        const collections = await collectionModel.findAll({
            order: [['id', 'DESC']],
            limit: 3,
            where: {activo:1}
          });

        const garments = await GarmentModel.findAll({
            order: [['id', 'DESC']],
            limit: 3,
            where: {activo:1}
        });
        const materials = await MaterialModel.findAll({
          order: [['id', 'DESC']],
          limit: 3,
          where: {activo:1}
        });

        return res.status(200).send({collections, garments, materials});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_LAST_COLLECTIONS_AND_GARMENTS');
	}
}

export async function getCounts(_req: Request, res: Response) {
	try {
    const Colecciones = await collectionModel.count({
      where: {activo: 1}
    });
    const Prendas = await GarmentModel.count({
      where: {activo: 1}
    });
    const Materiales = await MaterialModel.count({
      where: {activo: 1}
    });

        return res.status(200).send({Colecciones, Prendas, Materiales});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_COUNTS');
	}
}

export async function deleteCollection(req: Request, res: Response) {
	try {
        const {idcollection} = req.params;
            
        await collectionModel.update(
            { activo: false },
            { where: { id: idcollection } }
          );
        await GarmentModel.update(
            { collection_id: null as any}, 
            { where: { collection_id: idcollection } }
          );
        

        const collectionDeleted = await collectionModel.findOne({where: {id: idcollection}})

        if(!collectionDeleted) return res.status(404).send('Collection_Not_Found')

        return res.status(200).send({collectionDeleted})

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_DELETING_GARMENT');
	}
}