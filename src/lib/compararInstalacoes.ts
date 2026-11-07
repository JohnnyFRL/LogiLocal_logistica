import type { Cliente } from "@/types/clients";
import type { Instalacao, ResultadoComparacao } from "@/types/instalacao";
export function compararInstalacoes(
  clientes: Cliente[],
  instalacoes: Instalacao[],
  custo: number,
): ResultadoComparacao {
  const ranking = instalacoes
    .map((instalacao) => {
      const custoTransporte = clientes.reduce(
        (s, cliente) =>
          s +
          Math.hypot(instalacao.x - cliente.x, instalacao.y - cliente.y) *
            cliente.demanda *
            custo,
        0,
      );
      const custoTotal = instalacao.custoFixoMensal + custoTransporte;
      if (!Number.isFinite(custoTotal) || !Number.isFinite(custoTransporte))
        throw new Error("Cálculo excedeu os limites numéricos.");
      return {
        instalacaoId: instalacao.id,
        nome: instalacao.nome,
        x: instalacao.x,
        y: instalacao.y,
        custoFixoMensal: instalacao.custoFixoMensal,
        custoTransporte,
        custoTotal,
        posicao: 0,
      };
    })
    .sort((a, b) => a.custoTotal - b.custoTotal || a.nome.localeCompare(b.nome))
    .map((item, i) => ({ ...item, posicao: i + 1 }));
  const melhorInstalacao = ranking[0];
  if (!melhorInstalacao) throw new Error("Não há instalações para comparar.");
  return {
    ranking,
    melhorInstalacao,
    economiaEstimada:
      ranking[ranking.length - 1].custoTotal - melhorInstalacao.custoTotal,
  };
}
