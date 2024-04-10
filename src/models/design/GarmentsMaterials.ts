import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/db';
import GarmentsMaterials from '../interfaces/GarmentsMaterials';

class GarmentsMaterialsModel extends Model<GarmentsMaterials> implements GarmentsMaterials {
    public id!: number;
    public garment_id!: number;
    public material_id!: number;
    public quantity!: number;
    public activo!: boolean;
}

GarmentsMaterialsModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        garment_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        material_id: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.DECIMAL,
        },
        activo:{
            type: DataTypes.BOOLEAN
        }
    },
    {
        sequelize,
        tableName: 'garment_materials',
        timestamps: false
    }
);

export default GarmentsMaterialsModel;
