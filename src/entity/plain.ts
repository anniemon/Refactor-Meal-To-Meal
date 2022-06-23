import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface PlainEntity {
  id: number;
  type: string;
  name: string;
  created_at: string;
  updated_at: string;
}

@Entity()
export class Plain implements PlainEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({
    nullable: true,
  })
  name: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
