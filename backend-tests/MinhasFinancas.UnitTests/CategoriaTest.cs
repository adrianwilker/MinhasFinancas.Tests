using Xunit;
using MinhasFinancas.Domain.Entities;
namespace MinhasFinancas.UnitTests;

public class CategoriaTest
{
    [Fact]
    public void CriarCategoria_TipoDespesa_DeveManterDadosCorretos()
    {
        var despesa = new Categoria { Descricao = "Aluguel", Finalidade = Categoria.EFinalidade.Despesa };
        Assert.Equal("Aluguel", despesa.Descricao);
        Assert.Equal(Categoria.EFinalidade.Despesa, despesa.Finalidade);  
    }

    [Fact]
    public void CriarCategoria_TipoReceita_DeveManterDadosCorretos()
    {
        var receita = new Categoria { Descricao = "Salário", Finalidade = Categoria.EFinalidade.Receita };
        Assert.Equal("Salário", receita.Descricao);
        Assert.Equal(Categoria.EFinalidade.Receita, receita.Finalidade); 
    }

    [Fact]
    public void CriarCategoria_TipoAmbas_DeveManterDadosCorretos()
    {
        var ambas = new Categoria { Descricao = "Empréstimo", Finalidade = Categoria.EFinalidade.Ambas };
        Assert.Equal("Empréstimo", ambas.Descricao);
        Assert.Equal(Categoria.EFinalidade.Ambas, ambas.Finalidade);
    }

}
