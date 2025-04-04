    import 'reflect-metadata'
    import { Column, Entity, PrimaryGeneratedColumn,OneToMany,CreateDateColumn } from 'typeorm';
    import { Produto } from "./Produto";

    @Entity("categorias")

    export class Categoria{
        @PrimaryGeneratedColumn()
        idCategoria:number;

        @Column({ type: "varchar", length: 100 })
        nome:string;

        @Column({ type: "varchar", length: 500 })
        descricaoCategoria:string

        @CreateDateColumn()
        dataCriacao:Date

        @Column({ type: "timestamp", nullable: true }) // Começa como NULL
        dataAtualizacao: Date | null;

        @OneToMany(() => Produto, (produto) => produto.categoria) // Relacionamento
        produtos: Produto[];
        

    }