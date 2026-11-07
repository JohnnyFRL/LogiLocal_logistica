
import type { Cliente } from "@/types/cliente";

const STORAGE_KEY = "logilocal:clientes";

export function salvarClientes(clientes: Cliente[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
}

export function carregarClientes(): Cliente[] {
  try {
    const dados = localStorage.getItem(STORAGE_KEY);

    if (!dados) return [];

    const clientes = JSON.parse(dados);

    if (!Array.isArray(clientes)) return [];

    return clientes.filter(
      (cliente): cliente is Cliente =>
        typeof cliente.id === "string" &&
        typeof cliente.nome === "string" &&
        Number.isFinite(cliente.x) &&
        Number.isFinite(cliente.y) &&
        Number.isFinite(cliente.demanda) &&
        cliente.demanda > 0
    );
  } catch {
    return [];
  }
}
