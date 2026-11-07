export interface Instalacao {
  id: string;
  nome: string;
  x: number;
  y: number;
  custoFixoMensal: number;
}

export interface ResultadoInstalacao {
  instalacaoId: string;
  nome: string;
  x: number;
  y: number;
  custoFixoMensal: number;
  custoTransporte: number;
  custoTotal: number;
  posicao: number;
}

export interface ResultadoComparacao {
  ranking: ResultadoInstalacao[];
  melhorInstalacao: ResultadoInstalacao;
  economiaEstimada: number;
}
