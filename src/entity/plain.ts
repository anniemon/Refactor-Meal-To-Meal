import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum DataState {
  READY = 'READY',
  PENDING = 'PENDING',
  ONGOING = 'ONGOING',
  NORMAL = 'NORMAL',
  HIDDEN = 'HIDDEN',
  FAILED = 'FAILED',
  DISCLAIMED = 'DISCLAIMED',
  DELETED = 'DELETED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

@Entity()
export class Plain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({
    type: 'enum',
    enum: DataState,
    default: DataState.PENDING,
  })
  state: DataState;

  @Column({
    nullable: true,
  })
  flags: number;

  @Column({
    nullable: true,
  })
  code: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'json',
  })
  extras: JSON;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
