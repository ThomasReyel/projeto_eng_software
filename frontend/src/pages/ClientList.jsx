import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { Add, Refresh } from '@mui/icons-material';
import HeaderIconButton from '../components/ui/HeaderIconButton';
import DataTable from '../components/ui/DataTable';
import { excluirCliente, listarClientes } from '../services/clientes';

const colunasClientes = [
  { campo: 'id', titulo: 'ID', ocultarPorPadrao: true },
  { campo: 'nome', titulo: 'Nome' },
  { campo: 'cpf', titulo: 'CPF' },
  { campo: 'email', titulo: 'E-mail' },
  { campo: 'telefone', titulo: 'Telefone' },
  {
    campo: 'data_nascimento',
    titulo: 'Nascimento',
    formatar: (valor) => (valor ? valor.split('-').reverse().join('/') : '—'),
  },
  { campo: 'endereco', titulo: 'Endereço' },
  {
    campo: 'status',
    titulo: 'Status',
    formatar: (ativo) => (
      <Chip
        label={ativo ? 'Ativo' : 'Inativo'}
        color={ativo ? 'success' : 'default'}
        size="small"
        variant="outlined"
      />
    ),
  },
];

function ClientList() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregarClientes = async () => {
    setCarregando(true);
    setErro('');

    try {
      const lista = await listarClientes();
      setClientes(lista);
    } catch {
      setErro('Não foi possível carregar a lista de clientes. Verifique se o servidor está ativo.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const handleExcluir = async (cliente) => {
    const confirmou = window.confirm(`Deseja realmente excluir o cliente "${cliente.nome}"?`);
    if (!confirmou) return;

    try {
      await excluirCliente(cliente.id);
      setClientes((prev) => prev.filter((item) => item.id !== cliente.id));
    } catch {
      setErro('Erro ao excluir o cliente.');
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Clientes
        </Typography>

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <HeaderIconButton title="Atualizar lista" onClick={carregarClientes}>
            <Refresh fontSize="small" />
          </HeaderIconButton>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/clientes/novo')}
            sx={{
              height: 36,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Novo cliente
          </Button>
        </Stack>
      </Stack>

      <DataTable
        colunas={colunasClientes}
        dados={clientes}
        carregando={carregando}
        erro={erro}
        onEditar={(cliente) => navigate(`/clientes/${cliente.id}/editar`)}
        onExcluir={handleExcluir}
        mensagemVazia="Nenhum cliente cadastrado."
      />
    </Box>
  );
}

export default ClientList;