import { Page, Locator, expect } from '@playwright/test'

export class PessoasPage {
    readonly page: Page
    readonly botaoAdicionarPessoa: Locator
    readonly tabela: Locator
    readonly inputNome: Locator
    readonly inputDataNascimento: Locator
    readonly botaoSalvarPessoa: Locator
    readonly contador: Locator
    readonly msgErroNomeObrigatorio: Locator
    readonly botaoCancelar: Locator
    readonly botaoConfirmarDelete: Locator

    constructor(page: Page) {
        this.page = page
        this.tabela = page.locator('table[aria-label="Tabela de dados"]')
        this.botaoAdicionarPessoa = page.getByRole('button', { name: 'Adicionar pessoa' })
        this.inputNome = page.locator('input[id="nome"]')
        this.inputDataNascimento = page.locator('input[id="dataNascimento"]')
        this.botaoSalvarPessoa = page.getByRole('button', { name: 'Salvar' })
        this.botaoCancelar = page.getByRole('button', { name: 'Cancelar' })
        this.contador = page.getByText(/^Mostrando \d+ - \d+ de \d+$/)
        this.msgErroNomeObrigatorio = page.getByText('Nome é obrigatório')
        this.botaoConfirmarDelete = page.getByRole('button', { name: 'Confirmar' })
    }

    async go() {
        await this.page.goto('/pessoas')
    }

    async adicionarPessoa(nome: string, dataDeNascimento: string) {
        await this.botaoAdicionarPessoa.click()
        await this.inputNome.fill(nome)
        await this.inputDataNascimento.fill(dataDeNascimento)
        await this.botaoSalvarPessoa.click()
    }

    async totalDePessoas(): Promise<number> {
        let texto = await this.contador.textContent()
        let total = Number(texto?.split(' ').pop())
        return total
    }

    async mensagemDeErroVisivel() {
        const mensagem = this.page.getByText('Erro ao salvar pessoa');
        await expect(mensagem).toBeVisible();
    }

    async mensagemDeSucessoVisivel() {
        const mensagem = this.page.getByText('Pessoa atualizada com sucesso!');
        await expect(mensagem).toBeVisible();
    }

    async pegarPessoaPelaLinha(indice: number): Promise<
        [string, string, string, Locator, Locator]
    > {
        const linha = this.page.locator(`//tbody//tr[${indice}]`)
        const nome = await linha.locator('//td[1]').textContent()
        const dataNascimento = await linha.locator('//td[2]').textContent() // mes/dia/ano
        let [mes, dia, ano] = dataNascimento!.split('/')
        dia = dia.padStart(2, '0')
        mes = mes.padStart(2, '0')
        const dataNascimentoFormatada = `${ano}-${mes}-${dia}`
        const idade = await linha.locator('//td[3]').textContent()
        const botaoEditar = linha.locator("//td[4]//button[contains(., 'Editar')]")
        const botaoDeletar = linha.locator("//td[4]//button[contains(., 'Deletar')]")
        return [nome!, dataNascimentoFormatada!, idade!, botaoEditar!, botaoDeletar!]
    }

    async editarPessoa(nome: string, dataDeNascimento: string) {
        await this.inputNome.clear()
        await this.inputDataNascimento.clear()
        await this.inputNome.fill(nome)
        await this.inputDataNascimento.fill(dataDeNascimento)
        await this.botaoSalvarPessoa.click()
    }

}