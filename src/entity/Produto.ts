  import "reflect-metadata";
  import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,CreateDateColumn, UpdateDateColumn } from 'typeorm';
  import {Categoria} from './Categoria'

  @Entity("produtos")
  export class Produto{
      @PrimaryGeneratedColumn()
      idProduto:number;

      @Column({ type: "varchar", length: 100 })
      nomeProduto: string;

      @Column({ type: "varchar", length: 800 })
      descricao:string

      @Column({ type: "numeric", precision: 10, scale: 2 })
      quantidade:number

      @Column({type:"integer"})
      valor:number

      @CreateDateColumn()
      dataCriacao:Date

      @ManyToOne(() => Categoria, (categoria) => categoria.produtos,{nullable:false}) // Relacionamento
    categoria: Categoria;

    @Column({ type: "timestamp", nullable: true }) // Começa como NULL
    dataAtualizacao: Date | null;
  }