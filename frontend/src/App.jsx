import { useEffect, useState } from 'react';
import api from './services/api';
import Navbar from './components/Navbar';
import ClientesPage from './pages/ClientesPage';

function App() {
  const [statusApi, setStatusApi] = useState('Verificando conexão com o back-end...');

  useEffect(() => {
    api.get('/')
      .then((response) => {
        setStatusApi('Conectado! Resposta: ' + JSON.stringify(response.data));
      })
      .catch((error) => {
        setStatusApi('Aguardando back-end ou liberação de CORS (' + error.message + ')');
      });
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <p><strong>Status da API:</strong> {statusApi}</p>
        <hr />
        <ClientesPage />
      </main>
    </div>
  );
}

export default App;