import { test, expect } from '@playwright/test'
import { PessoasPage } from './support/pages/pessoas'

test.describe('Página de pessoas', () => {

    let pessoasPage: PessoasPage

    test.beforeEach(async ({ page }) => {
        pessoasPage = new PessoasPage(page)
        pessoasPage.go()
    })

    test('Ao acessar a página deve exibir a tabela de pessoas', async () => {
        await expect(pessoasPage.tabela).toBeVisible()
    });

    test('Adicionar pessoa válida deve incrementar o contador da tabela em 1', async () => {
        // Arrange 
        const nome: string = 'Luke Skywalker'
        const dataNascimento: string = '1989-12-31'
        const totalAntes:number = await pessoasPage.totalDePessoas()

        // Act
        pessoasPage.adicionarPessoa(nome, dataNascimento)
        
        // Assert
        await expect.poll(async () => await pessoasPage.totalDePessoas()).toBe(totalAntes + 1)

    })

    test('Adicionar pessoa com data de nascimento futura deve exibir mensagem de erro', async () => {
        // Arrange 
        const nome: string = 'Leia Organa'
        const dataNascimento: string = '2099-12-31'
        const totalAntes:number = await pessoasPage.totalDePessoas()

        await Promise.all([
            pessoasPage.adicionarPessoa(nome, dataNascimento),
            pessoasPage.mensagemDeErroVisivel()
        ]);
        pessoasPage.botaoCancelar.click()
        await expect.poll(async () => await pessoasPage.totalDePessoas()).toBe(totalAntes)
    })

    test('Adicionar pessoa com data de nascimento futura não deve alterar o total de pessoas da tabela', async () => {
        // Arrange 
        const nome: string = 'Leia Organa'
        const dataNascimento: string = '2099-12-31'
        const totalAntes:number = await pessoasPage.totalDePessoas()

        // Act
        pessoasPage.adicionarPessoa(nome, dataNascimento),
        await pessoasPage.botaoCancelar.click()

        // Assert
        await expect.poll(async () => await pessoasPage.totalDePessoas()).toBe(totalAntes)
    })

    test('Adicionar pessoa sem preencher o campo de nome', async () => {
        // Arrange
        const dataNascimento: string = '2000-01-01'

        // Act
        await pessoasPage.adicionarPessoa('', dataNascimento)

        // Assert
        await expect(pessoasPage.msgErroNomeObrigatorio).toBeVisible()
    })

    test('Editar pessoa deve alterar seus dados na tabela', async () => {
        // Arrange
        const [nomeAntes, dataNascimentoAntes, idadeAntes, botaoEditar, botaoDeletar]
            = await pessoasPage.pegarPessoaPelaLinha(1)
        const novoNome = `${nomeAntes} ${Date.now()}`
        let [ano, mes, dia] = dataNascimentoAntes.split('-')
        const novaDataNascimento = `${Number(ano)-1}-${mes}-${dia}`
        const novaIdade = String(Number(idadeAntes) + 1)

        // Act
        await botaoEditar.click()
        await Promise.all([
            await pessoasPage.editarPessoa(novoNome, novaDataNascimento),
            pessoasPage.mensagemDeSucessoVisivel()
        ]);
        const [nomeEditado, dataNascimentoEditada, idadeEditada, _botaoEditar, _botaoDeletar]
            = await pessoasPage.pegarPessoaPelaLinha(1)
        
        // Assert
        expect(nomeEditado).toBe(novoNome)
        expect(dataNascimentoEditada).toBe(novaDataNascimento)
        expect(idadeEditada).toBe(novaIdade)
    })

    test('Deletar pessoa deve remover os dados da tabela', async () => {
        // Arrange
        const [nomeExcluido, dataNascimentoExcluida, idadeExcluida, botaoEditar, botaoDeletar]
            = await pessoasPage.pegarPessoaPelaLinha(1)
        const total = Number(await pessoasPage.totalDePessoas())

        // Act
        await botaoDeletar.click()
        await pessoasPage.botaoConfirmarDelete.click()
        const [nome, dataNascimento, idade, _botaoEditar, _botaoDeletar]
            = await pessoasPage.pegarPessoaPelaLinha(1)
        const novoTotal = await pessoasPage.totalDePessoas()
        
        // Assert
        expect(
            nome !== nomeExcluido ||
            dataNascimento !== dataNascimentoExcluida ||
            idade !== idadeExcluida ||
            novoTotal == total-1
        ).toBeTruthy()
    })

})