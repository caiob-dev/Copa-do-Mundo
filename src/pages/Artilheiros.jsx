import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { http } from "../services/api";

import arrowLeft from "../assets/back.svg";
import worldCup from "../assets/world-cup-26.webp";
import trofeu from "../assets/copa.png";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Artilheiros() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  const [artilheiros, setArtilheiros] = useState([]);

  useEffect(() => {
    async function getArtilheiros() {
      try {
        const response = await http.get(`/jogadores/artilheiros/${id}`);
        setArtilheiros(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados das seleções", error);
        setError(true);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    }
    getArtilheiros();
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
        <p>
          Erro ao carregar detalhes do artilheiro 😥. Tente novamente mais
          tarde!
        </p>
      </section>
    );
  }

  const bandeiras = {
    Brasil:
      "https://static.todamateria.com.br/upload/ba/nd/bandeiradobrasil-2-cke.jpg",
    Argentina:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1280px-Flag_of_Argentina.svg.png",
    França:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
    Alemanha:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAAAElBMVEUAAAD/zgDdAADnAADaAAD/2AAtsSEoAAAA+ElEQVR4nO3QMQGAMAAEsYeCf8tIuI0pkZANAAAAAAAAAAAAAAAAAAAAgB8dwm6CoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKewh7CbsIipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUofMGTNC8HkSxoAAAAASUVORK5CYII=",
    Espanha:
      "data:image/png;base64,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",
    Inglaterra:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/330px-Flag_of_England.svg.png",
    Portugal:
      "data:image/png;base64,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",
    Holanda:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAD1BMVEX///+uHCghRounAAAALIAYYzKEAAABB0lEQVR4nO3QuRGAAAzAsPDsPzN9XFJAIU3g8xxs83XAD3lSnpQn5Ul5Up6UJ+VJeVKelCflSXlSnpQn5Ul5Up6UJ+VJeVKelCflSXlSnpQn5Ul5Up6UJ+VJeVKelCflSXlSnpQn5Ul5Up6UJ+VJeVKelCflSXlSnpQn5Ul5Up6UJ+VJeVKe1FxsAwAAAAAAAAAAAAAAAAAAAMB7N9ucbJ6UJ+VJeVKelCflSXlSnpQn5Ul5Up6UJ+VJeVKelCflSXlSnpQn5Ul5Up6UJ+VJeVKelCflSXlSnpQn5Ul5Up6UJ+VJeVKelCflSXlSnpQn5Ul5Up6UJ+VJeVKelCflSXlSnpQn5Uk9Q6/I4nGDdNoAAAAASUVORK5CYII=",
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden pt-20 flex"
      style={{ background: "var(--gradient-hero)" }}
    >
      <Link to="/" className="top-10 absolute ml-5 cursor-pointer z-50">
        <img src={arrowLeft} className="w-10 " alt="Voltar" />
      </Link>

      <div className="absolute inset-0 opacity-5">
        <img
          src={worldCup}
          alt="Imagem do trófeu da copa do mundo"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col mx-auto gap-4 items-center p-6 mb-1 ">
        <img
          src={artilheiros.foto}
          className="w-[50%] border-amber-50 border max-[440px]:w-full"
          alt={`Imagem do jogador ${artilheiros.nomeJogador}`}
        />

        <img
          src={bandeiras[artilheiros.selecao]}
          className="w-20 flex flex-col"
          alt={`Bandeira da ${artilheiros.selecao}`}
        />
        <h2 className="text-3xl">
          {artilheiros.nomeJogador}
          {artilheiros.nomeJogador === "Pelé" && "👑"}
          {/* {artilheiros.nomeJogador === "Lionel Messi" && "👑"}  */}
        </h2>

        <p className="text-2xl">
          Número de gols:{" "}
          <span className="text-primary">{artilheiros.numeroDeGols}</span>
        </p>

        <div className="flex gap-2">
          <p className="text-2xl max-[370px]:text-[22px] max-[393px]:text-[21px]">
            Títulos de copa do mundo:
          </p>
          <div className="flex gap-1">
            {artilheiros.titulosDeCopaDoMundo === 0 ? (
              <span className="text-2xl max-[370px]:text-[22px] max-[393px]:text-[21px] text-white">0</span>
            ) : (
              [...Array(artilheiros.titulosDeCopaDoMundo)].map((_, index) => (
                <img
                  src={trofeu}
                  key={index}
                  alt="Troféu da Copa do Mundo"
                  className="w-[25px]"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
