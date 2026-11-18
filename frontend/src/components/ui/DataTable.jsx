import { useMemo, useState } from 'react';
import {
  Alert,
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Popover,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from '@mui/material';
import {
  DeleteOutlined,
  EditOutlined,
  FilterList,
  ViewColumn,
} from '@mui/icons-material';
import HeaderIconButton from './HeaderIconButton';
import ExpandableSearch from './ExpandableSearch';

function textoPesquisavel(valor) {
  if (valor === null || valor === undefined) return '';
  if (typeof valor === 'boolean') return valor ? 'ativo sim' : 'inativo não';
  return String(valor).toLowerCase();
}

function DataTable({
  colunas = [],
  dados = [],
  carregando = false,
  erro = '',
  onEditar,
  onExcluir,
  mensagemVazia = 'Nenhum registro encontrado.',
}) {
  const [colunasVisiveis, setColunasVisiveis] = useState(() =>
    Object.fromEntries(colunas.map((col) => [col.campo, !col.ocultarPorPadrao]))
  );
  const [anchorColunas, setAnchorColunas] = useState(null);

  const [anchorFiltro, setAnchorFiltro] = useState(null);
  const [colunaFiltro, setColunaFiltro] = useState(colunas[0]?.campo || '');
  const [valorFiltro, setValorFiltro] = useState('');

  const [termoBusca, setTermoBusca] = useState('');

  const [ordenarPor, setOrdenarPor] = useState('');
  const [direcaoOrdem, setDirecaoOrdem] = useState('asc');
  const [pagina, setPagina] = useState(0);
  const [linhasPorPagina, setLinhasPorPagina] = useState(10);

  const colunasAtivas = colunas.filter((col) => colunasVisiveis[col.campo]);
  const temAcoes = Boolean(onEditar || onExcluir);
  const filtroAtivo = valorFiltro.trim() !== '';

  const alternarColuna = (campo) => {
    const totalVisiveis = Object.values(colunasVisiveis).filter(Boolean).length;
    if (colunasVisiveis[campo] && totalVisiveis <= 1) return;

    setColunasVisiveis((prev) => ({
      ...prev,
      [campo]: !prev[campo],
    }));
  };

  const mostrarTodasColunas = () => {
    setColunasVisiveis(
      Object.fromEntries(colunas.map((col) => [col.campo, true]))
    );
  };

  const handleOrdenar = (campo) => {
    const mesmaColuna = ordenarPor === campo;
    setDirecaoOrdem(mesmaColuna && direcaoOrdem === 'asc' ? 'desc' : 'asc');
    setOrdenarPor(campo);
  };

  const dadosFiltrados = useMemo(() => {
    const busca = termoBusca.trim().toLowerCase();
    const filtro = valorFiltro.trim().toLowerCase();

    const lista = dados.filter((linha) => {
      const passaBusca =
        !busca ||
        colunas.some((col) =>
          textoPesquisavel(linha[col.campo]).includes(busca)
        );

      const passaFiltro =
        !filtro ||
        !colunaFiltro ||
        textoPesquisavel(linha[colunaFiltro]).includes(filtro);

      return passaBusca && passaFiltro;
    });

    if (!ordenarPor) return lista;

    return [...lista].sort((a, b) => {
      const valorA = a[ordenarPor] ?? '';
      const valorB = b[ordenarPor] ?? '';

      if (valorA < valorB) return direcaoOrdem === 'asc' ? -1 : 1;
      if (valorA > valorB) return direcaoOrdem === 'asc' ? 1 : -1;
      return 0;
    });
  }, [dados, colunas, termoBusca, valorFiltro, colunaFiltro, ordenarPor, direcaoOrdem]);

  const dadosPaginados = dadosFiltrados.slice(
    pagina * linhasPorPagina,
    pagina * linhasPorPagina + linhasPorPagina
  );

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Barra superior da tabela */}
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1.5,
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {dadosFiltrados.length}{' '}
          {dadosFiltrados.length === 1 ? 'registro' : 'registros'}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <HeaderIconButton
            title="Mostrar ou ocultar colunas"
            onClick={(e) => setAnchorColunas(e.currentTarget)}
          >
            <ViewColumn fontSize="small" />
          </HeaderIconButton>

          <HeaderIconButton
            title="Filtrar registros"
            onClick={(e) => setAnchorFiltro(e.currentTarget)}
          >
            <Badge color="primary" variant="dot" invisible={!filtroAtivo}>
              <FilterList fontSize="small" />
            </Badge>
          </HeaderIconButton>

          <ExpandableSearch
            value={termoBusca}
            onChange={(novoValor) => {
              setTermoBusca(novoValor);
              setPagina(0);
            }}
            placeholder="Pesquisar na lista..."
          />
        </Stack>
      </Stack>

      {/* Menu flutuante de Colunas */}
      <Popover
        open={Boolean(anchorColunas)}
        anchorEl={anchorColunas}
        onClose={() => setAnchorColunas(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2, minWidth: 210 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Colunas visíveis
          </Typography>

          <Stack>
            {colunas.map((col) => (
              <FormControlLabel
                key={col.campo}
                label={col.titulo}
                control={
                  <Checkbox
                    size="small"
                    checked={Boolean(colunasVisiveis[col.campo])}
                    onChange={() => alternarColuna(col.campo)}
                  />
                }
              />
            ))}
          </Stack>

          <Divider sx={{ my: 1 }} />

          <Button
            size="small"
            fullWidth
            onClick={mostrarTodasColunas}
            sx={{ textTransform: 'none' }}
          >
            Mostrar todas
          </Button>
        </Box>
      </Popover>

      {/* Menu flutuante de Filtros */}
      <Popover
        open={Boolean(anchorFiltro)}
        anchorEl={anchorFiltro}
        onClose={() => setAnchorFiltro(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2, width: 260 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Filtrar por coluna
          </Typography>

          <Stack spacing={1.5}>
            <FormControl size="small" fullWidth>
              <InputLabel>Coluna</InputLabel>
              <Select
                label="Coluna"
                value={colunaFiltro}
                onChange={(e) => {
                  setColunaFiltro(e.target.value);
                  setPagina(0);
                }}
              >
                {colunas.map((col) => (
                  <MenuItem key={col.campo} value={col.campo}>
                    {col.titulo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              size="small"
              label="Contém o valor"
              placeholder="Digite para filtrar..."
              value={valorFiltro}
              onChange={(e) => {
                setValorFiltro(e.target.value);
                setPagina(0);
              }}
              fullWidth
            />

            {filtroAtivo && (
              <Button
                size="small"
                color="inherit"
                onClick={() => {
                  setValorFiltro('');
                  setPagina(0);
                }}
                sx={{ textTransform: 'none' }}
              >
                Limpar filtro
              </Button>
            )}
          </Stack>
        </Box>
      </Popover>

      {carregando && <LinearProgress />}
      {erro && (
        <Alert severity="error" sx={{ m: 2 }}>
          {erro}
        </Alert>
      )}

      {/* Tabela de Dados */}
      <TableContainer>
        <Table size="medium">
          <TableHead>
            <TableRow>
              {colunasAtivas.map((col) => (
                <TableCell
                  key={col.campo}
                  align={col.alinhamento || 'left'}
                  sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}
                >
                  <TableSortLabel
                    active={ordenarPor === col.campo}
                    direction={ordenarPor === col.campo ? direcaoOrdem : 'asc'}
                    onClick={() => handleOrdenar(col.campo)}
                  >
                    {col.titulo}
                  </TableSortLabel>
                </TableCell>
              ))}

              {temAcoes && (
                <TableCell align="right" sx={{ fontWeight: 600, width: 112 }}>
                  Ações
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {dadosPaginados.length > 0 ? (
              dadosPaginados.map((linha, index) => (
                <TableRow key={linha.id ?? index} hover>
                  {colunasAtivas.map((col) => {
                    const valor = linha[col.campo];
                    return (
                      <TableCell
                        key={col.campo}
                        align={col.alinhamento || 'left'}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        {col.formatar ? col.formatar(valor, linha) : valor ?? '—'}
                      </TableCell>
                    );
                  })}

                  {temAcoes && (
                    <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ justifyContent: 'flex-end' }}
                      >
                        {onEditar && (
                          <HeaderIconButton
                            title="Editar"
                            onClick={() => onEditar(linha)}
                          >
                            <EditOutlined fontSize="small" />
                          </HeaderIconButton>
                        )}

                        {onExcluir && (
                          <HeaderIconButton
                            title="Excluir"
                            onClick={() => onExcluir(linha)}
                          >
                            <DeleteOutlined fontSize="small" color="error" />
                          </HeaderIconButton>
                        )}
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              !carregando && (
                <TableRow>
                  <TableCell
                    colSpan={colunasAtivas.length + (temAcoes ? 1 : 0)}
                    align="center"
                    sx={{ py: 5 }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {mensagemVazia}
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={dadosFiltrados.length}
        page={pagina}
        onPageChange={(_, novaPagina) => setPagina(novaPagina)}
        rowsPerPage={linhasPorPagina}
        onRowsPerPageChange={(e) => {
          setLinhasPorPagina(parseInt(e.target.value, 10));
          setPagina(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} de ${count}`
        }
      />
    </Paper>
  );
}

export default DataTable;