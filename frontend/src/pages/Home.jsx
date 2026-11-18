import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { ArrowForward, Groups, Refresh } from '@mui/icons-material';
import ColorModeSelect from '../components/ui/ColorModeSelect';
import HeaderIconButton from '../components/ui/HeaderIconButton';
import api from '../services/api';
import { SYSTEM_MODULES } from '../config/modules';

const NOME_SISTEMA = 'Sistema de Gestão';

const configStatus = {
  verificando: {
    cor: 'warning.main',
    descricao: 'Verificando conexão com o banco de dados...',
  },
  online: {
    cor: 'success.main',
    descricao: 'Banco de dados conectado e operando normalmente.',
  },
  offline: {
    cor: 'error.main',
    descricao: 'Falha na conexão com o banco de dados.',
  },
};

function Home() {
  const navigate = useNavigate();
  const [statusBanco, setStatusBanco] = useState('verificando');

  const verificarConexao = async () => {
    setStatusBanco('verificando');
    try {
      await api.get(SYSTEM_MODULES[0].endpoint);
      setStatusBanco('online');
    } catch {
      setStatusBanco('offline');
    }
  };

  useEffect(() => {
    verificarConexao();
  }, []);

  const statusAtual = configStatus[statusBanco];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar
        color="inherit"
        position="sticky"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Toolbar>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
              <Groups fontSize="medium" />
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>
                {NOME_SISTEMA}
              </Typography>
            </Stack>

            <ColorModeSelect />
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              {NOME_SISTEMA}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Central de acesso rápido aos módulos administrativos e monitoramento do sistema.
            </Typography>
          </Box>

          <Paper sx={{ p: 2.5 }}>
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: statusAtual.cor,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Status do Banco de Dados
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {statusAtual.descricao}
                  </Typography>
                </Box>
              </Stack>

              <HeaderIconButton
                title="Testar conexão novamente"
                onClick={verificarConexao}
              >
                <Refresh fontSize="small" />
              </HeaderIconButton>
            </Stack>
          </Paper>

          <Stack spacing={2}>
            {SYSTEM_MODULES.map((modulo) => {
              const IconComponent = modulo.icon;
              return (
                <Paper key={modulo.id} sx={{ p: 3 }}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                    }}
                  >
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: '10px',
                          bgcolor: 'action.hover',
                          display: 'flex',
                        }}
                      >
                        <IconComponent color="primary" />
                      </Box>

                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {modulo.dashboardTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {modulo.description}
                        </Typography>
                      </Box>
                    </Stack>

                    <Button
                      variant="contained"
                      endIcon={<ArrowForward />}
                      onClick={() => navigate(modulo.route)}
                      sx={{ textTransform: 'none', fontWeight: 600, flexShrink: 0 }}
                    >
                      Acessar
                    </Button>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Home;