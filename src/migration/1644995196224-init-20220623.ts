import { MigrationInterface, QueryRunner } from 'typeorm';

export class init202202161644995196224 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const createPlain = `CREATE TABLE IF NOT EXISTS plain (
													id int NOT NULL AUTO_INCREMENT,
													type varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
													name varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
													created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
													updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
													PRIMARY KEY (id)
												) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`;
    await queryRunner.query(createPlain);
    const autoIncrementPlain = `ALTER TABLE plain AUTO_INCREMENT = 10000`;
    await queryRunner.query(autoIncrementPlain);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE plain`);
  }
}
