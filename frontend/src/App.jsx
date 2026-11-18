import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Typography } from '@mui/material';
import AppTheme from './theme/AppTheme';
import DashboardLayout from './components/layout/DashboardLayout';
import Home from './pages/Home';
import ClientList from './pages/ClientList';
import ClienteFormPage from "./pages/ClienteFormPage";

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
              element={<ClienteFormPage />}
            />
            <Route
              path="/clientes/:id/editar"
              element={<ClienteFormPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppTheme>
  );
}

export default App;
