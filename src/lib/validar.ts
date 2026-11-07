import type { Cliente } from "@/types/clients";
import type { Instalacao } from "@/types/instalacao";
export function objeto(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}
const valido = (x: unknown): x is number =>
  typeof x === "number" && Number.isFinite(x);
export function clienteValido(x: unknown): x is Cliente {
  return (
    objeto(x) &&
    typeof x.id === "string" &&
    !!x.id.trim() &&
    typeof x.nome === "string" &&
    !!x.nome.trim() &&
    valido(x.x) &&
    valido(x.y) &&
    valido(x.demanda) &&
    x.demanda > 0
  );
}
export function instalacaoValida(x: unknown): x is Instalacao {
  return (
    objeto(x) &&
    typeof x.id === "string" &&
    !!x.id.trim() &&
    typeof x.nome === "string" &&
    !!x.nome.trim() &&
    valido(x.x) &&
    valido(x.y) &&
    valido(x.custoFixoMensal) &&
    x.custoFixoMensal >= 0
  );
}
export function validarClientes(x: unknown): asserts x is Cliente[] {
  if (
    !Array.isArray(x) ||
    !x.length ||
    x.length > 1000 ||
    !x.every(clienteValido)
  ) {
    throw new Error("Cadastre entre 1 e 1000 clientes com dados válidos.");
  }
}
export function validarInstalacoes(x: unknown): asserts x is Instalacao[] {
  if (
    !Array.isArray(x) ||
    !x.length ||
    x.length > 100 ||
    !x.every(instalacaoValida)
  ) {
    throw new Error("Cadastre entre 1 e 100 instalações válidas.");
  }
}
export function validarCusto(x: unknown): asserts x is number {
  if (!valido(x) || x < 0)
    throw new Error("O custo por caixa por km deve ser não negativo.");
}
