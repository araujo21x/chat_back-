import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';

export default new DataSource({
  type: 'mysql',
  url: process.env.DB_URL,
  synchronize: false,
  logging: false,
  migrationsRun: true,
  entities: [path.join(__dirname, '../app/models/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')],
});
