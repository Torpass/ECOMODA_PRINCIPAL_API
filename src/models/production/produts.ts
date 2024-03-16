import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../../config/db';
import ProductInterface from '../interfaces/Products';


class ProductModel extends Model<ProductInterface> implements ProductInterface {
    public id!: number;

    // Metodos personalizados
    
}

ProductModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        sequelize,
        tableName: "products",
        timestamps: false,
    }
);

export default ProductModel;