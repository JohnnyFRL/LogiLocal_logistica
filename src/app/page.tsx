"use client";

import { useState } from "react";
import ClienteForm from "@/components/ClienteForm";
import ComparacaoInstalacoes from "@/components/ComparacaoInstalacoes";
import type { Cliente } from "@/types/clients";

export default function Home() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  function adicionarCliente(cliente: Cliente) {
    setClientes((anteriores) => [...anteriores, cliente]);
  }

  function excluirCliente(id: string) {
    setClientes((anteriores) =>
      anteriores.filter((cliente) => cliente.id !== id),
    );
  }

  const demandaTotal = clientes.reduce(
    (soma, cliente) => soma + cliente.demanda,
    0,
  );

  return (
    <main>
      {/* Navegação */}
      <header className="navbar">
        <a href="#" className="logo">
          <span className="logo-simbolo">L.</span>
          logilocal
        </a>

        <nav className="nav-links">
          <a href="#inicio">Início</a>
          <a href="#sobre">Sobre</a>
          <a href="#analise">Análise</a>
          <a href="#comparacao">Comparar instalações</a>
        </nav>

        <a href="#analise" className="nav-botao">
          Começar agora <span>↗</span>
        </a>
      </header>

      {/* Seção principal */}
      <section id="inicio" className="hero">
        <div className="hero-conteudo">
          <span className="eyebrow">INTELIGÊNCIA EM LOCALIZAÇÃO LOGÍSTICA</span>

          <h1>
            O lugar certo
            <br />
            faz toda a
            <br />
            <em>diferença.</em>
          </h1>

          <p>
            Descubra a localização estratégica para o seu centro de
            distribuição. Transforme dados de demanda em decisões mais
            inteligentes.
          </p>

          <a href="#analise" className="hero-botao">
            Explorar ferramenta <span>↗</span>
          </a>
        </div>

        <div className="hero-imagem">
          <div className="imagem-etiqueta">
            <span className="etiqueta-numero">01 / 03</span>
            <span>
              Planejamento inteligente
              <br />
              começa com localização.
            </span>
          </div>
        </div>
      </section>

      {/* Apresentação */}
      <section id="sobre" className="sobre">
        <div>
          <span className="eyebrow">SOBRE O LOGILOCAL</span>
          <h2>
            Decisões melhores
            <br />
            começam com <em>dados.</em>
          </h2>
        </div>

        <div className="sobre-descricao">
          <p>
            O LogiLocal auxilia empresas a identificar uma localização teórica
            para instalações logísticas, considerando a distribuição e a demanda
            dos clientes.
          </p>
          <p>
            Utilizamos o método do centro de gravidade para oferecer uma
            referência inicial ao planejamento de centros de distribuição.
          </p>
        </div>
      </section>

      {/* Ferramenta */}
      <section id="analise" className="analise">
        <div className="analise-cabecalho">
          <div>
            <span className="eyebrow">FERRAMENTA DE LOCALIZAÇÃO</span>

            <h2>Planeje sua localização.</h2>

            <p>
              Cadastre seus pontos de demanda para iniciar a análise logística.
            </p>
          </div>

          <span className="analise-indicador">● Ambiente de simulação</span>
        </div>

        <div className="analise-grid">
          <div>
            <ClienteForm onAdicionar={adicionarCliente} />
          </div>

          <div className="painel-clientes">
            <div className="painel-topo">
              <div>
                <span className="eyebrow">PONTOS DE DEMANDA</span>
                <h3>Clientes cadastrados</h3>
              </div>

              <span className="contador">{clientes.length}</span>
            </div>

            <div className="indicadores">
              <div>
                <span>Clientes</span>
                <strong>{clientes.length}</strong>
              </div>

              <div>
                <span>Demanda total</span>
                <strong>{demandaTotal.toLocaleString("pt-BR")}</strong>
              </div>
            </div>

            {clientes.length === 0 ? (
              <div className="estado-vazio">
                <span className="estado-icone">⌁</span>
                <h4>Nenhum cliente adicionado</h4>
                <p>Cadastre o primeiro ponto de demanda para começar.</p>
              </div>
            ) : (
              <div className="lista-clientes">
                {clientes.map((cliente) => (
                  <div key={cliente.id} className="cliente-item">
                    <div>
                      <strong>{cliente.nome}</strong>
                      <span>
                        X: {cliente.x} · Y: {cliente.y}
                        {" · "}
                        {cliente.demanda} caixas
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => excluirCliente(cliente.id)}
                      aria-label={`Excluir ${cliente.nome}`}
                    >
                      Excluir
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="painel-rodape">
              <span>
                {clientes.length > 0
                  ? "Dados prontos para análise"
                  : "Aguardando dados"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Comparação de instalações candidatas */}
      <section id="comparacao" className="secao-comparacao">
        <ComparacaoInstalacoes clientes={clientes} />
      </section>

      {/* Rodapé */}
      <footer className="footer">
        <span className="logo">L. logilocal</span>
        <span>Projeto acadêmico · Localização de instalações logísticas</span>
        <span>© 2026 LogiLocal</span>
      </footer>
    </main>
  );
}
