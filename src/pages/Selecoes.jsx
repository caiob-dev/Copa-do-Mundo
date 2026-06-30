import { useEffect, useState } from "react";
import { http } from "../services/api";
import { Link, useParams } from "react-router";

import heroTrophy from "../assets/world-cup-trophy.jpg";

import arrowLeft from "../assets/back.svg";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Selecoes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  const [selecao, setSelecao] = useState(null);

  useEffect(() => {
    async function carregarDadosSelecoes() {
      try {
        const response = await http.get(`/selecoes/${id}`);
        setSelecao(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados das seleções", error);
        setError(true)
      } finally {
        setTimeout(() => {
          setLoading(false)
        },300 );
      }
    }

    carregarDadosSelecoes();
  }, [id]);

   if (loading) {
    return (
      <section className="min-h-dvh flex flex-col justify-center items-center text-2xl text-white pb-3.5">
        <LoadingSpinner />
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-dvh flex flex-col justify-start text-2xl text-fundo-vermelho">
        <p>Erro ao carregar detalhes da seleção 😥. Tente novamente mais tarde!</p>
      </section>
    );
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

        <p className="">
          Títulos:{" "}
          <span className="text-gold">{selecao.quantidadeTitulos}</span>
        </p>

        <p className="">
          Participações:{" "}
          <span className="text-gold">{selecao.partipacoes}</span>
        </p>

        <p className="">
          Status: <span className="text-gold">{selecao.statusTitulo}</span>
        </p>

        <p className="max-[370px]:text-[15.4px] max-[393px]:text-[17px] max-[440px]:text-[18px]">
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
        <h1 className="text-2xl pt-3 text-center max-[440px]:text-[20px]">Principais jogadores em copas:</h1>
        {selecao.jogadores.map((jogador, i) => (
          <div className="flex justify-center" key={i}>
            <p className="max-[370px]:text-[16px] max-[393px]:text-[17px] max-[440px]:text-[19px]">
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
