import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../../config/db';
import stores from '../interfaces/PoS';


class StoreModel extends Model<stores> implements stores {
    public id!: number;
    public name!: string;

    // Metodos personalizados
    
}

StoreModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
    },

    {
        sequelize,
        tableName: "store",
        timestamps: false,
    }
);

export default StoreModel;