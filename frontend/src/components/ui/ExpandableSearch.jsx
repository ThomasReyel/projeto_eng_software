import { useEffect, useRef, useState } from 'react';
import { Box, IconButton, InputBase, Tooltip } from '@mui/material';
import { Close, Search } from '@mui/icons-material';

function ExpandableSearch({
  value = '',
  onChange,
  placeholder = 'Pesquisar...',
  expandedWidth = { xs: 200, sm: 260 },
  autoCollapseDelay = 3000,
}) {
  const [aberta, setAberta] = useState(false);
  const inputRef = useRef(null);

  // Recolhe automaticamente após ficar parada e vazia
  useEffect(() => {
    if (!aberta || value.trim() !== '') return;

    const timer = setTimeout(() => {
      setAberta(false);
    }, autoCollapseDelay);

    return () => clearTimeout(timer);
  }, [aberta, value, autoCollapseDelay]);

  const abrirPesquisa = () => {
    if (aberta) return;
    setAberta(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const fecharPesquisa = (e) => {
    e.stopPropagation();
    onChange('');
    setAberta(false);
  };

  return (
    <Tooltip title={aberta ? '' : 'Pesquisar'}>
      <Box
        onClick={abrirPesquisa}
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          height: 36,
          width: aberta ? expandedWidth : 36,
          borderRadius: '8px',
          border: '1px solid',
          borderColor: aberta ? 'primary.main' : 'divider',
          bgcolor: 'background.paper',
          overflow: 'hidden',
          cursor: aberta ? 'text' : 'pointer',
          transition: theme.transitions.create(
            ['width', 'border-color', 'background-color'],
            {
              duration: 250,
              easing: theme.transitions.easing.easeInOut,
            }
          ),
          '&:hover': {
            bgcolor: aberta ? 'background.paper' : 'action.hover',
          },
        })}
      >
        {/* Ícone da lupa fixo à esquerda (centralizado nos 36px quando fechado) */}
        <Box
          sx={{
            width: 34,
            height: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Search fontSize="small" color={aberta ? 'primary' : 'action'} />
        </Box>

        {/* Campo de texto que aparece suavemente ao expandir */}
        <InputBase
          inputRef={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => {
            if (value.trim() === '') {
              setAberta(false);
            }
          }}
          placeholder={placeholder}
          inputProps={{ 'aria-label': placeholder }}
          sx={{
            flex: 1,
            fontSize: '0.875rem',
            opacity: aberta ? 1 : 0,
            pointerEvents: aberta ? 'auto' : 'none',
            transition: 'opacity 200ms ease 60ms',
          }}
        />

        {/* Botão de fechar/limpar */}
        {aberta && (
          <IconButton
            size="small"
            aria-label="Fechar pesquisa"
            onMouseDown={(e) => e.preventDefault()}
            onClick={fecharPesquisa}
            sx={{ mr: 0.5, p: 0.5, flexShrink: 0 }}
          >
            <Close sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Box>
    </Tooltip>
  );
}

export default ExpandableSearch;