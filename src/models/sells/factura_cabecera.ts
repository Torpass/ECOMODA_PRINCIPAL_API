import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../../config/db';
import factura_cabe from '../interfaces/factura_cabecera';


class Factura_Cabe_Model extends Model<factura_cabe> implements factura_cabe {
    public id!: number;
    public customer_id!: number;

    // Metodos personalizados
    
}

Factura_Cabe_Model.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        customer_id: {
            type: DataTypes.INTEGER,
        },
    },

    {
        sequelize,
        tableName: "invoices",
        timestamps: false,
    }
);

export default Factura_Cabe_Model;