import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../../config/db';
import GarmentType from '../interfaces/GarmentType';


class GarmentTypeModel extends Model<GarmentType> implements GarmentType {
    public id!: number;
    public type!: string;
    public activo!: boolean;   
}

GarmentTypeModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING,
        },
        activo:{
            type: DataTypes.BOOLEAN
        }
    },

    {
        sequelize,
        tableName: "garment_types",
        timestamps: false,
    }
);

export default GarmentTypeModel;