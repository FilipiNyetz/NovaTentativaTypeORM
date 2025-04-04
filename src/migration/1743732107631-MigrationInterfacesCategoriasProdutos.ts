import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationInterfacesCategoriasProdutos1743732107631 implements MigrationInterface {
    name = 'MigrationInterfacesCategoriasProdutos1743732107631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categorias\` (\`idCategoria\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`descricaoCategoria\` varchar(500) NOT NULL, \`dataCriacao\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`dataAtualizacao\` timestamp NULL, PRIMARY KEY (\`idCategoria\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`produtos\` (\`idProduto\` int NOT NULL AUTO_INCREMENT, \`nomeProduto\` varchar(100) NOT NULL, \`descricao\` varchar(800) NOT NULL, \`quantidade\` decimal(10,2) NOT NULL, \`valor\` int NOT NULL, \`dataCriacao\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`dataAtualizacao\` timestamp NULL, \`categoriaIdCategoria\` int NOT NULL, PRIMARY KEY (\`idProduto\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`produtos\` ADD CONSTRAINT \`FK_f5bf83cda93755e4c6e20daf5e1\` FOREIGN KEY (\`categoriaIdCategoria\`) REFERENCES \`categorias\`(\`idCategoria\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`produtos\` DROP FOREIGN KEY \`FK_f5bf83cda93755e4c6e20daf5e1\``);
        await queryRunner.query(`DROP TABLE \`produtos\``);
        await queryRunner.query(`DROP TABLE \`categorias\``);
    }

}
