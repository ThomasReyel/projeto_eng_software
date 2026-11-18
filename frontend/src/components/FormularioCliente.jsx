import { Alert, Box, Button, Checkbox, FormControlLabel, Stack, TextField } from "@mui/material";
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
            <TextField
                id={campo}
                name={campo}
                label={rotulo}
                value={valores[campo]}
                onChange={handleChange}
                error={Boolean(mensagem)}
                helperText={mensagem}
                fullWidth
                {...props}
            />
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ maxWidth: 480, textAlign: "left" }}>
            <Stack spacing={2}>
                {errosApi.detalhe && <Alert severity="error">{errosApi.detalhe}</Alert>}

                {renderCampo("nome", "Nome *", { slotProps: { htmlInput: { maxLength: 150 } } })}
                {renderCampo("data_nascimento", "Data de nascimento *", {
                    type: "date",
                    slotProps: { inputLabel: { shrink: true } },
                })}
                {renderCampo("endereco", "Endereço *", { slotProps: { htmlInput: { maxLength: 255 } } })}
                {renderCampo("telefone", "Telefone *", {
                    type: "tel",
                    slotProps: { htmlInput: { maxLength: 20 } },
                })}
                {renderCampo("cpf", "CPF *", { slotProps: { htmlInput: { maxLength: 14 } } })}
                {renderCampo("email", "E-mail *", {
                    type: "email",
                    slotProps: { htmlInput: { maxLength: 254 } },
                })}

                {modoEdicao && (
                    <FormControlLabel
                        control={<Checkbox name="status" checked={valores.status} onChange={handleChange} />}
                        label="Cliente ativo"
                    />
                )}

                <Stack direction="row" spacing={1.5}>
                    <Button type="submit" variant="contained" disabled={enviando}>
                        {enviando ? "Salvando..." : modoEdicao ? "Salvar alterações" : "Cadastrar cliente"}
                    </Button>
                    <Button type="button" variant="outlined" onClick={onCancelar} disabled={enviando}>
                        Cancelar
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}

export default FormularioCliente;
