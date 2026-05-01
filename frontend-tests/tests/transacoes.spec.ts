import { test, expect } from '@playwright/test'
import { TransacoesPage } from './support/pages/transacoes'

test.describe('Página de transações', () => {
    let transacoesPage: TransacoesPage

    test.beforeEach(async ({ page }) => {
        transacoesPage = new TransacoesPage(page)
        transacoesPage.go()
    })

    test('Ao acessar a página deve exibir a tabela de transações', async () => {
        await expect(transacoesPage.tabela).toBeVisible()
    });

    test('Adicionar transacao válida do tipo Receita deve exibir mensagem de sucesso', async () => {
        // Arrange
        const descricao: string = "Trabalho como freelancer"
        const valor: number = 100.0
        const data: string = '2026-04-01'
        const tipo: string = "Receita"
        const pessoa: string = "Adrian Wilker"
        const categoria: string = "Freelance"
        
        // Act
        await transacoesPage.adicionarTransacao(descricao, valor, data, tipo, pessoa, categoria)
        
        // Assert
        await transacoesPage.mensagemDeSucessoVisivel()
    })

    test('Adicionar transacao válida do tipo Despesa deve exibir mensagem de sucesso', async () => {
        // Arrange
        const descricao: string = "Trabalho como freelancer"
        const valor: number = 100.0
        const data: string = '2026-04-01'
        const tipo: string = "Despesa"
        const pessoa: string = "Adrian Wilker"
        const categoria: string = "Transporte"
        
        // Act
        await transacoesPage.adicionarTransacao(descricao, valor, data, tipo, pessoa, categoria)
        
        // Assert
        await transacoesPage.mensagemDeSucessoVisivel()
    })

    test('Adicionar transacao do tipo Despesa e categoria Receita deve exibir mensagem de erro', async () => {
        // Arrange
        const descricao: string = "Trabalho como freelancer"
        const valor: number = 100.0
        const data: string = '2026-04-01'
        const tipo: string = "Despesa"
        const pessoa: string = "Adrian Wilker"
        const categoria: string = "Freelance"
        
        // Act
        await transacoesPage.adicionarTransacao(descricao, valor, data, tipo, pessoa, categoria)
        
        // Assert
        await transacoesPage.mensagemDeErroVisivel()
    })

    test('Adicionar transacao do tipo Receita e categoria Despesa deve exibir mensagem de erro', async () => {
        // Arrange
        const descricao: string = "Trabalho como freelancer"
        const valor: number = 100.0
        const data: string = '2026-04-01'
        const tipo: string = "Receita"
        const pessoa: string = "Adrian Wilker"
        const categoria: string = "Transporte"
        
        // Act
        await transacoesPage.adicionarTransacao(descricao, valor, data, tipo, pessoa, categoria)
        
        // Assert
        await transacoesPage.mensagemDeErroVisivel()
    })


})