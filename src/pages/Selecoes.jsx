import { useEffect, useState } from "react";
import { http } from "../services/api";
import { Link, useParams } from "react-router";

import heroTrophy from "../assets/world-cup-trophy.jpg";

import arrowLeft from "../assets/back.svg";

export default function Selecoes() {
  const { id } = useParams();

  const [selecao, setSelecao] = useState(null);

  useEffect(() => {
    async function carregarDadosSelecoes() {
      try {
        const response = await http.get(`/selecoes/${id}`);
        setSelecao(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados das seleções", error);
      }
    }

    carregarDadosSelecoes();
  }, [id]);

  if (!selecao) {
    return <div>Carregando...</div>;
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden pt-20"
      style={{ background: "var(--gradient-hero)" }}
    >
      <Link to="/" className="top-10 absolute ml-5 cursor-pointer z-50">
        <img src={arrowLeft} className="w-17 " alt="Voltar" />
      </Link>

      <div className="absolute inset-0 opacity-5">
        <img
          src={heroTrophy}
          alt="Imagem do trófeu da copa do mundo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="m-8 flex flex-col items-center gap-2 p-6 text-[20px]">
        <img
          src={selecao.bandeira}
          className="w-40"
          alt={`Bandeira da ${selecao.nome}`}
        />
        <h2 className="pt-5 text-3xl">{selecao.nome}</h2>

        <p>
          Títulos:{" "}
          <span className="text-gold">{selecao.quantidadeTitulos}</span>
        </p>

        <p>
          Participações:{" "}
          <span className="text-gold">{selecao.partipacoes}</span>
        </p>

        <p>
          Status: <span className="text-gold">{selecao.statusTitulo}</span>
        </p>

        <p>
          {selecao.maiorVencedorDaSelecao.length === 0 && ""}

          {selecao.maiorVencedorDaSelecao.length === 1 && (
            <>
              Maior vencedor:{" "}
              <span className="text-gold">
                {selecao.maiorVencedorDaSelecao[0]}
              </span>{" "}
              com {selecao.nmrTitulos} título(s).
            </>
          )}

          {selecao.maiorVencedorDaSelecao.length > 1 && (
            <>
              Maiores vencedores:{" "}
              {selecao.maiorVencedorDaSelecao.map((nome, index) => (
                <span key={nome} className="text-gold">
                  {nome}
                  {index < selecao.maiorVencedorDaSelecao.length - 1
                    ? ", "
                    : ""}
                </span>
              ))}{" "}
              com {selecao.nmrTitulos} título cada.
            </>
          )}
        </p>
        <h1 className="text-2xl pt-3 text-center">Principais jogadores em copas:</h1>
        {selecao.jogadores.map((jogador, i) => (
          <div className="flex justify-center" key={i}>
            <p>
              {jogador.split(", ")}{" "}
              <span className="text-gold">
                - nº de gols: {selecao.gols[i]}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
