# Documento de Modelos

## Modelo Conceitual

### Diagrama de Classes usando Mermaid

```mermaid
classDiagram
    class Conta {
        -int id
        -char cpfCliente
        -venda venda
        -double valor_original
        -double valor_atual
        -boolean status
        +gerar_con(venda v) void
        +consultar_con(int id) conta
        +consultar_contas(char cpf) List~conta~
        +cancelar_con(conta id) conta
        +pagar_conta(double pagamento) void
        -alterar_valor_atual(double valor) void
    }

    class Conta_pagamento {
        -int id
        -pagamento pagamento
        -conta conta
        +cadastrar_pag_con(pagamento pag, conta con) void
        +cancelar_pag_con(int id) void
    }

    class Pagamento {
        -int id
        -DateTime data
        -cliente cli
        -double valor
        -boolean status
        +incluir_pag(pagamento p) void
        +desativar_pag(int id) void
        -validar_ven(venda ven) boolean
    }

    class Cliente {
        -int id
        -char nome
        -char cpf
        -char email
        -boolean status
        +incluir_cli(cliente cli) void
        +desativar_cli(char cpf) void
        +consultar_cli(char cpf) cliente
        +alterar_cli(char cpf) void
        +consultar_inadimplentes() List~cliente~
        -validar_cliente(cliente cli) boolean
    }

    class Venda {
        -int id
        -cliente cli
        -funcionario fun
        -double valor
        -DateTime data
        -boolean status
        +incluir_ven(venda v) void
        +desativar_ven(int id) void
        +consultar_ven(int id) venda
    }

    class Funcionario {
        -int id
        -char nome
        -int telefone
        -char cpf
        -char senha
        -boolean status
        +incluir_fun(funcionario f) void
        +desativar_fun(int id) void
        +consultar_fun(char cpf) funcionario
        +alterar_fun(funcionario f) void
        -validar_cpf(char cpf) boolean
        +realizar_login(char senha) boolean
        -validar_senha(char senha) boolean
    }

    class Venda_produto {
        -int id
        -produto pro
        -venda ven
        -int quantidade
        +cadastrar_ven_pro(produto pro, venda ven) double
        +cancelar_ven_pro(int id) void
        +valor_total(int quantidade, produto pro) double
    }

    class Produto {
        -int id
        -char nome
        -char marca
        -double preco
        -boolean status
        +incluir_pro(produto p) void
        +desativar_pro(int id) void
        +consultar_pro(int id) produto
        +alterar_pro(int id) void
    }

    Conta "1" --> "0..*" Conta_pagamento
    Pagamento "1" --> "0..*" Conta_pagamento
    Conta "1" --* "1" Venda
    Conta "0..*" -- "1" Cliente
    Cliente "1" --> "0..*" Pagamento
    Venda "0..*" -- "1" Cliente
    Venda "0..*" -- "1" Funcionario
    Venda "1" --> "0..*" Venda_produto
    Produto "1" --> "0..*" Venda_produto
```

### Descrição das Entidades

| Entidade        | Descrição                                                                                                                                                                                                                                                                                                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Conta           | Entidade que representa a dívida do cliente, gerada automaticamente a partir de uma venda. Possui as informações: id, cpfCliente, venda, valor_original, valor_atual, status. Operações: gerar_con(), consultar_con(), consultar_contas(), cancelar_con(), pagar_conta(), alterar_valor_atual(). O pagamento sempre abate a conta ativa mais antiga e o excedente é aplicado na próxima. |
| Conta_pagamento | Entidade associativa que relaciona uma Conta a um Pagamento, registrando quais pagamentos foram aplicados a cada conta. Possui as informações: id, pagamento, conta. Operações: cadastrar_pag_con(), cancelar_pag_con().                                                                                                                                                                 |
| Pagamento       | Entidade que representa um pagamento realizado por um cliente. Possui as informações: id, data, cli, valor, status. Operações: incluir_pag(), desativar_pag(), validar_ven().                                                                                                                                                                                                            |
| Cliente         | Entidade que representa o cliente da loja que compra fiado. Possui as informações: id, nome, cpf, email, status. Operações: incluir_cli(), desativar_cli(), consultar_cli(), alterar_cli(), consultar_inadimplentes(), validar_cliente(). Clientes recém-cadastrados iniciam como "não confiáveis", com limite de crédito de R$ 200.                                                     |
| Venda           | Entidade que representa uma venda fiada realizada por um funcionário para um cliente. Possui as informações: id, cli, fun, valor, data, status. Operações: incluir_ven(), desativar_ven(), consultar_ven(). Cada venda gera uma Conta.                                                                                                                                                   |
| Funcionario     | Entidade que representa o funcionário que opera o sistema e registra as vendas e pagamentos. Possui as informações: id, nome, telefone, cpf, senha, status. Operações: incluir_fun(), desativar_fun(), consultar_fun(), alterar_fun(), validar_cpf(), realizar_login(), validar_senha(). O login é feito apenas com a senha.                                                             |
| Venda_produto   | Entidade associativa que relaciona uma Venda aos Produtos vendidos, com a quantidade de cada um. Possui as informações: id, pro, ven, quantidade. Operações: cadastrar_ven_pro(), cancelar_ven_pro(), valor_total().                                                                                                                                                                     |
| Produto         | Entidade que representa os produtos comercializados pela loja. Possui as informações: id, nome, marca, preco, status. Operações: incluir_pro(), desativar_pro(), consultar_pro(), alterar_pro().                                                                                                                                                                                         |

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

| Nome | Descrição | Tipo de Dado | Tamanho | Restrições de Domínio |
| ---- | --------- | ------------ | ------- | --------------------- |
