using Xunit;
using MinhasFinancas.Domain.Entities;
namespace MinhasFinancas.UnitTests;

public class PessoaTest
{
    [Fact]
    public void VerificarIdade_MenorDeIdade_DeveLancarExcecao()
    {
        var dataNascimento = DateTime.Today.AddYears(-18).AddDays(1);
        var pessoaMenor = new Pessoa { Nome = "José Menor de Idade", DataNascimento = dataNascimento};
        Assert.False(pessoaMenor.EhMaiorDeIdade(), "O sistema não aceita pessoas menores de 18 anos.");
    }

    [Fact]
    public void VerificarIdade_MaiorDeIdade_DeveSerPermitido()
    {
        var dataNascimento = DateTime.Today.AddYears(-18);
        var pessoaMaior = new Pessoa { Nome = "Maria Maior de Idade", DataNascimento = dataNascimento};
        Assert.True(pessoaMaior.EhMaiorDeIdade(), "O sistema aceita pessoas com 18 anos ou mais.");
    }

    [Fact]
    public void CriarPessoa_DataDeNascimentoFutura_DeveLancarExcecao()
    {
        var dataNascimento = DateTime.Today.AddYears(20);
        Action act = () => new Pessoa { Nome = "João Data Futura", DataNascimento = dataNascimento };
        // Assert
        Assert.Throws<ArgumentException>(act);
    }

}
