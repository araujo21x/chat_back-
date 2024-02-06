import { EntityManager } from 'typeorm';
import dataSource from '..';

async function Dump(): Promise<void> {
  try {
    await dataSource.initialize();

    await dataSource.transaction(async (trx: EntityManager) => {
      console.log('Dados salvo com sucesso no banco de dados!', trx);
    });
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
}

Dump();
