import { test, expect } from '@playwright/test'
import { CategoriasPage } from './support/pages/categorias'

test.describe('Página de Categorias', () => {

    let categoriasPage: CategoriasPage

    test.beforeEach(async ({ page }) => {
        categoriasPage = new CategoriasPage(page)
        await categoriasPage.go()
    });

    test('Deve exibir a tabela de categorias ao carregar a página', async ({ page }) => {
        await expect(categoriasPage.tabela).toBeVisible()
    });

    test('Deve adicionar uma nova categoria da finalidade Despesa', async ({ page }) => {
        // Arrange 
        const descricao: string = `Categoria ${Date.now()}`
        const finalidade: string = 'Despesa'
        const totalAntes:number = await categoriasPage.totalDeCategorias()

        // Act
        await categoriasPage.adicionarCategoria(descricao, finalidade)

        // Assert
        await expect.poll(async () => await categoriasPage.totalDeCategorias()).toBe(totalAntes + 1)
        await categoriasPage.existeLinha(descricao, finalidade)
    })

    test('Deve adicionar uma nova categoria da finalidade Receita', async ({ page }) => {
        // Arrange 
        const descricao: string = `Categoria ${Date.now()}`
        const finalidade: string = 'Receita'
        const totalAntes:number = await categoriasPage.totalDeCategorias()

        // Act
        await categoriasPage.adicionarCategoria(descricao, finalidade)

        // Assert
        await expect.poll(async () => await categoriasPage.totalDeCategorias()).toBe(totalAntes + 1)
        await categoriasPage.existeLinha(descricao, finalidade)
    })

    test('Deve adicionar uma nova categoria da finalidade Ambas', async ({ page }) => {
        // Arrange 
        const descricao: string = `Categoria ${Date.now()}`
        const finalidade: string = 'Ambas'
        const totalAntes:number = await categoriasPage.totalDeCategorias()

        // Act
        await categoriasPage.adicionarCategoria(descricao, finalidade)

        // Assert
        await expect.poll(async () => await categoriasPage.totalDeCategorias()).toBe(totalAntes + 1)
        await categoriasPage.existeLinha(descricao, finalidade)
    })
})