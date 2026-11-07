import type { Cliente, ResultadoAnalise } from "@/types/clients";
export function calcularCentroGravidade(clientes: Cliente[]): ResultadoAnalise {
  const demandaTotal = clientes.reduce((sum, c) => sum + c.demanda, 0);
  const x =
    clientes.reduce((sum, c) => sum + c.x * c.demanda, 0) / demandaTotal;
  const y =
    clientes.reduce((sum, c) => sum + c.y * c.demanda, 0) / demandaTotal;
  if (![demandaTotal, x, y].every(Number.isFinite) || demandaTotal <= 0) {
    throw new Error("Resultado numérico inválido.");
  }
  return { x, y, demandaTotal, quantidadeClientes: clientes.length };
}
