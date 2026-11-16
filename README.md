# Sistema de Controle de Vendas Fiadas

## 📖 Resumo

Projeto acadêmico desenvolvido para as disciplinas de Engenharia de Software 1 e 2, do curso de Sistemas de Informação. O sistema tem como objetivo automatizar o controle de vendas fiadas em estabelecimentos comerciais, substituindo processos manuais baseados em registros em papel por uma solução digital padronizada. A aplicação permitirá o cadastro organizado de clientes, o registro de vendas e pagamentos com histórico completo, a consulta de contas e a identificação de débitos em aberto, além do envio de notificações sobre contas atrasadas e da geração de listas de clientes inadimplentes. O sistema abrangerá o gerenciamento de clientes (ativos e inativos), contas, vendas, pagamentos, produtos e funcionários, podendo ser adaptado a diferentes tipos de comércio e proporcionando mais agilidade, segurança e controle financeiro para o estabelecimento.

## Como Rodar o Projeto

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>
```

---

### 2. Rodar o Backend (Django + DRF)

### 2.1. Entrar na pasta do backend

```bash
cd backend
```

### 2.2. Criar e ativar o ambiente virtual

**Linux / macOS:**
```bash
python -m venv .venv
source .venv/bin/activate
```

**Windows (PowerShell):**
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
python -m venv .venv
.venv\Scripts\activate.bat
```

> Após ativar, o prompt deve mostrar `(.venv)` no início da linha.

### 2.3. Instalar as dependências

```bash
pip install -r requirements.txt
```

> **Nota:** Se o `requirements.txt` ainda não existir (primeira execução do time), instale manualmente e gere o arquivo:
> ```bash
> pip install django djangorestframework django-cors-headers
> pip freeze > requirements.txt
> ```

### 2.4. Aplicar as migrações do banco (SQLite)

```bash
python manage.py migrate
```

Isso cria o arquivo `db.sqlite3` com as tabelas padrão do Django e do app `clientes`.

## Tecnologias

Abaixo estão as principais tecnologias e ferramentas empregadas no desenvolvimento deste projeto:

### 🎨 Front-end
* **React** — Biblioteca JavaScript para construção de interfaces de usuário reativas e baseadas em componentes.

### ⚙️ Back-end
* **Python**
* **Django**
* **Django REST Framework (DRF)** 

### 🗄️ Banco de Dados
* **SQLite** — Utilizado em ambiente de **desenvolvimento e testes**.
* **PostgreSQL** — Banco de dados relacional utilizado em ambiente de **produção**.

## Equipe

> _(A preencher)_
