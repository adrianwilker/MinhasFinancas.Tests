import { Page, Locator, expect } from '@playwright/test'

export class TransacoesPage {
    readonly page: Page
    readonly tabela: Locator
    readonly botaoAdicionarTransacao: Locator
    readonly inputDescricao: Locator
    readonly inputValor: Locator
    readonly inputData: Locator
    readonly selectTipo: Locator
    readonly selectPessoa: Locator
    readonly selectCategoria: Locator
    readonly botaoSalvar: Locator
    readonly botaoCancelar: Locator

    constructor(page: Page) {
        this.page = page
        this.tabela = page.locator('table[aria-label="Tabela de dados"]')
        this.botaoAdicionarTransacao = page.getByRole('button', { name: 'Adicionar Transação' })
        this.inputDescricao = page.locator('input[id="descricao"]')
        this.inputValor = page.locator('input[id="valor"]')
        this.inputData = page.locator('input[id="data"]')
        this.selectTipo = page.locator('select[id="tipo"]')
        this.selectPessoa = page.locator('(//button[@aria-label="Abrir lista"])[1]')
        this.selectCategoria = page.locator('(//button[@aria-label="Abrir lista"])[2]')
        this.botaoSalvar = page.locator("//button[contains(., 'Salvar')]")
        this.botaoCancelar = page.locator("//button[contains(., 'Cancelar')]")
    }

    async go() {
        await this.page.goto('/transacoes')
    }

    async adicionarTransacao(descricao: string, valor: number, data: string, tipo: string, pessoa: string, categoria: string) {
        await this.botaoAdicionarTransacao.click()
        // Descrição
        await this.inputDescricao.fill(descricao)
        // Valor
        await this.inputValor.fill(String(valor))
        // Data
        await this.inputData.fill(data)
        // Tipo
        const opcoesValidas = ['despesa', 'receita']
        const tipoCategoria = tipo.toLowerCase()
        if(!opcoesValidas.includes(tipoCategoria))
            throw new Error(`Tipo inválido: ${tipo}`)
        await this.selectTipo.selectOption(tipo)
        // Pessoa
        await this.selectPessoa.click()
        const pessoaListada = await this.page.locator(`//div[@role='option' and normalize-space()='${pessoa}']`)
        if((await pessoaListada.count()) <= 0)
            throw new Error(`A pessoa ${pessoa} não está registrada`)
        await pessoaListada.click()
        // Categoria
        await this.selectCategoria.click()
        const categoriaListada = await this.page.locator(`//div[@role='option' and normalize-space()='${categoria}']`)
        if((await categoriaListada.count()) <= 0)
            throw new Error(`A categoria ${categoria} não está registrada`)
        await categoriaListada.click()

        await this.botaoSalvar.click()
    }

    async mensagemDeErroVisivel() {
        const mensagem = this.page.getByText('Erro ao salvar transação. Tente novamente.');
        await expect(mensagem).toBeVisible();
    }

    async mensagemDeSucessoVisivel() {
        const mensagem = this.page.getByText('/sucesso/i');
        await expect(mensagem).toBeVisible();
    }
}