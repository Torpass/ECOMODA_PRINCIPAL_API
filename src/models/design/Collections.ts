import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../../config/db';
import Collections from '../interfaces/Collections';


class CollectionModel extends Model<Collections> implements Collections {
    public id!: number;
    public collection!: string;
    public standard_quantity!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public activo!: boolean;

    // Metodos personalizados
    
}

CollectionModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        collection: {
            type: DataTypes.STRING,
        },
        standard_quantity: {
            type: DataTypes.INTEGER,
        },
        activo:{
            type: DataTypes.BOOLEAN
        }
    },

    {
        sequelize,
        tableName: "collections",
        timestamps: true,
    }
    
);
export default CollectionModel;