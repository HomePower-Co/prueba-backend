import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cards {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column('decimal')
  precio: number;

  @Column('int')
  stock: number;
}