import type { ResultadoAnalise } from "@/types/clients";

interface Props {
  resultado: ResultadoAnalise | null;
}

export default function ResultadoAnalise({ resultado }: Props) {
  if (!resultado) return null;

  return (
    <section className="rounded-xl border border-[#e2e5dc] bg-white p-8">
      <span className="text-xs font-semibold tracking-widest text-[#718472]">
        RESULTADO DA ANÁLISE
      </span>

      <h3 className="mt-3 font-serif text-3xl text-[#26352c]">
        Localização recomendada
      </h3>

      <p className="mt-3 text-sm text-[#68736a]">
        Centro de gravidade ponderado pela demanda.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-[#f1f3ee] p-5">
          <span className="text-sm text-[#718472]">Coordenada X</span>

          <p className="mt-2 text-3xl font-semibold text-[#354b3d]">
            {resultado.x.toFixed(2)}
          </p>
        </div>

        <div className="rounded-lg bg-[#f1f3ee] p-5">
          <span className="text-sm text-[#718472]">Coordenada Y</span>

          <p className="mt-2 text-3xl font-semibold text-[#354b3d]">
            {resultado.y.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-[#e2e5dc] pt-5">
        <p className="text-sm text-[#68736a]">
          Clientes analisados: <strong>{resultado.quantidadeClientes}</strong>
        </p>

        <p className="mt-2 text-sm text-[#68736a]">
          Demanda total: <strong>{resultado.demandaTotal}</strong> caixas/mês
        </p>
      </div>

      <p className="mt-6 text-sm leading-7 text-[#68736a]">
        A localização apresentada representa uma referência teórica para a
        instalação de um centro de distribuição, considerando os pontos de
        demanda cadastrados.
      </p>
    </section>
  );
}
