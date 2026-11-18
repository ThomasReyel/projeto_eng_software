import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import { Groups } from '@mui/icons-material';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

function DashboardLayout({ objeto = 'Listas' }) {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuOpen = isDesktop ? desktopOpen : mobileOpen;

  const handleToggleMenu = (novoEstado) => {
    if (isDesktop) {
      setDesktopOpen(novoEstado);
    } else {
      setMobileOpen(novoEstado);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <DashboardHeader
        logo={<Groups fontSize="medium" />}
        title={`Dashboard ${objeto}`}
        menuOpen={menuOpen}
        onToggleMenu={handleToggleMenu}
      />

      <DashboardSidebar
        open={desktopOpen}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        isDesktop={isDesktop}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          minWidth: 0,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;