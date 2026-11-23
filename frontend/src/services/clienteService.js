import api from "./api";

// POST /api/clientes/
export async function criarCliente(dados) {
    const { data } = await api.post("/clientes/", dados);
    return data;
}

// GET /api/clientes/{id}/
export async function buscarCliente(id) {
    const { data } = await api.get(`/clientes/${id}/`);
    return data;
}

// PUT /api/clientes/{id}/
export async function atualizarCliente(id, dados) {
    const { data } = await api.put(`/clientes/${id}/`, dados);
    return data;
}

export async function deletarCliente(id, dados) {
    const { data } = await api.delete(`/clientes/${id}/`, dados);
    return data;
}
