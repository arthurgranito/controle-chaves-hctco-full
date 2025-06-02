import React, { useEffect, useState } from "react";
import Cadastro from "./Cadastro";
import Tabela from "./Tabela";
import axios from "axios";

const Main = () => {
  const [chaves, setChaves] = useState([]);

  const buscarChaves = async () => {
    try {
      const response = await axios.get("http://localhost:8080/registros");
      const now = new Date();

      const registros = await Promise.all(
        response.data.map(async (chave) => {
          const dataJS = new Date(chave.dataRetirada);

          const diffMs = now - dataJS;
          const diffHours = diffMs / (1000 * 60 * 60);

          if (diffHours > 12 && chave.noPrazo == true && chave.entregue == false) {
            try {
              await axios.put(`http://localhost:8080/registros/${chave.id}`, {
                id: chave.id,
                chave: chave.chave,
                dataRetirada: chave.dataRetirada,
                matricula: chave.matricula,
                noPrazo: false,
                entregue: false,
              });
              chave.noPrazo = false;
            } catch (err) {
              console.error(
                `Erro ao atualizar noPrazo da chave ${chave.id}:`,
                err
              );
            }
          }

          return {
            id: chave.id,
            chave: chave.chave,
            matricula: chave.matricula,
            dataFormatada: dataJS.toLocaleDateString("pt-BR"),
            horaFormatada: dataJS.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            noPrazo: chave.noPrazo,
            entregue: chave.entregue,
          };
        })
      );

      setChaves(registros);
      console.log(registros);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
    }
  };

  useEffect(() => {
    buscarChaves();
    const intervalo = setInterval(() => {
      buscarChaves();
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <main className="px-10 py-5 flex gap-4 nav">
      <Cadastro onCadastroSucesso={buscarChaves} />

      <Tabela chaves={chaves} onAtualizarChaves={buscarChaves} />
    </main>
  );
};

export default Main;
