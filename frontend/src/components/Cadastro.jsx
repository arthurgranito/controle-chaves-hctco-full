import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";

const Cadastro = ({ onCadastroSucesso }) => {
  const [matricula, setMatricula] = useState("");
  const [chave, setChave] = useState("");

  const regexChave = /^[FM][0-9]{1,3}$/;

  const urlAPI = "http://localhost:8080/registros";

  const chaveJaRegistrada = async (chave) => {
    try {
      const response = await axios.get(urlAPI);
      const data = response.data;
      return data.some((registro) => registro.chave === chave);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
      return false;
    }
  };

  const registrarEntregaDeChave = async () => {
    if (!matricula || !chave) {
      Toastify({
        text: "Preencha todos os campos necessários!",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#fb2c36",
        },
      }).showToast();
    } else if (!regexChave.test(chave)) {
      Toastify({
        text: "A chave deve ser ou F ou M seguida de até 3 dígitos!",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#fb2c36",
        },
      }).showToast();
    } else {
      const chaveRegistrada = await chaveJaRegistrada(chave);

      if (chaveRegistrada) {
        Toastify({
          text: "Essa chave já está sendo utilizada!",
          duration: 3000,
          close: true,
          gravity: "bottom",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "#fb2c36",
          },
        }).showToast();

        return;
      } else {
        const dataRetirada = new Date();
        const noPrazo = Date.now() - dataRetirada.getTime() <= 12 * 60 * 60 * 1000;

        const registroRetirada = {
          matricula: matricula,
          chave: chave,
          dataRetirada: dataRetirada.toISOString(),
          noPrazo: noPrazo,
          entregue: false,
          dataEntrega: null,
        };

        await axios
          .post(urlAPI, registroRetirada)
          .then((response) => {
            console.log("Requisição bem sucedida:", response.data);
            setMatricula("");
            setChave("");

            Toastify({
              text: "Chave entregue com sucesso!",
              duration: 3000,
              close: true,
              gravity: "bottom",
              position: "left",
              stopOnFocus: true,
              style: {
                background: "#007f71",
              },
            }).showToast();

            if (onCadastroSucesso) {
              onCadastroSucesso();
            }
          })
          .catch((error) => {
            console.error("Erro na requisição:", error);
            return;
          });
      }
    }
  };

  return (
    <Card className="w-[70%] h-full cadastro">
      <CardHeader>
        <CardTitle>Cadastro de entrega de chaves</CardTitle>
        <CardDescription>
          Preencha com os dados necessários para entregar uma chave
        </CardDescription>
      </CardHeader>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          registrarEntregaDeChave();
        }}
      >
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="matricula">Matrícula</Label>
            <Input
              id="matricula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value.toUpperCase())}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="numeroChave">Número da chave</Label>
            <Input
              id="numeroChave"
              value={chave}
              onChange={(e) => setChave(e.target.value.toUpperCase())}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="cursor-pointer bg-[#007f71] hover:bg-[#079484]"
          >
            Registrar entrega da chave
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Cadastro;
