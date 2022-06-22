import AppDataSource from '@data-source';

export const clearTablesAll = async () => {
  const entities = AppDataSource.entityMetadatas;
  await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 0');
  for (const entity of entities) {
    if (['account', 'member'].indexOf(entity.tablePath) >= 0) {
      // used by Jest
      await AppDataSource.query(`DELETE FROM ${entity.tablePath} WHERE NAME != 'admin'`);
    } else if (['operation_config'].indexOf(entity.tablePath) >= 0) {
      await AppDataSource.query(`DELETE FROM ${entity.tablePath} WHERE CODE != 'DEFAULT'`);
    } else {
      await AppDataSource.query(`TRUNCATE ${entity.tablePath}`);
      await AppDataSource.query(`ALTER TABLE ${entity.tablePath} AUTO_INCREMENT = 10000`);
    }
  }
  await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 1');
};
