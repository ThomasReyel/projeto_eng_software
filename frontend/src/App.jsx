import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Typography } from '@mui/material';
import AppTheme from './theme/AppTheme';
import DashboardLayout from './components/layout/DashboardLayout';
import Home from './pages/Home';
import ClientList from './pages/ClientList';

function App() {
  return (
    <AppTheme>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<DashboardLayout />}>
            <Route path="/clientes" element={<ClientList />} />
            <Route
              path="/clientes/novo"
              element={<Typography variant="h6">Formulário de Novo Cliente (próxima issue)</Typography>}
            />
            <Route
              path="/clientes/:id/editar"
              element={<Typography variant="h6">Formulário de Edição de Cliente (próxima issue)</Typography>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppTheme>
  );
}

export default App;