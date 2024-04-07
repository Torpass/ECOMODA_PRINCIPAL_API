import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../../config/db';
import ProductInterface from '../interfaces/Products';


class ProductModel extends Model<ProductInterface> implements ProductInterface {
    public id!: number;
    public name!: String;
    public description!: String;
    public quantity!: number;

    // Metodos personalizados
    
}

ProductModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        },
        description: { 
            type: DataTypes.STRING
        },
        quantity!: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        tableName: "products",
        timestamps: false,
    }
);

export default ProductModel;