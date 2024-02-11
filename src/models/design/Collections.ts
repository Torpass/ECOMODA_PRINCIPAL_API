import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../../config/db';
import Collections from '../interfaces/Collections';


class CollectionModel extends Model<Collections> implements Collections {
    public id!: number;
    public collection!: string;
    public created_at!: Date;
    public standar_quantity!: number;

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
        created_at: {
            type: DataTypes.DATE,
        },
        standar_quantity: {
            type: DataTypes.INTEGER,
        },
    },

    {
        sequelize,
        tableName: "collections",
        timestamps: false,
    }
);

export default CollectionModel;