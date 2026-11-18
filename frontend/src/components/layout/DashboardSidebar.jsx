import { useLocation, useNavigate } from 'react-router-dom';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { SYSTEM_MODULES } from '../../config/modules';

const DRAWER_WIDTH = 240;
const MINI_DRAWER_WIDTH = 80;

// Agrupa os módulos por categoria automaticamente
const menuSections = SYSTEM_MODULES.reduce((acc, mod) => {
  const existing = acc.find((sec) => sec.category === mod.category);
  if (existing) {
    existing.items.push(mod);
  } else {
    acc.push({ category: mod.category, items: [mod] });
  }
  return acc;
}, []);

function DashboardSidebar({ open, mobileOpen, onCloseMobile, isDesktop }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const larguraAtual = open ? DRAWER_WIDTH : MINI_DRAWER_WIDTH;
  const transicaoLargura = theme.transitions.create('width');

  const renderConteudo = (expandido) => (
    <Box sx={{ overflowX: 'hidden', overflowY: 'auto' }}>
      <Toolbar />

      <Box sx={{ px: expandido ? 2 : 1, pt: 2 }}>
        {menuSections.map((secao) => (
          <Box key={secao.category} sx={{ mb: 2 }}>
            {expandido && (
              <Typography
                component="div"
                sx={{
                  mb: 0.75,
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                }}
              >
                {secao.category}
              </Typography>
            )}

            <List
              disablePadding
              sx={
                expandido
                  ? {
                      ml: 0.75,
                      pl: 1.25,
                      borderLeft: '1px solid',
                      borderColor: 'divider',
                    }
                  : undefined
              }
            >
              {secao.items.map((item) => {
                const IconComponent = item.icon;
                const ativo = location.pathname.startsWith(item.route);

                return (
                  <ListItem key={item.route} disablePadding sx={{ mb: 0.5 }}>
                    <Tooltip
                      title={expandido ? '' : item.label}
                      placement="right"
                      enterDelay={600}
                    >
                      <ListItemButton
                        selected={ativo}
                        onClick={() => {
                          navigate(item.route);
                          if (!isDesktop) onCloseMobile();
                        }}
                        sx={{
                          borderRadius: '8px',
                          border: '1px solid transparent',
                          flexDirection: expandido ? 'row' : 'column',
                          justifyContent: expandido ? 'flex-start' : 'center',
                          alignItems: 'center',
                          gap: expandido ? 1.5 : 0.5,
                          px: expandido ? 1.25 : 0.5,
                          py: expandido ? 0.9 : 1.15,
                          minHeight: expandido ? 42 : 60,
                          color: 'text.secondary',
                          transition: 'border-color 0.2s, background-color 0.2s, color 0.2s',
                          '&.Mui-selected': {
                            backgroundColor: 'action.selected',
                            borderColor: 'transparent',
                            color: 'text.primary',
                          },
                          '&:hover, &.Mui-selected:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.12),
                            borderColor: alpha(theme.palette.primary.main, 0.45),
                            color: 'primary.main',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                          <IconComponent />
                        </ListItemIcon>

                        <Typography
                          noWrap
                          sx={{
                            maxWidth: '100%',
                            fontSize: expandido ? '0.9rem' : '0.625rem',
                            lineHeight: 1.2,
                            fontWeight: 400,
                            color: 'inherit',
                          }}
                        >
                          {item.label}
                        </Typography>
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onCloseMobile}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
        }}
      >
        {renderConteudo(true)}
      </Drawer>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          display: { xs: 'none', md: 'block' },
          width: larguraAtual,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          transition: transicaoLargura,
          '& .MuiDrawer-paper': {
            width: larguraAtual,
            overflowX: 'hidden',
            borderRight: 1,
            borderColor: 'divider',
            transition: transicaoLargura,
          },
        }}
      >
        {renderConteudo(open)}
      </Drawer>
    </>
  );
}

export default DashboardSidebar;