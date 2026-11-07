
import type {
  Cliente,
  ResultadoAnalise,
} from "@/types/cliente";

interface Props {
  clientes: Cliente[];
  resultado: ResultadoAnalise | null;
}

export default function GraficoCartesiano({
  clientes,
  resultado,
}: Props) {
  const largura = 600;
  const altura = 360;
  const margem = 45;

  const valoresX = [
    ...clientes.map((c) => c.x),
    ...(resultado ? [resultado.x] : []),
  ];

  const valoresY = [
    ...clientes.map((c) => c.y),
    ...(resultado ? [resultado.y] : []),
  ];

  const minX = Math.min(0, ...valoresX);
  const maxX = Math.max(100, ...valoresX);
  const minY = Math.min(0, ...valoresY);
  const maxY = Math.max(100, ...valoresY);

  const posX = (x: number) =>
    margem +
    ((x - minX) / (maxX - minX)) *
      (largura - 2 * margem);

  const posY = (y: number) =>
    altura -
    margem -
    ((y - minY) / (maxY - minY)) *
      (altura - 2 * margem);

  return (
    <section className="rounded-xl border border-[#e2e5dc] bg-white p-8">
      <span className="text-xs font-semibold tracking-widest text-[#718472]">
        VISUALIZAÇÃO GEOGRÁFICA
      </span>

      <h3 className="mt-3 font-serif text-3xl text-[#26352c]">
        Distribuição dos clientes
      </h3>

      <p className="mt-3 text-sm text-[#68736a]">
        Representação dos pontos em um plano cartesiano.
      </p>

      <svg
        viewBox={`0 0 ${largura} ${altura}`}
        className="mt-6 w-full rounded-lg bg-[#f6f8f4]"
        role="img"
        aria-label="Gráfico cartesiano da localização dos clientes"
      >
        {/* Eixos */}
        <line
          x1={margem}
          y1={altura - margem}
          x2={largura - margem}
          y2={altura - margem}
          stroke="#9ca89c"
          strokeWidth="2"
        />

        <line
          x1={margem}
          y1={margem}
          x2={margem}
          y2={altura - margem}
          stroke="#9ca89c"
          strokeWidth="2"
        />

        <text
          x={largura - margem + 10}
          y={altura - margem}
          fill="#526253"
          fontSize="14"
        >
          X
        </text>

        <text
          x={margem}
          y={margem - 15}
          fill="#526253"
          fontSize="14"
        >
          Y
        </text>

        {/* Clientes */}
        {clientes.map((cliente) => (
          <g key={cliente.id}>
            <circle
              cx={posX(cliente.x)}
              cy={posY(cliente.y)}
              r="7"
              fill="#627c64"
            >
              <title>
                {cliente.nome}: ({cliente.x}, {cliente.y})
              </title>
            </circle>
          </g>
        ))}

        {/* Centro de gravidade */}
        {resultado && (
          <circle
            cx={posX(resultado.x)}
            cy={posY(resultado.y)}
            r="11"
            fill="#e49b42"
            stroke="white"
            strokeWidth="3"
          >
            <title>
              Centro de gravidade:
              ({resultado.x.toFixed(2)},
              {resultado.y.toFixed(2)})
            </title>
          </circle>
        )}
      </svg>

      <div className="mt-5 flex flex-wrap gap-6 text-sm text-[#68736a]">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#627c64]" />
          Clientes
        </span>

        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#e49b42]" />
          Centro de gravidade
        </span>
      </div>
    </section>
  );
}
