import { useEffect, useState } from "react";
import { http } from "../services/api";
import ToDoContext from "./ToDoContext.js";

export default function ToDoProvider ({children}) {

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
        <ToDoContext value={{selecoes, setSelecoes, topSelecoes, setTopSelecoes, jogadores, setJogadores}}>
            {children}
        </ToDoContext>
      )
}