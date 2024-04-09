import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../../config/db';
import Inventory from '../interfaces/Inventory';


class InventoryModel extends Model<Inventory> implements Inventory {
    store_id!: number;
    product_id!: number;
    quantity!: number;

    // Metodos personalizados
    
}

InventoryModel.init(
    {
        store_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
    },

    {
        sequelize,
        tableName: "inventories",
        timestamps: false,
    }
);

export default InventoryModel;