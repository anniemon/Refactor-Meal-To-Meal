import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface PlainEntity {
  id: number;
  created_at: string;
  updated_at: string;
}

@Entity()
export class Plain implements PlainEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
