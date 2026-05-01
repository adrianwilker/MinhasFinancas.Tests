import { Page, Locator, expect } from '@playwright/test'

export class CategoriasPage {
    readonly page: Page
    readonly tabela: Locator
    readonly botaoAdicionarCategoria: Locator
    readonly inputDescricaoCategoria: Locator
    readonly selectFinalidadeCategoria: Locator
    readonly botaoSalvarCategoria: Locator
    readonly contador: Locator

    constructor(page: Page) {
        this.page = page
        this.tabela = page.locator('table[aria-label="Tabela de dados"]')
        this.botaoAdicionarCategoria = page.getByRole('button', { name: 'Adicionar categoria' })
        this.inputDescricaoCategoria = page.locator('input[id="descricao"]')
        this.selectFinalidadeCategoria = page.locator('select[id="finalidade"]')
        this.botaoSalvarCategoria = page.getByRole('button', { name: 'Salvar' })
        this.contador = page.getByText(/^Mostrando \d+ - \d+ de \d+$/)
    }

    async go() {
        await this.page.goto('/categorias')
    }

    async tabelaEhVisivel(): Promise<boolean> {
        return await this.tabela.isVisible()
    }

    async adicionarCategoria(descricaoCategoria: string, finalidadeCategoria: string) {
        await this.botaoAdicionarCategoria.click()
        const opcoesValidas = ['despesa', 'receita', 'ambas']
        const finalidade = finalidadeCategoria.toLowerCase()
        await this.inputDescricaoCategoria.fill(descricaoCategoria)
        if(!opcoesValidas.includes(finalidade))
            throw new Error('Finalidade inválida')
        await this.selectFinalidadeCategoria.selectOption(finalidade)
        await this.botaoSalvarCategoria.click()
    }

    async totalDeCategorias(): Promise<number> {
        let texto = await this.contador.textContent()
        let total = Number(texto?.split(' ').pop())
        return total
    }

    async checarLinha(descricaoTexto:string , finalidadeTexto: string) {
        const linha = this.tabela.locator('tr', { hasText: descricaoTexto })
        const tdDescricao = await linha.locator('td').nth(0).textContent()
        const tdFinalidade = await linha.locator('td').nth(1).textContent()
        expect(tdDescricao).toBe(descricaoTexto)
        expect(tdFinalidade).toBe(finalidadeTexto)
    }

    async existeLinha(descricaoTexto:string , finalidadeTexto: string): Promise<boolean> {
        const botaoProximo = this.page.locator("//button[contains(., 'Próximo')]")
        do {
            const linha = this.page.locator(`//tr[td[normalize-space()='${descricaoTexto}'] and td[normalize-space()='${finalidadeTexto}']]`)
            if(await linha.isVisible())
                return true
            await botaoProximo.click()
        } while(await botaoProximo.isEnabled())
        return false
    }
}