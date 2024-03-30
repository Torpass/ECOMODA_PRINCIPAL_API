import GarmentModel from "./Garment";
import CollectionModel from "./Collections";
import SizeModel from "./Sizes";
import GarmentsMaterialsModel from "./GarmentsMaterials";
import MaterialModel from "./Materials";
import GarmentImagenModel from "./GarmentImg";

module.exports = {
    GarmentModel,
    CollectionModel,
    SizeModel,
    GarmentsMaterialsModel,
    MaterialModel,
    GarmentImagenModel
}

GarmentsMaterialsModel.belongsTo(GarmentModel, { 
    foreignKey: 'garment_id', 
    targetKey: 'id' 
});

GarmentsMaterialsModel.belongsTo(MaterialModel, { 
    foreignKey: 'material_id', 
    targetKey: 'id' 
});

GarmentModel.hasMany(GarmentsMaterialsModel, { 
    foreignKey: 'garment_id', 
});

MaterialModel.hasMany(GarmentsMaterialsModel, { 
    foreignKey: 'material_id', 
});

GarmentModel.belongsTo(CollectionModel, { 
    foreignKey: 'collection_id', 
    targetKey: 'id' 
});

GarmentModel.belongsTo(SizeModel, { 
    foreignKey: 'size_id', 
    targetKey: 'id' 
});

GarmentImagenModel.belongsTo(GarmentModel, { 
    foreignKey: 'id_garment'
});

CollectionModel.hasMany(GarmentModel, { 
    foreignKey: 'collection_id', 
});

SizeModel.hasMany(GarmentModel, { 
    foreignKey: 'size_id', 
});