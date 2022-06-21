import { MigrationInterface, QueryRunner } from 'typeorm';

export class init202202161644995196224 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const createPlain = `CREATE TABLE IF NOT EXISTS plain (
													id int NOT NULL AUTO_INCREMENT,
													type varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
													state enum('READY','PENDING','ONGOING','NORMAL','HIDDEN','FAILED','DISCLAIMED','DELETED','COMPLETED','CANCELED') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PENDING',
													flags int DEFAULT NULL,
													code varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
													name varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
													description text COLLATE utf8mb4_general_ci,
													extras json NOT NULL,
													created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
													updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
													PRIMARY KEY (id)
												) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`;
    await queryRunner.query(createPlain);
    const createProduct = `CREATE TABLE IF NOT EXISTS product (
													id int NOT NULL AUTO_INCREMENT,
													type varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
													state enum('READY','PENDING','ONGOING','NORMAL','HIDDEN','FAILED','DISCLAIMED','DELETED','COMPLETED','CANCELED') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PENDING',
													flags int DEFAULT NULL,
													code varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
													name varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
													description text COLLATE utf8mb4_general_ci,
													extras json NOT NULL,
													created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
													updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
													PRIMARY KEY (id)
												) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`;
    await queryRunner.query(createProduct);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE product`);
  }
}
