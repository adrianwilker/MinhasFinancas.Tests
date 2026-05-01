## Testes back-end (xUnit)
- Acesse o diretório ```backend-tests```
```bash
cd backend-tests
```
- Execute o comando para baixar as bibliotecas necessárias:
```bash
dotnet restore
```
- Acesse o diretório de testes unitários e referencie o projeto principal que será testado
(Substitua "CAMINHO_DO_PROJETO" pelo caminho real no seu PC)
```bash
cd MinhasFinancas.UnitTests
dotnet add reference "C:/Caminho/Para/ProjetoOriginal/MinhasFinancas.Domain/MinhasFinancas.Domain.csproj"
dotnet add reference "C:/Caminho/Para/ProjetoOriginal/MinhasFinancas.Application/MinhasFinancas.Application.csproj"
```
- Faça build da solução
```bash
dotnet build
```
- Rode todos os testes
```bash
dotnet test
```
- Ou rode uma classe específica
```bash
dotnet test --filter "FullyQualifiedName~NOME_DA_CLASSE"
```
ex: ```dotnet test --filter "FullyQualifiedName~TransacaoTest"```
- Ou um teste específico
```bash
dotnet test --filter "FullyQualifiedName~NOME_DA_CLASSE.NOME_DO_MÉTODO"
```
ex: ```dotnet test --filter "FullyQualifiedName~TransacaoTest.CriarTransacao_DataFutura_DeveLancarExcecao"```

## Testes front-end (Playwright)
Com o sistema principal rodando (front-end e back-end)
- Acesse o diretório frontend-tests
```bash
cd frontend-tests
```
- Instale as dependências
```bash
npm install
```
- Configure a URL do front-end no .env
```bash
URL=http://localhost:PORT
```
- Instale os browsers do playwright
```bash
npx playwright install
```
- Rode os testes no modo headless
```bash
npx playwright test
```
- Ou Rode com interface visual
```bash
npx playwright test --ui
```