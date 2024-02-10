import { app } from './app';
import {dbConnectMySql} from './config/db'

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});

dbConnectMySql();
