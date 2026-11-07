"use client";

import { useState, type FormEvent } from "react";
import type { Cliente } from "@/types/clients";

interface Props {
  onAdicionar: (cliente: Cliente) => void;
}

export default function ClienteForm({ onAdicionar }: Props) {
  const [nome, setNome] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [demanda, setDemanda] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const numeroX = Number(x);
    const numeroY = Number(y);
    const numeroDemanda = Number(demanda);

    if (
      !nome.trim() ||
      !x.trim() ||
      !y.trim() ||
      !demanda.trim() ||
      !Number.isFinite(numeroX) ||
      !Number.isFinite(numeroY) ||
      !Number.isFinite(numeroDemanda) ||
      numeroDemanda <= 0
    ) {
      alert("Preencha os campos corretamente.");
      return;
    }

    onAdicionar({
      id: crypto.randomUUID(),
      nome: nome.trim(),
      x: numeroX,
      y: numeroY,
      demanda: numeroDemanda,
    });

    setNome("");
    setX("");
    setY("");
    setDemanda("");
  }

  const inputStyle =
    "w-full rounded-lg border border-[#dfe4dc] bg-[#fafbf8] " +
    "px-4 py-3 text-sm text-[#26352c] outline-none " +
    "transition-colors focus:border-[#6b866c]";

  const labelStyle = "mb-2 block text-xs font-semibold text-[#526253]";

  return (
    <section className="h-full rounded-[14px] border border-[#e2e5dc] bg-white p-8 max-sm:p-5">
      <span className="text-[11px] font-bold tracking-[2px] text-[#718472]">
        NOVO PONTO DE DEMANDA
      </span>

      <h3 className="mt-3 font-serif text-[28px] font-normal text-[#26352c]">
        Adicionar cliente
      </h3>

      <p className="mt-3 mb-8 text-sm leading-7 text-[#7b847b]">
        Insira as informações de localização e demanda para incluir um novo
        cliente na análise.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="cliente-nome" className={labelStyle}>
            Nome do cliente
          </label>
          <input
            id="cliente-nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex.: Supermercado A"
            className={inputStyle}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="cliente-x" className={labelStyle}>
              Coordenada X
            </label>
            <input
              id="cliente-x"
              type="number"
              step="any"
              value={x}
              onChange={(e) => setX(e.target.value)}
              placeholder="10"
              className={inputStyle}
              required
            />
          </div>

          <div>
            <label htmlFor="cliente-y" className={labelStyle}>
              Coordenada Y
            </label>
            <input
              id="cliente-y"
              type="number"
              step="any"
              value={y}
              onChange={(e) => setY(e.target.value)}
              placeholder="20"
              className={inputStyle}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="cliente-demanda" className={labelStyle}>
            Demanda mensal (caixas)
          </label>
          <input
            id="cliente-demanda"
            type="number"
            min="0.01"
            step="any"
            value={demanda}
            onChange={(e) => setDemanda(e.target.value)}
            placeholder="100"
            className={inputStyle}
            required
          />
        </div>

        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-between rounded-full bg-[#354b3d] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#24372d]"
        >
          Adicionar ponto de demanda
          <span aria-hidden="true">↗</span>
        </button>
      </form>
    </section>
  );
}
