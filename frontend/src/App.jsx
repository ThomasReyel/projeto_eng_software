import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ClienteFormPage from "./pages/ClienteFormPage";
import ClientesPage from "./pages/ClientesPage";
import api from "./services/api";

function App() {
    const [statusApi, setStatusApi] = useState("Verificando conexão com o back-end...");

    // Acompanha o modo claro/escuro do sistema, como o index.css já faz
    const prefereEscuro = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = createTheme({ palette: { mode: prefereEscuro ? "dark" : "light" } });

    useEffect(() => {
        api.get("/")
            .then(response => {
                setStatusApi("Conectado! Resposta: " + JSON.stringify(response.data));
            })
            .catch(error => {
                setStatusApi("Aguardando back-end ou liberação de CORS (" + error.message + ")");
            });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <div style={{ fontFamily: "sans-serif" }}>
                    <Navbar />
                    <main style={{ padding: "2rem" }}>
                        <p>
                            <strong>Status da API:</strong> {statusApi}
                        </p>
                        <hr />
                        <Routes>
                            <Route path="/" element={<Navigate to="/clientes" replace />} />
                            <Route path="/clientes" element={<ClientesPage />} />
                            <Route path="/clientes/novo" element={<ClienteFormPage />} />
                            <Route path="/clientes/:id/editar" element={<ClienteFormPage />} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
