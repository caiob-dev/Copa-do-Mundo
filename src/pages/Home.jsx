import { useEffect, useState } from "react";
import { http } from "../services/api";
import { Link } from "react-router";

import heroTrophy from "../assets/hero-trophy.jpg";
import stadium from "../assets/stadium.jpg";
import gol from "../assets/artilheiros.webp";
import worldCup from "../assets/world-cup-26.webp";
import copa from "../assets/copa.png";

import Footer from "../components/Footer";
import Header from "../components/Header";

const year = new Date().getFullYear();

const CHAMPIONS = [
  { year: 2022, country: "Argentina", host: "Catar", emoji: "🇦🇷" },
  { year: 2018, country: "França", host: "Rússia", emoji: "🇫🇷" },
  { year: 2014, country: "Alemanha", host: "Brasil", emoji: "🇩🇪" },
  { year: 2010, country: "Espanha", host: "África do Sul", emoji: "🇪🇸" },
  { year: 2006, country: "Itália", host: "Alemanha", emoji: "🇮🇹" },
  { year: 2002, country: "Brasil", host: "Coreia/Japão", emoji: "🇧🇷" },
];

const FAVORITES = [
  { name: "Brasil", flag: "🇧🇷", titles: 5, group: "Pentacampeão" },
  { name: "Argentina", flag: "🇦🇷", titles: 3, group: "Atual Campeã" },
  { name: "França", flag: "🇫🇷", titles: 2, group: "Vice 2022" },
  { name: "Alemanha", flag: "🇩🇪", titles: 4, group: "Tetracampeã" },
  { name: "Espanha", flag: "🇪🇸", titles: 1, group: "Campeã 2010" },
  { name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", titles: 1, group: "Berço do Futebol" },
  { name: "Portugal", flag: "🇵🇹", titles: 0, group: "Geração de Ouro" },
  { name: "Holanda", flag: "🇳🇱", titles: 0, group: "Laranja Mecânica" },
];

const STATS = [
  { value: "48", label: "Seleções" },
  { value: "104", label: "Partidas" },
  { value: "16", label: "Cidades-sede" },
  { value: "3", label: "Países anfitriões" },
];

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { d, h, m, s } = useCountdown(new Date("2026-07-19T19:00:00Z"));

  const [selecoes, setSelecoes] = useState([]);
  const [topSelecoes, setTopSelecoes] = useState([]);
  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
    async function getSelecoes() {
      try {
        const response = await http.get("/selecoes");
        setSelecoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar seleções", error);
      }
    }
    getSelecoes();
  }, []);

  useEffect(() => {
    async function getTop5Selecoes() {
      try {
        const response = await http.get("/selecoes/top5");
        setTopSelecoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar top 5 seleções", error);
      }
    }
    getTop5Selecoes();
  }, []);

  useEffect(() => {
    async function getJogadores() {
      try {
        const response = await http.get("/jogadores/artilheiros");
        setJogadores(response.data);
      } catch (error) {
        console.error("Erro ao buscar jogadores", error);
      }
    }
    getJogadores();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <Header>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full  flex items-center justify-center text-primary-foreground font-bold">
              <img src={copa} />
            </div>
            <span className="display text-xl tracking-wider">COPA 2026</span>
          </div>
          <button
            className="md:hidden text-white text-[40px]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-muted-foreground">
            <a href="#sobre" className="hover:text-primary transition">
              Sobre
            </a>
            <a href="#selecoes" className="hover:text-primary transition">
              Seleções
            </a>
            <a href="#historia" className="hover:text-primary transition">
              História
            </a>
            <a href="#artilheiros" className="hover:text-primary transition">
              Artilheiros
            </a>
            <a href="#contagem" className="hover:text-primary transition">
              Contagem
            </a>
          </nav>
        </div>

        {menuOpen && (
          <nav className="md:hidden flex flex-col items-center gap-5 pb-3 text-sm text-white uppercase tracking-widest text-muted-foreground">
            <a
              href="#sobre"
              className="hover:text-primary transition"
              onClick={() => setMenuOpen(false)}
            >
              Sobre
            </a>
            <a
              href="#selecoes"
              className="hover:text-primary transition"
              onClick={() => setMenuOpen(false)}
            >
              Seleções
            </a>
            <a
              href="#historia"
              className="hover:text-primary transition"
              onClick={() => setMenuOpen(false)}
            >
              História
            </a>
            <a
              href="#artilheiros"
              className="hover:text-primary transition"
              onClick={() => setMenuOpen(false)}
            >
              Artilheiros
            </a>
            <a
              href="#contagem"
              className="hover:text-primary transition"
              onClick={() => setMenuOpen(false)}
            >
              Contagem
            </a>
          </nav>
        )}
      </Header>

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="absolute inset-0 opacity-30">
          <img
            src={heroTrophy}
            alt="Troféu copa"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full py-20">
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-background border border-accent/40 text-gold text-xs uppercase tracking-[0.2em] mb-6">
              11 Junho — 19 Julho · 2026
            </span>
            <h1 className="display text-6xl md:text-8xl lg:text-9xl leading-[0.85] mb-6">
              O MUNDO
              <br />
              <span className="text-transparent bg-clip-text bg-(image:--gradient-gold)">
                É UMA BOLA.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed max-[440px]:text-white">
              A 23ª Copa do Mundo FIFA será disputada nos Estados Unidos, México
              e Canadá — o maior torneio da história, com 48 seleções e 104
              partidas eletrizantes.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contagem"
                className="px-8 py-4 rounded-md bg-[image:var(--gradient-gold)] text-primary-foreground font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform 
                max-[370px]:px-2 max-[370px]:py-2 max-[393px]:text-[14px] max-[393px]:text-nowrap max-[393px]:px-2"
                style={{ boxShadow: "var(--shadow-gold)" }}
              >
                Contagem Regressiva para a Final!
              </a>
              <a
                href="#selecoes"
                className="px-8 py-4 rounded-md border border-border hover:border-primary hover:text-primary bg-card transition font-semibold uppercase tracking-wider text-sm
                max-[370px]:px-3 max-[370px]:py-3"
              >
                Ver Seleções
              </a>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <img
              src={worldCup}
              alt="Taça da Copa do Mundo"
              width={1920}
              height={1080}
              className="rounded-2xl animate-pulse-glow"
              style={{ boxShadow: "var(--shadow-glow)" }}
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-border max-[440px]:divide-card ">
          {STATS.map((s) => (
            <div key={s.label} className="py-10 px-6 text-center">
              <div className="display text-5xl md:text-7xl text-primary  ">
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2 max-[440px]:text-white max-[393px]:text-[16px]   ">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-accent uppercase tracking-[0.3em] text-xs max-[440px]:text-20px max-[440px]:font-bold">
              A Edição
            </span>
            <h2 className="display text-5xl md:text-7xl mt-4 mb-6">
              UMA COPA
              <br />
              SEM PRECEDENTES.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4 max-[440px]:text-white">
              Pela primeira vez, três nações sediam juntas o torneio. Estados
              Unidos, México e Canadá abrem as portas de 16 cidades icônicas
              para receber 48 seleções — a maior expansão da história da Copa.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed max-[440px]:text-white">
              O México se torna o primeiro país a sediar três Copas. O Estádio
              Azteca, que viu Pelé e Maradona erguerem a taça, abre a festa em
              11 de junho de 2026.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <img
              src={stadium}
              loading="lazy"
              alt="Estádio lotado durante uma partida da Copa"
              width={1600}
              height={900}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent " />
            <div className="absolute bottom-6 left-6 max-[440px]:bottom-0 max-[440px]:left-1 ">
              <div className="display text-3xl text-primary ">16 CIDADES</div>
              <div className="text-sm text-muted-foreground max-[440px]:text-white">
                3 países · 1 sonho
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SELEÇÕES FAVORITAS */}
      <section id="selecoes" className="pt-24 pb-6 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <span className="text-gold uppercase tracking-[0.3em] text-xs max-[440px]:text-[18px]">
                Quem pode ganhar essa copa do mundo?
              </span>
              <h2 className="display text-5xl md:text-6xl mt-2 uppercase">
                As favoritas
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md max-[440px]:text-white max-[440px]:text-[18px]">
              As potências históricas e as candidatas mais perigosas ao título
              mundial.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FAVORITES.map((t) => (
              <div
                key={t.name}
                className="group relative bg-background border border-border rounded-xl p-6 hover:border-primary transition-all hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{t.flag}</div>
                <div className="display text-2xl">{t.name}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  {t.group}
                </div>
                <div className="absolute top-4 right-4 display text-3xl text-primary/80 max-[440px]:top-9">
                  {t.titles}★
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELEÇÕES */}
      <section id="selecoes" className="pt-24 pb-6 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <span className="text-gold uppercase tracking-[0.3em] text-xs max-[440px]:text-[18px]">
                Confira a seguir:
              </span>
              <h2 className="display text-5xl md:text-6xl mt-2 uppercase">
                Todas as 48 SELEÇÕES
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md max-[440px]:text-white max-[440px]:text-[18px]">
              As potências históricas, as seleções coadjuvantes e as estreantes.
            </p>
          </div>

          {selecoes.map((s) => (
            <Link key={s.id} to={`/selecoes/${s.id}`}>
              <div className="group mb-3.5 relative bg-background border border-border rounded-xl p-6 hover:border-primary transition-all hover:-translate-y-1 cursor-pointer">
                <div className="display text-2xl max-[393px]:text-[18px] max-[440px]:text-[18px]">
                  {s.nome}
                </div>
                <div className="absolute top-5 right-4 display text-3xl text-primary/80 max-[393px]:top-6 max-[393px]:right-2 max-[393px]:text-[20px] max-[440px]:text-[20px] max-[440px]:top-6 max-[440px]:right-2">
                  Ver +
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TOP 5 SELEÇÕES */}
      <section id="selecoes" className="py-24 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <span className="text-gold uppercase tracking-[0.3em] text-xs"></span>
              <h2 className="display text-5xl md:text-6xl mt-2 uppercase">
                Top 5 Campeãs
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md max-[440px]:text-white max-[440px]:text-[18px]">
              As top 5 campeãs do mundo que estarão nesta copa do mundo!
            </p>
          </div>

          {topSelecoes.map((s) => (
            <div
              key={s.id}
              className="group mb-3.5 relative bg-background border border-border rounded-xl p-6 hover:border-primary transition-all hover:-translate-y-1"
            >
              <div className="display text-2xl">
                <p>{s.nome}</p>
                <div className="absolute top-4 right-4 display text-3xl text-primary/80">
                  <p>
                    {s.quantidadeTitulos === 5 && "★★★★★"}
                    {s.quantidadeTitulos === 4 && "★★★★"}
                    {s.quantidadeTitulos === 3 && "★★★"}
                    {s.quantidadeTitulos === 2 && "★★"}
                    {s.quantidadeTitulos === 1 && "★"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HISTÓRIA */}
      <section id="historia" className="pt-24 pb-17 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent uppercase  tracking-[0.3em] text-xs max-[440px]:text-20px max-[440px]:font-bold">
              Hall da Glória
            </span>
            <h2 className="display text-5xl md:text-7xl mt-4">
              CAMPEÕES RECENTES
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            <div className="space-y-8">
              {CHAMPIONS.map((c, i) => (
                <div
                  key={c.year}
                  className={`relative flex items-center gap-6 max-[440px]:justify-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-[5px] md:-translate-x-1/2 ring-4 ring-background" />
                  <div className="ml-12 md:ml-0 md:w-1/2 md:px-12 max-[440px]:ml-2">
                    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary transition max-[440px]:p-8">
                      <div className="flex items-center justify-between mb-2 max-[370px]:flex max-[370px]:gap-5 max-[440px]:flex max-[440px]:gap-5">
                        <span className="display text-4xl text-primary">
                          {c.year}
                        </span>
                        <span className="text-4xl max-[370px]:pb-2 max-[393px]:pb-3 max-[393px]:pl-2">
                          {c.emoji}
                        </span>
                      </div>
                      <div className="display text-2xl">{c.country}</div>
                      <div className="text-sm text-muted-foreground max-[440px]:text-white">
                        Sede: {c.host}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* {JOGADORES} */}
      <section
        id="artilheiros"
        className="relative pt-15 pb-17 px-6 bg-primary overflow-hidden"
        style={{ background: "var(--gradient-hero-bottom)" }}
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={gol}
            alt="Jogador comemorando gol"
            className="w-full h-full object-cover"
          />
          {/* Overlay opcional */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* ARTILHEIROS */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent uppercase tracking-[0.3em] text-xs  max-[440px]:text-20px max-[440px]:font-bold">
              Hall da Fama
            </span>
            <h2 className="display text-5xl md:text-7xl mt-4">
              JOGADORES ARTILHEIROS
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-background md:-translate-x-px max-[440px]:hidden" />

            <div className="space-y-8">
              {jogadores.map((j, i) => (
                <Link key={j.id} to={`jogadores/artilheiros/${j.id}`}>
                  <div
                    className={`relative flex items-center gap-6 max-[440px]:gap-8 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-[5px] md:-translate-x-1/2 ring-4 ring-background max-[440px]:hidden" />
                    <div className="ml-12 md:ml-0 md:w-1/2 md:px-12 max-[440px]:pb-3 max-[440px]:ml-0 max-[440px]:w-full ">
                      <div className="bg-transparent border border-background rounded-xl p-6 hover:border-primary transition max-[393px]:p-7 ">
                        <div className="flex items-center justify-between mb-2 gap-3 max-[370px]:flex-col max-[370px]:items-start">
                          <span className="display text-4xl text-white max-[370px]:text-2xl">
                            {j.nomeJogador}
                          </span>

                          <span className="text-4xl text-primary max-[370px]:text-3xl">
                            {j.numeroDeGols}
                          </span>
                        </div>

                        <div className="text-sm text-muted-foreground max-[370px]:text-xs max-[440px]:text-white max-[440px]:text-[18px]" >
                          Seleção: {j.selecao}
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block md:w-1/2 " />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section
        id="contagem"
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-gold uppercase tracking-[0.3em] text-xs">
            Faltam
          </span>
          <h2 className="display text-5xl md:text-7xl mt-4 mb-12">
            PARA A FINAL
          </h2>

          <div className="grid grid-cols-4 gap-3 md:gap-6">
            {[
              { v: d, l: "Dias" },
              { v: h, l: "Horas" },
              { v: m, l: "Min" },
              { v: s, l: "Seg" },
            ].map((x) => (
              <div
                key={x.l}
                className="bg-card/60 backdrop-blur border border-primary/30 rounded-xl py-8 px-2 max-[370px]:py-5"
                style={{ boxShadow: "var(--shadow-gold)" }}
              >
                <div className="display text-5xl md:text-7xl text-primary tabular-nums ">
                  {String(x.v).padStart(2, "0")}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2 max-[440px]:text-white">
                  {x.l}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 text-muted-foreground text-lg max-[440px]:text-white">
            19 de Julho de 2026 · MetLife Stadium (Nova Jersey / Nova York, EUA)
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <Footer>
        <p className="text-sm text-muted-foreground max-[440px]:text-[20px] max-[440px]:text-white">
          Site informativo não oficial · Feito com paixão pelo futebol © {year}{" "}
          Caio.
        </p>
      </Footer>
    </div>
  );
}
