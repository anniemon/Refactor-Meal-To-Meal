import { Entity, Column } from 'typeorm';
import { Plain } from './plain';

@Entity()
export class User extends Plain {
  @Column({
    nullable: false,
  })
  user_nickname: string;

  @Column({ default: '' })
  user_password: string;

  @Column()
  user_phone_number: string;

  @Column()
  verification_code: string;

  @Column()
  kakao_oauth_token: string;

  @Column({ default: '' })
  kakao_id: string;

  @Column()
  signup_method: string;

  @Column({ nullable: false })
  user_email: string;

  @Column({ default: 0 })
  user_donation_count: number;

  @Column({ default: 0 })
  user_donation_money: number;

  @Column({ default: false })
  today_used: boolean;

  @Column({ default: false })
  is_admin: boolean;

  @Column({ default: false })
  is_owner: boolean;
}
