import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "./ui/dialog";
import { Search } from "lucide-react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const Tabela = ({ chaves, onAtualizarChaves }) => {
  const [pesquisaChave, setPesquisaChave] = useState("");
  const [chavesFiltradas, setChavesFiltradas] = useState([]);

  const urlAPI = "http://localhost:8080/registros";

  const buscarChave = () => {
    if (pesquisaChave == "") {
      setChavesFiltradas([]);
      return;
    } else {
      const novasChaves = chaves.filter((chave) =>
        chave.chave.includes(pesquisaChave)
      );
      setChavesFiltradas(novasChaves);
    }
  };

  const devolucaoChave = async (chave) => {
    try {
      await axios.patch(`${urlAPI}/${chave.id}`, {
        entregue: true,
      });
      await onAtualizarChaves();

      setPesquisaChave("");
      setChavesFiltradas([]);

      Toastify({
        text: "Chave devolvida com sucesso!",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#007f71",
        },
      }).showToast();
    } catch (error) {
      console.error("Erro ao remover a chave:", error);
      Toastify({
        text: "Erro ao remover a chave!",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "f44336",
        },
      }).showToast();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="cabecalho-tabela">
        <div className="titulo-tabela flex items-center justify-between">
          <CardTitle>Tabela de Chaves Retiradas</CardTitle>
          <CardDescription className="form-tabela">
            <form
              className="flex gap-3"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Input
                placeholder="Pesquise por uma chave"
                className="w-50"
                value={pesquisaChave}
                onChange={(e) => {
                  setPesquisaChave(e.target.value.toUpperCase());
                  buscarChave();
                }}
              />
              <Button
                className="w-9 h-9 cursor-pointer bg-[#007f71] hover:bg-[#079484]"
                type="submit"
              >
                <Search />
              </Button>
            </form>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 w-full">
        <div className="w-full">
          <Tabs defaultValue="naoEntregues" className="w-full">
            <TabsList className="w-full flex justify-between">
              <TabsTrigger value="naoEntregues" className="flex-1">
                Não entregues
              </TabsTrigger>
              <TabsTrigger value="vencidos" className="flex-1">
                Fora do prazo
              </TabsTrigger>
              <TabsTrigger value="entregues" className="flex-1">
                Entregues
              </TabsTrigger>
            </TabsList>
            <TabsContent value="naoEntregues">
              <Table>
                <TableCaption>
                  Lista com todas as chaves que ainda não foram devolvidas.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Data</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Matrícula</TableHead>
                    <TableHead>Chave</TableHead>
                    <TableHead>Devolução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(pesquisaChave ? chavesFiltradas : chaves).filter((chave) => chave.entregue == false).map((chave) => (
                    <TableRow
                      key={chave.id}
                      className={chave.noPrazo == true ? "" : "text-red-500"}
                    >
                      <TableCell className="font-medium">
                        {chave.dataFormatada}
                      </TableCell>
                      <TableCell>{chave.horaFormatada}</TableCell>
                      <TableCell>{chave.matricula}</TableCell>
                      <TableCell>{chave.chave}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="cursor-pointer w-[100%] bg-[#007f71] hover:bg-[#079484]">
                              Confirmar devolução
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Devolução de Chave</DialogTitle>
                              <DialogDescription>
                                Deseja confirmar que o funcionário devolveu a
                                chave?
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="grid grid-cols-2">
                              <DialogClose asChild>
                                <Button
                                  variant="destructive"
                                  className="w-full cursor-pointer"
                                >
                                  Cancelar devolução
                                </Button>
                              </DialogClose>

                              <DialogClose asChild>
                                <Button
                                  className="w-full cursor-pointer bg-[#007f71] hover:bg-[#079484]"
                                  onClick={() => devolucaoChave(chave)}
                                >
                                  Confirmar devolução
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>Total de chaves</TableCell>
                    <TableCell className="text-right">
                      {(pesquisaChave ? chavesFiltradas : chaves).filter((chave) => chave.entregue == false).length}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TabsContent>
            <TabsContent value="vencidos">
              <Table>
                <TableCaption>
                  Lista com todas as chaves que ainda não foram devolvidas e passaram do prazo.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Data</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Matrícula</TableHead>
                    <TableHead>Chave</TableHead>
                    <TableHead>Devolução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(pesquisaChave ? chavesFiltradas : chaves)
                    .filter((chave) => chave.noPrazo == false && chave.entregue == false)
                    .map((chave) => (
                      <TableRow
                        key={chave.id}
                        className={chave.noPrazo == true ? "" : "text-red-500"}
                      >
                        <TableCell className="font-medium">
                          {chave.dataFormatada}
                        </TableCell>
                        <TableCell>{chave.horaFormatada}</TableCell>
                        <TableCell>{chave.matricula}</TableCell>
                        <TableCell>{chave.chave}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="cursor-pointer w-[100%] bg-[#007f71] hover:bg-[#079484]">
                                Confirmar devolução
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Devolução de Chave</DialogTitle>
                                <DialogDescription>
                                  Deseja confirmar que o funcionário devolveu a
                                  chave?
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter className="grid grid-cols-2">
                                <DialogClose asChild>
                                  <Button
                                    variant="destructive"
                                    className="w-full cursor-pointer"
                                  >
                                    Cancelar devolução
                                  </Button>
                                </DialogClose>

                                <DialogClose asChild>
                                  <Button
                                    className="w-full cursor-pointer bg-[#007f71] hover:bg-[#079484]"
                                    onClick={() => devolucaoChave(chave)}
                                  >
                                    Confirmar devolução
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>Total de chaves</TableCell>
                    <TableCell className="text-right">
                      {
                        (pesquisaChave ? chavesFiltradas : chaves).filter(
                          (chave) => chave.noPrazo == false && chave.entregue == false
                        ).length
                      }
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TabsContent>
            <TabsContent value="entregues">
              <Table>
                <TableCaption>
                  Lista com todas as chaves que já foram devolvidas.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Data</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Matrícula</TableHead>
                    <TableHead>Chave</TableHead>
                    <TableHead>Devolução</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(pesquisaChave ? chavesFiltradas : chaves)
                    .filter((chave) => chave.entregue == true)
                    .map((chave) => (
                      <TableRow
                        key={chave.id}
                        className="text-[#079484]"
                      >
                        <TableCell className="font-medium">
                          {chave.dataFormatada}
                        </TableCell>
                        <TableCell>{chave.horaFormatada}</TableCell>
                        <TableCell>{chave.matricula}</TableCell>
                        <TableCell>{chave.chave}</TableCell>
                        <TableCell>
                          Entregue
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>Total de chaves</TableCell>
                    <TableCell className="text-right">
                      {
                        (pesquisaChave ? chavesFiltradas : chaves).filter(
                          (chave) => chave.entregue == true
                        ).length
                      }
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default Tabela;
