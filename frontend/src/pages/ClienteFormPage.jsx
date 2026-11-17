import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormularioCliente from "../components/FormularioCliente";
import { atualizarCliente, buscarCliente, criarCliente } from "../services/clienteService";

// Converte o erro do axios em { campo: ['msg'] } (+ "detalhe" para erros gerais)
function extrairErros(erro) {
    const dados = erro.response?.data;
    if (erro.response?.status === 400 && dados && typeof dados === "object") return dados;
    if (erro.response?.status === 404) return { detalhe: "Cliente não encontrado." };
    if (!erro.response)
        return { detalhe: "Não foi possível conectar ao servidor. Verifique se o back-end está rodando." };
    return { detalhe: "Ocorreu um erro inesperado. Tente novamente." };
}

// Rota /clientes/novo       -> cria
// Rota /clientes/:id/editar -> edita
function ClienteFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const modoEdicao = Boolean(id);

    const [cliente, setCliente] = useState(null);
    const [carregando, setCarregando] = useState(modoEdicao);
    const [enviando, setEnviando] = useState(false);
    const [erros, setErros] = useState({});

    // Na edição, carrega os dados do cliente (GET /api/clientes/{id}/)
    useEffect(() => {
        if (!modoEdicao) return;
        buscarCliente(id)
            .then(setCliente)
            .catch(erro => setErros(extrairErros(erro)))
            .finally(() => setCarregando(false));
    }, [id, modoEdicao]);

    async function salvar(dados) {
        setEnviando(true);
        setErros({});
        try {
            if (modoEdicao) await atualizarCliente(id, dados);
            else await criarCliente(dados);
            navigate("/clientes");
        } catch (erro) {
            setErros(extrairErros(erro));
        } finally {
            setEnviando(false);
        }
    }

    if (carregando) return <p>Carregando cliente...</p>;
    // Edição que falhou ao carregar: mostra o erro em vez de um formulário vazio
    if (modoEdicao && !cliente)
        return (
            <p role="alert" style={{ color: "#dc2626" }}>
                {erros.detalhe}
            </p>
        );

    return (
        <section style={{ marginTop: "1.5rem" }}>
            <h3>{modoEdicao ? "Editar cliente" : "Novo cliente"}</h3>
            <FormularioCliente
                valoresIniciais={cliente ?? undefined}
                onSubmit={salvar}
                onCancelar={() => navigate("/clientes")}
                enviando={enviando}
                errosApi={erros}
                modoEdicao={modoEdicao}
            />
        </section>
    );
}

export default ClienteFormPage;
