import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const getConnectionOptions = () => {
  const connectionOptions: DataSourceOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'dayone',
    password: 'dayone',
    database: process.env.NODE_ENV === 'test' ? 'dayone_backend_test' : 'dayone_backend',
    synchronize: false,
    logging: false,
    entities: [__dirname + '/../entity/*.js'],
    migrations: [__dirname + '/../migration/*.js'],
  };
  return connectionOptions;
};

const runner = () => {
  return new DataSource(getConnectionOptions());
};

const AppDataSource = runner();
export default AppDataSource;
