import { AppDataSource } from "../data-source";
import { Produto } from "../entity/Produto";
import { Categoria } from "../entity/Categoria"; // Para buscar a categoria associada
import promptSync from "prompt-sync";

const prompt = promptSync();

export async function criarProduto() {
    let nomeProduto = prompt("Nome do Produto: ");
    let descricao = prompt("Descrição: ");
    let quantidade = Number(prompt("Quantidade: "));
    let valor = Number(prompt("Valor: "));
    let categoriaId = Number(prompt("ID da Categoria: "));

    // Buscar a categoria para associar ao produto
    const categoria = await AppDataSource.getRepository(Categoria).findOne({
        where: { idCategoria: categoriaId }
    });

    if (!categoria) {
        console.log("Categoria não encontrada!");
        return;
    }

    // Criar um novo produto
    const novoProduto = new Produto();
    novoProduto.nomeProduto = nomeProduto;
    novoProduto.descricao = descricao;
    novoProduto.quantidade = quantidade;
    novoProduto.valor = valor;
    novoProduto.dataCriacao = new Date();
    novoProduto.dataAtualizacao = null; // Começa como NULL
    novoProduto.categoria = categoria; // Relacionando com a categoria

    // Salvando no banco
    await AppDataSource.getRepository(Produto).save(novoProduto);
    console.log("Produto cadastrado com sucesso!");
}

export async function listarProdutos() {
    const produtos = await AppDataSource
    .getRepository(Produto)
    .createQueryBuilder("produto")
    .getMany()

    console.table(produtos)
}

export async function deletarProduto() {
    let idProduto = Number(prompt("Qual produto você deseja excluir:"))
    const produtoExistente = await AppDataSource.getRepository(Produto).findOne({
        where: { idProduto: idProduto }
    });

    if(produtoExistente){
        await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(Produto)
        .where("idProduto = :id", { id: idProduto })
        .execute()

        console.log(`Produto de ID ${idProduto} excluído com sucesso !`)
    }else{
        console.log("Produto não encontrado")
    }
    
    
}

export async function atualizarProduto() {
    let idProduto = Number(prompt("Qual produto você deseja atualizar:"))
    const produtoExistente = await AppDataSource.getRepository(Produto).findOne({
        where: { idProduto: idProduto }
    });

    if(produtoExistente){
        let novoNome = prompt("Nome produto atualizado: ");
        let novaDescricao = prompt("Descrição atualizada: ");
        let novaquantidade = Number(prompt("Quantidade: "));
        let novoValor = Number(prompt("Valor: "));

        await AppDataSource
            .createQueryBuilder()
            .update(Produto)
            .set({ 
                nomeProduto: novoNome, 
                descricao: novaDescricao,
                quantidade: novaquantidade,
                valor:novoValor,
                dataAtualizacao: new Date() // Atualiza a data de modificação
        })
            .where("idProduto = :id", { id: idProduto })
            .execute();

            console.log("Seu produto foi atualizado com sucesso")
    }else{
        console.log("Produto não encontrado!!")
    }
       
}