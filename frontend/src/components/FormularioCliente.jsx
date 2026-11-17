import { useState } from "react";

const CAMPOS_OBRIGATORIOS = {
    nome: "O nome é obrigatório.",
    data_nascimento: "A data de nascimento é obrigatória.",
    endereco: "O endereço é obrigatório.",
    telefone: "O telefone é obrigatório.",
    cpf: "O CPF é obrigatório.",
    email: "O e-mail é obrigatório.",
};

const VALORES_INICIAIS = {
    nome: "",
    data_nascimento: "",
    endereco: "",
    telefone: "",
    cpf: "",
    email: "",
    status: true,
};

const estilos = {
    form: { display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "480px", textAlign: "left" },
    campo: { display: "flex", flexDirection: "column", gap: "0.25rem" },
    input: { padding: "0.5rem", fontSize: "1rem" },
    erro: { color: "#dc2626", fontSize: "0.85rem" },
    erroGeral: { color: "#dc2626", border: "1px solid #dc2626", padding: "0.75rem", borderRadius: "4px" },
    botoes: { display: "flex", gap: "0.75rem" },
};

function validar(valores) {
    const erros = {};
    Object.entries(CAMPOS_OBRIGATORIOS).forEach(([campo, mensagem]) => {
        if (!String(valores[campo] ?? "").trim()) erros[campo] = mensagem;
    });
    return erros;
}

// Formulário reutilizado para criar e editar.
// - valoresIniciais: dados do cliente (modo edição); vazio no modo criação
// - onSubmit(dados): função que chama a API (criar ou atualizar)
// - errosApi: erros devolvidos pela API, no formato do DRF ({ campo: ['msg'] })
function FormularioCliente({
    valoresIniciais,
    onSubmit,
    onCancelar,
    enviando = false,
    errosApi = {},
    modoEdicao = false,
}) {
    const [valores, setValores] = useState({ ...VALORES_INICIAIS, ...valoresIniciais });
    const [errosFront, setErrosFront] = useState({});

    function handleChange(evento) {
        const { name, value, type, checked } = evento.target;
        setValores(anterior => ({ ...anterior, [name]: type === "checkbox" ? checked : value }));
        setErrosFront(anterior => ({ ...anterior, [name]: undefined }));
    }

    function handleSubmit(evento) {
        evento.preventDefault();
        const erros = validar(valores);
        setErrosFront(erros);
        if (Object.keys(erros).length > 0) return;

        onSubmit({
            ...valores,
            nome: valores.nome.trim(),
            endereco: valores.endereco.trim(),
            telefone: valores.telefone.trim(),
            cpf: valores.cpf.trim(),
            email: valores.email.trim(),
        });
    }

    // Mostra o erro do front ou, se não houver, o que a API devolveu para o campo
    function mensagemDe(campo) {
        if (errosFront[campo]) return errosFront[campo];
        const doServidor = errosApi[campo];
        return Array.isArray(doServidor) ? doServidor.join(" ") : doServidor;
    }

    function renderCampo(campo, rotulo, props = {}) {
        const mensagem = mensagemDe(campo);
        return (
            <div style={estilos.campo}>
                <label htmlFor={campo}>{rotulo}</label>
                <input
                    id={campo}
                    name={campo}
                    value={valores[campo]}
                    onChange={handleChange}
                    style={{ ...estilos.input, ...(mensagem ? { borderColor: "#dc2626" } : {}) }}
                    aria-invalid={Boolean(mensagem)}
                    {...props}
                />
                {mensagem && (
                    <span style={estilos.erro} role="alert">
                        {mensagem}
                    </span>
                )}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={estilos.form} noValidate>
            {errosApi.detalhe && (
                <div style={estilos.erroGeral} role="alert">
                    {errosApi.detalhe}
                </div>
            )}

            {renderCampo("nome", "Nome *", { maxLength: 150 })}
            {renderCampo("data_nascimento", "Data de nascimento *", { type: "date" })}
            {renderCampo("endereco", "Endereço *", { maxLength: 255 })}
            {renderCampo("telefone", "Telefone *", { type: "tel", maxLength: 20 })}
            {renderCampo("cpf", "CPF *", { maxLength: 14 })}
            {renderCampo("email", "E-mail *", { type: "email", maxLength: 254 })}

            {modoEdicao && (
                <label>
                    <input type="checkbox" name="status" checked={valores.status} onChange={handleChange} /> Cliente
                    ativo
                </label>
            )}

            <div style={estilos.botoes}>
                <button type="submit" disabled={enviando}>
                    {enviando ? "Salvando..." : modoEdicao ? "Salvar alterações" : "Cadastrar cliente"}
                </button>
                <button type="button" onClick={onCancelar} disabled={enviando}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default FormularioCliente;
