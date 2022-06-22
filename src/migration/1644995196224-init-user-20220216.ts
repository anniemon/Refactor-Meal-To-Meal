import { MigrationInterface, QueryRunner } from 'typeorm';

export class init202202161644995196224 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const scheduleEvent = `CREATE EVENT IF NOT EXISTS reset_today_used ON SCHEDULE EVERY 1 DAY STARTS '2021-12-14 00:00:00' ON COMPLETION PRESERVE ENABLE DO UPDATE user SET today_used=0;`;
    await queryRunner.query(scheduleEvent);

    const createUser = `CREATE TABLE IF NOT EXISTS user (id int NOT NULL AUTO_INCREMENT, user_nickname VARCHAR(255), user_password VARCHAR(255) DEFAULT '', user_phone_number VARCHAR(255), user_email VARCHAR(255), user_donation_count INTEGER DEFAULT 0, user_donation_money INTEGER DEFAULT 0, today_used TINYINT(1) DEFAULT false, is_admin TINYINT(1) DEFAULT false, kakao_oauth_token VARCHAR(255), signup_method VARCHAR(255), is_owner TINYINT(1), verification_code VARCHAR(255), kakao_id VARCHAR(255) DEFAULT '', created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB;`;
    await queryRunner.query(createUser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user`);
  }
}
