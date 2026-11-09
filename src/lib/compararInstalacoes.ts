import type { Cliente } from "@/types/clients";
import type {
  Instalacao,
  ResultadoComparacao,
} from "@/types/instalacao";

// Calcula a distância geográfica em quilômetros
function calcularDistanciaKm(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number
): number {
  const raioTerraKm = 6371;

  const radianos = (graus: number) =>
    (graus * Math.PI) / 180;

  const diferencaLatitude = radianos(latitude2 - latitude1);
  const diferencaLongitude = radianos(longitude2 - longitude1);

  const a =
    Math.sin(diferencaLatitude / 2) ** 2 +
    Math.cos(radianos(latitude1)) *
      Math.cos(radianos(latitude2)) *
      Math.sin(diferencaLongitude / 2) ** 2;

  const aLimitado = Math.min(1, Math.max(0, a));

  return (
    2 * raioTerraKm * Math.asin(Math.sqrt(aLimitado))
  );
}

export function compararInstalacoes(
  clientes: Cliente[],
  instalacoes: Instalacao[],
  custo: number
): ResultadoComparacao {
  const ranking = instalacoes
    .map((instalacao) => {
      const custoTransporte = clientes.reduce(
        (soma, cliente) => {
          const distanciaKm = calcularDistanciaKm(
            instalacao.y,
            instalacao.x,
            cliente.y,
            cliente.x
          );

          return (
            soma +
            distanciaKm * cliente.demanda * custo
          );
        },
        0
      );

      const custoTotal =
        instalacao.custoFixoMensal + custoTransporte;

      if (
        !Number.isFinite(custoTotal) ||
        !Number.isFinite(custoTransporte)
      ) {
        throw new Error(
          "Cálculo excedeu os limites numéricos."
        );
      }

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
    .sort(
      (a, b) =>
        a.custoTotal - b.custoTotal ||
        a.nome.localeCompare(b.nome)
    )
    .map((item, i) => ({
      ...item,
      posicao: i + 1,
    }));

  const melhorInstalacao = ranking[0];

  if (!melhorInstalacao) {
    throw new Error(
      "Não há instalações para comparar."
    );
  }

  return {
    ranking,
    melhorInstalacao,
    economiaEstimada:
      ranking[ranking.length - 1].custoTotal -
      melhorInstalacao.custoTotal,
  };
}
