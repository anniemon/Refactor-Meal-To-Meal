import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const getConnectionOptions = () => {
  const connectionOptions: DataSourceOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: process.env.NODE_ENV === 'test' ? 'mealtomeal_test' : 'mealtomeal',
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
