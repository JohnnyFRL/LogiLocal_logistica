export interface Cliente {
  id: string;
  nome: string;
  x: number;
  y: number;
  demanda: number;
}

export interface ResultadoAnalise {
  x: number;
  y: number;
  demandaTotal: number;
  quantidadeClientes: number;
}
