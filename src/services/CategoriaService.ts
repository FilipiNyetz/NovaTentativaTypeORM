import { QueryBuilder } from "typeorm";
import { AppDataSource } from "../data-source";
import { Categoria } from "../entity/Categoria";
import { Produto } from "../entity/Produto";
import promptSync from "prompt-sync";

const prompt = promptSync();

export async function criarCategoria() {
    let nomePrompt = prompt("Nome: ");
    let descricaoPrompt = prompt("Descrição: ");

    try {
        const categoriaRepo = AppDataSource.getRepository(Categoria);

        const novaCategoria = categoriaRepo.create({
            nome: nomePrompt,
            descricaoCategoria: descricaoPrompt
        });

        await categoriaRepo.save(novaCategoria);
        console.log("Categoria criada com sucesso!");
    } catch (error) {
        console.error("Erro ao criar categoria:", error);
    }
}

export async function listarCategorias() {
    const categorias = await AppDataSource
    .getRepository(Categoria)
    .createQueryBuilder("categoria")
    .getMany()

    console.table(categorias)
}

export async function deletarCategoria() {
    let idCategoria = Number(prompt("ID da categoria que deseja excluir: "));

    const categoriaExiste = await AppDataSource.getRepository(Categoria).findOne({
        where: { idCategoria: idCategoria }
    });

    if(categoriaExiste){
        const produtosRelacionados = await AppDataSource
        .createQueryBuilder()
        .select("produto")
        .from(Produto, "produto")
        .where("produto.categoriaIdCategoria = :id", { id: idCategoria })
        .getCount();

        if (produtosRelacionados > 0) {
            console.log("Não é possível excluir esta categoria, pois há produtos vinculados a ela.");
            return;
        }
    
        await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(Categoria)
            .where("idCategoria = :id", { id: idCategoria })
            .execute()

        console.log(`Categoria de ID ${idCategoria} excluída com sucesso`)
    }else{
        console.log("Categoria não encontrada")
    }

    
}

export async function atualizarCategoria() {
    let idCategoria = Number(prompt("Qual categoria você deseja atualizar:"))

    const categoriaExiste = await AppDataSource.getRepository(Categoria).findOne({
        where: { idCategoria: idCategoria }
    });

    if(categoriaExiste){
        let novoNome = prompt("Nome categoria atualizado: ");
        let novaDescricao = prompt("Descrição atualizada: ");

        await AppDataSource
        .createQueryBuilder()
        .update(Categoria)
        .set({ 
            nome: novoNome, 
            descricaoCategoria: novaDescricao,
            dataAtualizacao: new Date() // Atualiza a data de modificação
        })
        .where("idCategoria = :id", { id: idCategoria })
        .execute();

        console.log("Sua categoria foi atualizada com sucesso")
    }else{
        console.log("Categoria não encontrada")
    }
    
}