## [BUG01] Erro ao obter dados no end-point que obtém todas as transações

**Severidade:** Alta

### Passos para Reproduzir:
1. Enviar uma requisição GET para o end-point ```/api/v1/Transacoes?page=1&pageSize=20```
2. Esperar a resposta

### Resultado Obtido:
```SQLite Error 1: 'no such column: t.Data'```

### Resultado Esperado:
Todas as transações armazenadas no banco.

### Evidências:
[Ver print](./imagens/bug_01.jpg)


## [BUG02] Tabela de Transações não exibe os dados das colunas Categoria e Pessoa

**Severidade:** Alta

### Passos para Reproduzir:
1. Para a tabela ser exibida, adicione a coluna "Data" à tabela "Transacoes" no banco de dados
2. Acesse a tela de Transações (```/transacoes```)

### Resultado Obtido:
Colunas Categoria e Pessoa vazias

### Resultado Esperado:
Devem ser exibidos os dados das colunas de acordo com o que está no banco.

### Evidências:
[Ver print 1](./imagens/bug_02.1.png), [ver print 2](./imagens/bug_02.2.png)


## [BUG03] Mensagem de erro não está clara para o usuário

**Severidade:** Baixa

### Passos para Reproduzir:
1. Acesse a tela de Transações (```/transacoes```)
2. Clique em "Adicionar Transação"
3. Em "Tipo" selecione "Receita"
4. Em "Categoria" selecione uma categoria do tipo "Despesa"
5. Preencha os demais campos corretamente
6. Clique em "Salvar"

### Resultado Obtido:
```"Erro ao salvar transação. Tente novamente"```. A mensagem de erro não ajuda o usuário a entender seu erro e como não repetí-lo.

### Resultado Esperado:
A mensagem de erro deve ser a que está no log: ```"Não é possível registrar receita em categoria de despesa."```

### Evidências:
[Ver print](./imagens/bug_03.png)


## [BUG04] Categorias do tipo Despesa, quando não têm transações associadas a elas, ficam com a cor verde por padrão no gráfico do Dashboard

**Severidade:** Baixa

### Passos para Reproduzir:
1. Acesse o Dashboard da aplicação (```/transacoes```)
2. Espere os dados carregarem

### Resultado Obtido:
Todas as categorias ficam com a legenda verde, incluindo categorias do tipo "Despesa" (quando não têm transações associadas a elas)

### Resultado Esperado:
Categorias do tipo "Despesa" devem estar na cor vermelha, mesmo quando não forem associadas a transações

### Evidências:
[Ver print](./imagens/bug_04.png)


## [BUG05] Erro ao tentar criar Transação

**Severidade:** Alta

### Passos para Reproduzir:
1. Configure um método POST para o end-point ```/api/v1/Transacoes```
2. Envie a requisição

### Resultado Obtido:
"Ocorreu um erro interno no servidor."
```SQLite Error 1: 'table Transacoes has no column named CategoriaId1'```

### Resultado Esperado:
A transação deve ser criada com sucesso

### Evidências:
[Ver print 1](./imagens/bug_05.1.png), [ver print 2](./imagens/bug_05.2.png)