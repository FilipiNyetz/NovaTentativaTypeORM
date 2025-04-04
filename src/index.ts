import { AppDataSource } from "./data-source";
import { criarCategoria, listarCategorias, deletarCategoria, atualizarCategoria } from "./services/CategoriaService"; // Importa a função criar
import promptSync from "prompt-sync";
import { criarProduto, listarProdutos, deletarProduto, atualizarProduto } from "./services/ProdutoService";

const prompt = promptSync();

// Inicializa a conexão com o banco de dados
AppDataSource.initialize()
    .then(async () => {
        console.log("Banco de dados conectado!");

        let executando = true;

        while (executando) {
            console.log("\nBem-vindo ao menu Principal");
            console.log("1 - Gestão Produtos");
            console.log("2 - Gestão Categorias");
            console.log("3 - Sair do sistema");

            let opcaoDeMenu = Number(prompt("Insira sua opção 1, 2 ou 3: "));

            switch (opcaoDeMenu) {
                case 1:
                    let gerenciarProdutos = true;
                    while (gerenciarProdutos) {
                        console.log("\n1 - Criar Produto");
                        console.log("2 - Visualizar Produtos");
                        console.log("3 - Deletar Produto");
                        console.log("4 - Atualizar Produto");
                        console.log("5 - Retornar ao menu principal");

                        let escolha = Number(prompt("Escolha uma opção: "));

                        switch (escolha) {
                            case 1:
                                await criarProduto();
                                break;
                            case 2:
                                await listarProdutos()
                                break;
                            case 3:
                                await deletarProduto()
                                break;
                            case 4:
                                await atualizarProduto()
                                break;
                            case 5:
                                console.log("Voltando ao menu principal...");
                                gerenciarProdutos = false; // Sai do loop de categorias
                                break;
                            default:
                                console.log("Opção inválida, tente novamente.");
                                break;
                        }
                    }
                    break;

                case 2:
                    let gerenciarCategorias = true;
                    while (gerenciarCategorias) {
                        console.log("\n1 - Criar Categoria");
                        console.log("2 - Visualizar Categoria");
                        console.log("3 - Deletar Categoria");
                        console.log("4 - Atualizar Categoria");
                        console.log("5 - Retornar ao menu principal");

                        let escolha = Number(prompt("Escolha uma opção: "));

                        switch (escolha) {
                            case 1:
                                await criarCategoria();
                                break;
                            case 2:
                                await listarCategorias()
                                break;
                            case 3:
                                await deletarCategoria()
                                break;
                            case 4:
                                await atualizarCategoria()
                                break;
                            case 5:
                                console.log("Voltando ao menu principal...");
                                gerenciarCategorias = false; // Sai do loop de categorias
                                break;
                            default:
                                console.log("Opção inválida, tente novamente.");
                                break;
                        }
                    }
                    break;

                case 3:
                    console.log("Saindo do sistema...");
                    executando = false; // Sai do loop principal
                    break;

                default:
                    console.log("Opção inválida, tente novamente.");
            }
        }
    })
    .catch(error => console.error("Erro ao conectar ao banco de dados:", error));
