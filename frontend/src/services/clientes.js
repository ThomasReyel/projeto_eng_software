import api, { extractList, USE_MOCK_DATA } from './api';

const ENDPOINT = '/clientes/';

const clientesSimulados = [
  {
    id: 1,
    nome: 'Ana Beatriz Silva',
    data_nascimento: '1992-04-15',
    endereco: 'Rua das Flores, 120 - Centro',
    telefone: '(11) 98765-4321',
    cpf: '123.456.789-01',
    email: 'ana.silva@email.com',
    status: true,
  },
  {
    id: 2,
    nome: 'Carlos Eduardo Souza',
    data_nascimento: '1985-11-23',
    endereco: 'Av. Paulista, 1500 - Bela Vista',
    telefone: '(11) 91234-5678',
    cpf: '234.567.890-12',
    email: 'carlos.souza@email.com',
    status: true,
  },
  {
    id: 3,
    nome: 'Mariana Costa Oliveira',
    data_nascimento: '1998-07-08',
    endereco: 'Rua Bahia, 45 - Savassi',
    telefone: '(31) 99876-1122',
    cpf: '345.678.901-23',
    email: 'mariana.costa@email.com',
    status: false,
  },
  {
    id: 4,
    nome: 'João Pedro Almeida',
    data_nascimento: '1979-01-30',
    endereco: 'Rua Sete de Setembro, 890 - Centro',
    telefone: '(21) 97654-3344',
    cpf: '456.789.012-34',
    email: 'joao.almeida@email.com',
    status: true,
  },
  {
    id: 5,
    nome: 'Fernanda Lima Rocha',
    data_nascimento: '1995-09-12',
    endereco: 'Av. Atlântica, 320 - Copacabana',
    telefone: '(21) 96543-7788',
    cpf: '567.890.123-45',
    email: 'fernanda.rocha@email.com',
    status: false,
  },
  {
    id: 6,
    nome: 'Ricardo Mendes Ferreira',
    data_nascimento: '1988-06-19',
    endereco: 'Rua XV de Novembro, 510 - Centro',
    telefone: '(41) 99123-4455',
    cpf: '678.901.234-56',
    email: 'ricardo.ferreira@email.com',
    status: true,
  },
  {
    id: 7,
    nome: 'Juliana Martins Santos',
    data_nascimento: '2001-03-27',
    endereco: 'Av. Boa Viagem, 1020 - Boa Viagem',
    telefone: '(81) 98877-6655',
    cpf: '789.012.345-67',
    email: 'juliana.santos@email.com',
    status: true,
  },
];

export async function listarClientes() {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...clientesSimulados]), 250);
    });
  }

  const resposta = await api.get(ENDPOINT);
  return extractList(resposta.data);
}

export async function excluirCliente(id) {
  if (USE_MOCK_DATA) {
    return Promise.resolve();
  }

  await api.delete(`${ENDPOINT}${id}/`);
}