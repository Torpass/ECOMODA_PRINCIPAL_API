import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import collectionModel from '../../models/design/Collections';
import GarmentModel from '../../models/design/Garment';
import GarmentImagenModel from '../../models/design/GarmentImg';

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

        const collection = await collectionModel.findOne({
            include: [
            { model: GarmentModel,
            include: [
                {
                  model: GarmentImagenModel,
                },
              ],
            },
            ],
            where: {id: idcollection}
            
        });

        if(!collection) return res.status(404).send('COLLECTION_NOT_FOUND');


        return res.status(200).send({collection});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_COLLECTION');
	}
}

export async function getAllCollection(_req: Request, res: Response) {
	try {
        const collections = await collectionModel.findAll({
            include: [
                { model: GarmentModel,
                    include: [
                        {
                          model: GarmentImagenModel,
                        },
                      ],}
                ],
            });

        return res.status(200).send({collections});

	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETTING_COLLECTIONS');
	}
}

export async function deleteCollection(req: Request, res : Response) {
    try{
        const {idcollection} = req.params;
        
        await collectionModel.destroy({
            where: {
              id: idcollection
            },
          });
        return res.status(200).send('COLLECTION_DELETED');
    }catch(error: any){
        console.log(error);
        return res.status(500).send('ERROR_DELETING_COLLECTION');
    }
}