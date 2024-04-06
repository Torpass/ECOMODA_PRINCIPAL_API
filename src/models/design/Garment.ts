import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/db';
import Garment from '../interfaces/Garment';

class GarmentModel extends Model<Garment> implements Garment {
    public id!: number;
    public garment!: string;
    public collection_id!: number;
    public garment_type_id!: number;
    public size_id!: number;
    public pattern!: string;
    public activo!: boolean;
}

GarmentModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        garment: {
            type: DataTypes.STRING,
        },
        garment_type_id: {
            type: DataTypes.NUMBER,
        },
        collection_id: {
            type: DataTypes.NUMBER,
        },
        size_id: {
            type: DataTypes.NUMBER,
        },
        pattern: {
            type: DataTypes.TEXT,
        },
        activo:{
            type: DataTypes.BOOLEAN,
        }
    },
    {
        sequelize,
        tableName: 'garments',
        timestamps: false,
    }
);

export default GarmentModel;
