import "reflect-metadata"
import { DataSource } from "typeorm"
import { Produto } from "./entity/Produto"
import { Categoria } from "./entity/Categoria"
import { MigrationInterfacesCategoriasProdutos1743732107631 } from "./migration/1743732107631-MigrationInterfacesCategoriasProdutos"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "AtividadeTypeORM",
    synchronize: true,
    logging: false,
    entities: [Categoria,Produto],
    migrations: [MigrationInterfacesCategoriasProdutos1743732107631],
    subscribers: [],
    connectTimeout: 100,
})

