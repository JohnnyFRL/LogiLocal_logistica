"use client";

import { useState, type FormEvent } from "react";
import type { Cliente } from "@/types/clients";

import type { Instalacao, ResultadoComparacao } from "@/types/instalacao";

interface Props {
  clientes: Cliente[];
}

export default function ComparacaoInstalacoes({ clientes }: Props) {
  const [instalacoes, setInstalacoes] = useState<Instalacao[]>([]);

  const [nome, setNome] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [custoFixo, setCustoFixo] = useState("");
  const [custoTransporte, setCustoTransporte] = useState("0.50");

  const [resultado, setResultado] = useState<ResultadoComparacao | null>(null);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  function adicionarInstalacao(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const numeroX = Number(x);
    const numeroY = Number(y);
    const numeroCusto = Number(custoFixo);

    if (
      !nome.trim() ||
      x.trim() === "" ||
      y.trim() === "" ||
      custoFixo.trim() === "" ||
      !Number.isFinite(numeroX) ||
      !Number.isFinite(numeroY) ||
      !Number.isFinite(numeroCusto) ||
      numeroCusto < 0
    ) {
      setErro("Preencha os dados da instalação corretamente.");
      return;
    }

    const novaInstalacao: Instalacao = {
      id: crypto.randomUUID(),
      nome: nome.trim(),
      x: numeroX,
      y: numeroY,
      custoFixoMensal: numeroCusto,
    };

    setInstalacoes((anterior) => [...anterior, novaInstalacao]);

    setResultado(null);
    setErro("");

    setNome("");
    setX("");
    setY("");
    setCustoFixo("");
  }

  function excluirInstalacao(id: string) {
    setInstalacoes((anterior) =>
      anterior.filter((instalacao) => instalacao.id !== id),
    );
    setResultado(null);
  }

  async function comparar() {
    if (clientes.length === 0 || instalacoes.length === 0) {
      setErro("Cadastre clientes e pelo menos uma instalação.");
      return;
    }

    const custo = Number(custoTransporte);

    if (custoTransporte.trim() === "" || !Number.isFinite(custo) || custo < 0) {
      setErro("Informe um custo de transporte válido.");
      return;
    }

    setCarregando(true);
    setErro("");
    setResultado(null);

    try {
      const resposta = await fetch("/api/comparar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientes,
          instalacoes,
          custoTransporteUnitario: custo,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro ?? "Não foi possível comparar.");
      }

      setResultado(dados as ResultadoComparacao);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao comparar instalações.",
      );
    } finally {
      setCarregando(false);
    }
  }

  function formatarMoeda(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <div className="comparacao-container">
      <div className="comparacao-cabecalho">
        <span className="eyebrow">ANÁLISE DE INSTALAÇÕES CANDIDATAS</span>

        <h2>Compare suas alternativas.</h2>

        <p>
          Cadastre possíveis locais para o centro de distribuição e descubra
          qual apresenta o menor custo logístico estimado.
        </p>
      </div>

      <div className="comparacao-grid">
        {/* Cadastro */}
        <section className="comparacao-card">
          <span className="eyebrow">NOVA INSTALAÇÃO</span>

          <h3>Adicionar instalação</h3>

          <form onSubmit={adicionarInstalacao} className="form-instalacao">
            <label>
              Nome da instalação
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex.: Centro de Distribuição A"
                required
              />
            </label>

            <div className="form-duas-colunas">
              <label>
                Coordenada X
                <input
                  type="number"
                  step="any"
                  value={x}
                  onChange={(e) => setX(e.target.value)}
                  placeholder="30"
                  required
                />
              </label>

              <label>
                Coordenada Y
                <input
                  type="number"
                  step="any"
                  value={y}
                  onChange={(e) => setY(e.target.value)}
                  placeholder="40"
                  required
                />
              </label>
            </div>

            <label>
              Custo fixo mensal (R$)
              <input
                type="number"
                min="0"
                step="0.01"
                value={custoFixo}
                onChange={(e) => setCustoFixo(e.target.value)}
                placeholder="5000"
                required
              />
            </label>

            <button className="botao-comparacao" type="submit">
              Adicionar instalação <span>↗</span>
            </button>
          </form>
        </section>

        {/* Lista */}
        <section className="comparacao-card">
          <span className="eyebrow">LOCAIS CADASTRADOS</span>

          <h3>Instalações candidatas</h3>

          <p className="comparacao-descricao">
            {instalacoes.length} instalação(ões) cadastrada(s).
          </p>

          {instalacoes.length === 0 ? (
            <div className="estado-vazio">
              <h4>Nenhuma instalação cadastrada</h4>
              <p>Adicione uma instalação para iniciar a comparação.</p>
            </div>
          ) : (
            <div className="lista-clientes">
              {instalacoes.map((instalacao) => (
                <div className="cliente-item" key={instalacao.id}>
                  <div>
                    <strong>{instalacao.nome}</strong>
                    <span>
                      X: {instalacao.x} · Y: {instalacao.y}
                    </span>
                    <span>
                      Custo fixo: {formatarMoeda(instalacao.custoFixoMensal)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => excluirInstalacao(instalacao.id)}
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Configuração da análise */}
      <section className="configuracao-comparacao">
        <div>
          <h3>Configurar análise</h3>
          <p>Informe o custo de transporte por caixa e por quilômetro.</p>
        </div>

        <div className="comparacao-acoes">
          <label>
            R$/caixa/km
            <input
              type="number"
              min="0"
              step="0.01"
              value={custoTransporte}
              onChange={(e) => {
                setCustoTransporte(e.target.value);
                setResultado(null);
              }}
            />
          </label>

          <button
            type="button"
            className="botao-comparacao"
            onClick={comparar}
            disabled={
              carregando || clientes.length === 0 || instalacoes.length === 0
            }
          >
            {carregando ? "Calculando..." : "Comparar instalações ↗"}
          </button>
        </div>
      </section>

      {erro && (
        <p className="comparacao-erro" role="alert">
          {erro}
        </p>
      )}

      {/* Ranking */}
      {resultado && (
        <section className="resultado-comparacao">
          <span className="eyebrow">RESULTADO DA COMPARAÇÃO</span>

          <h3>Ranking de instalações</h3>

          <div className="ranking-lista">
            {resultado.ranking.map((item) => (
              <div
                key={item.instalacaoId}
                className={
                  item.posicao === 1
                    ? "ranking-item ranking-melhor"
                    : "ranking-item"
                }
              >
                <div className="ranking-nome">
                  <span className="ranking-posicao">{item.posicao}º</span>

                  <div>
                    <strong>{item.nome}</strong>
                    <small>
                      Transporte: {formatarMoeda(item.custoTransporte)}
                    </small>
                    <small>Fixo: {formatarMoeda(item.custoFixoMensal)}</small>
                  </div>
                </div>

                <div className="ranking-custo">
                  <strong>{formatarMoeda(item.custoTotal)}</strong>
                  <small>por mês</small>
                </div>
              </div>
            ))}
          </div>

          <div className="recomendacao">
            <span>INSTALAÇÃO RECOMENDADA</span>

            <h3>{resultado.melhorInstalacao.nome}</h3>

            <p>
              Menor custo logístico estimado:{" "}
              <strong>
                {formatarMoeda(resultado.melhorInstalacao.custoTotal)}
              </strong>{" "}
              por mês.
            </p>

            <p>
              Diferença em relação à alternativa mais cara:{" "}
              <strong>{formatarMoeda(resultado.economiaEstimada)}</strong>.
            </p>
          </div>

          <p className="comparacao-observacao">
            Os valores são estimativas baseadas em distâncias cartesianas,
            demanda e custos informados. Não representam trajetos rodoviários
            reais.
          </p>
        </section>
      )}
    </div>
  );
}
