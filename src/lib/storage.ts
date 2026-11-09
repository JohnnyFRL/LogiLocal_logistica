import type { Cliente } from "@/types/clients";

export function lerLocal<T>(chave: string): T[] {
  try {
    const valor = localStorage.getItem(chave);
    const parsed: unknown = valor ? JSON.parse(valor) : [];
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}
export function salvarLocal<T>(chave: string, dados: T[]): void {
  try {
    localStorage.setItem(chave, JSON.stringify(dados));
  } catch {
    /* navegador pode bloquear armazenamento */
  }
}

const STORAGE_KEY = "geonexus:clientes";

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
        cliente.demanda > 0,
    );
  } catch {
    return [];
  }
}
