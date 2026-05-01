using Xunit;
using MinhasFinancas.Domain.Entities;
namespace MinhasFinancas.UnitTests;

public class TransacaoTest
{
    [Fact] 
    public void AtribuirPessoa_MenorDeIdadeEmReceita_DeveLancarExcecao()
    {
        // Arrange
        var DataNascimento = DateTime.Today.AddYears(-18).AddDays(1);
        var pessoa = new Pessoa { Nome = "Joãozinho", DataNascimento = DataNascimento };
        var transacao = new Transacao { Tipo = Transacao.ETipo.Receita, Descricao = "Descrição de receita." };
        var propPessoa = typeof(Transacao).GetProperty("Pessoa");

        // Act
        var ex = Assert.Throws<System.Reflection.TargetInvocationException>(() => 
        propPessoa!.SetValue(transacao, pessoa)
        );

        // Assert
        Assert.IsType<InvalidOperationException>(ex.InnerException);
        Assert.Equal("Menores de 18 anos não podem registrar receitas.", ex.InnerException.Message);
    }


    [Fact]
    public void AtribuirPessoa_MenorDeIdadeEmDespesa_DeveSerPermitido()
    {
        // Arrange
        var DataNascimento = DateTime.Today.AddYears(-15);
        var pessoa = new Pessoa { Nome = "Joãozinho", DataNascimento = DataNascimento };
        var transacao = new Transacao { Tipo = Transacao.ETipo.Despesa, Descricao = "Descrição de receita." };
        var propPessoa = typeof(Transacao).GetProperty("Pessoa");

        // Act
        propPessoa!.SetValue(transacao, pessoa);

        // Assert
        Assert.Equal(pessoa.Id, transacao.PessoaId);
    }

    [Fact]
    public void AtribuirPessoa_ComDataFutura_DeveLancarExcecao()
    {
        var DataNascimento = DateTime.Today.AddYears(20);
        var pessoa = new Pessoa { Nome = "Joãozinho", DataNascimento = DataNascimento };
        var transacao = new Transacao { Tipo = Transacao.ETipo.Despesa, Descricao = "Descrição de receita." };
        var propPessoa = typeof(Transacao).GetProperty("Pessoa");

        // Act
        Action act = () => propPessoa!.SetValue(transacao, pessoa);

        // Assert
        Assert.Throws<ArgumentException>(act);
    }

    [Fact]
    public void AtribuirCategoria_FinalidadeDespesaEmReceita_DeveLancarExcecao()
    {
        // Arrange
        var categoria = new Categoria { Descricao = "Mercado", Finalidade = Categoria.EFinalidade.Despesa };
        var transacao = new Transacao
        {
            Descricao = "Compras do mês",
            Valor = 200,
            Data = DateTime.Today,
            Tipo = Transacao.ETipo.Receita
        };
        var propCategoria = typeof(Transacao).GetProperty("Categoria");

        // Act
        var ex = Assert.Throws<System.Reflection.TargetInvocationException>(() => 
        propCategoria!.SetValue(transacao, categoria)
        );

        // Assert
        Assert.IsType<InvalidOperationException>(ex.InnerException);
        Assert.Equal("Não é possível registrar receita em categoria de despesa.", ex.InnerException.Message);
    }

    [Fact]
    public void AtribuirCategoria_FinalidadeReceitaEmDespesa_DeveLancarExcecao()
    {
        // Arrange
        var categoria = new Categoria { Descricao = "Salário", Finalidade = Categoria.EFinalidade.Receita };
        var transacao = new Transacao
        {
            Descricao = "Compras do mês",
            Valor = 200,
            Data = DateTime.Today,
            Tipo = Transacao.ETipo.Despesa
        };
        var propCategoria = typeof(Transacao).GetProperty("Categoria");

        // Act
        var ex = Assert.Throws<System.Reflection.TargetInvocationException>(() => 
        propCategoria!.SetValue(transacao, categoria)
        );

        // Assert
        Assert.IsType<InvalidOperationException>(ex.InnerException);
        Assert.Equal("Não é possível registrar despesa em categoria de receita.", ex.InnerException.Message);
    }

    [Fact]
    public void AtribuirCategoria_FinalidadeDespesaEmDespesa_DevePermitirVinculo()
    {
        // Arrange
        var categoria = new Categoria { Descricao = "Aluguel", Finalidade = Categoria.EFinalidade.Despesa };
        var transacao = new Transacao
        {
            Descricao = "Aluguel abril/26",
            Valor = 600,
            Data = DateTime.Today,
            Tipo = Transacao.ETipo.Despesa
        };
        var propCategoria = typeof(Transacao).GetProperty("Categoria");

        // Act
        propCategoria!.SetValue(transacao, categoria);

        // Assert
        Assert.NotNull(transacao.Categoria);
        Assert.Equal(categoria.Id, transacao.CategoriaId);
    }

    [Fact]
    public void AtribuirCategoria_FinalidadeReceitaEmReceita_DevePermitirVinculo()
    {
        // Arrange
        var categoria = new Categoria { Descricao = "Salário", Finalidade = Categoria.EFinalidade.Receita };
        var transacao = new Transacao
        {
            Descricao = "Salário abril/26",
            Valor = 2600,
            Data = DateTime.Today,
            Tipo = Transacao.ETipo.Receita
        };
        var propCategoria = typeof(Transacao).GetProperty("Categoria");

        // Act
        propCategoria!.SetValue(transacao, categoria);

        // Assert
        Assert.NotNull(transacao.Categoria);
        Assert.Equal(categoria.Id, transacao.CategoriaId);
    }

    [Fact]
    public void AtribuirCategoria_FinalidadeAmbasEmReceita_DevePermitirVinculo()
    {
        // Arrange
        var categoria = new Categoria { Descricao = "Salário", Finalidade = Categoria.EFinalidade.Ambas };
        var transacao = new Transacao
        {
            Descricao = "Salário abril/26",
            Valor = 2600,
            Data = DateTime.Today,
            Tipo = Transacao.ETipo.Receita
        };
        var propCategoria = typeof(Transacao).GetProperty("Categoria");

        // Act
        propCategoria!.SetValue(transacao, categoria);

        // Assert
        Assert.NotNull(transacao.Categoria);
        Assert.Equal(categoria.Id, transacao.CategoriaId);
    }

    [Fact]
    public void AtribuirCategoria_FinalidadeAmbasEmDespesa_DevePermitirVinculo()
    {
        // Arrange
        var categoria = new Categoria { Descricao = "Aluguel", Finalidade = Categoria.EFinalidade.Ambas };
        var transacao = new Transacao
        {
            Descricao = "Aluguel abril/26",
            Valor = 600,
            Data = DateTime.Today,
            Tipo = Transacao.ETipo.Despesa
        };
        var propCategoria = typeof(Transacao).GetProperty("Categoria");

        // Act
        propCategoria!.SetValue(transacao, categoria);

        // Assert
        Assert.NotNull(transacao.Categoria);
        Assert.Equal(categoria.Id, transacao.CategoriaId);
    }

    [Fact]
    public void CriarTransacao_DataFutura_DeveLancarExcecao()
    {
        // Arrange e Act
        Action act = () => new Transacao { Tipo = Transacao.ETipo.Despesa, Descricao = "Descrição de receita.", Data = DateTime.Today.AddDays(1) };
        
        // Assert
        Assert.Throws<ArgumentException>(act);
    
    }
}