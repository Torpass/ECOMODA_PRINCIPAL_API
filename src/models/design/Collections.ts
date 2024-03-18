import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../../config/db';
import Collections from '../interfaces/Collections';


class CollectionModel extends Model<Collections> implements Collections {
    public id!: number;
    public collection!: string;
    public standard_quantity!: number;
    public createdAt!: Date;
    public updatedAt!: Date;

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
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    },

    {
        sequelize,
        tableName: "collections",
        timestamps: false,
    }
);

export default CollectionModel;