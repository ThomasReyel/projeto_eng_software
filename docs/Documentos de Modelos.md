
# Documento de Modelos

## Modelo Conceitual

### Diagrama de Classes usando Mermaid
...

### Descrição das Entidades

| Entidade | Descrição   |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
|

## Modelo de Dados (Entidade-Relacionamento)

```mermaid
erDiagram
    Conta }|--|{ Pagamento: possui
    Conta ||--|| Venda: possui
    Venda }|--|{ Produto: contém
    Funcionário ||--|{ Venda: Vendeu
    Pagamento }o--|| Cliente: Realizou
    Cliente ||--o{ Conta: possui
    Cliente ||--o{ Venda: possui

```
|  Nome         | Descrição                        | Tipo de Dado | Tamanho | Restrições de Domínio |
| ------------- | -------------------------------- | ------------ | ------- | --------------------- |

