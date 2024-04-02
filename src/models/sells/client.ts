import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../../config/db';
import Client from '../interfaces/Clients';


class ClientModel extends Model<Client> implements Client {
    cedula!: number;
    name!: string;

    // Metodos personalizados
    
}

ClientModel.init(
    {
        cedula: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        }
    },

    {
        sequelize,
        tableName: "inventories",
        timestamps: false,
    }
);

export default ClientModel;