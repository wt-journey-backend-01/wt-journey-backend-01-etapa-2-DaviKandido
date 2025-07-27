
const { v4: uuidv4 } = require("uuid");

const agentes = [
  {
    id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "1992-10-04",
    cargo: "delegado",
  },
  {
    id: "6f90f273-bc5c-4c4a-8ff8-7d2a0ffec112",
    nome: "Larissa Souza",
    dataDeIncorporacao: "2005-06-12",
    cargo: "inspetora",
  },
  {
    id: "bc1eeb78-d3ae-42b7-a1b7-d31ae3a04129",
    nome: "Tiago Mendes",
    dataDeIncorporacao: "2010-03-22",
    cargo: "investigador",
  },
  {
    id: "5f8e81a7-e9cf-4321-93c3-6c364d68dce9",
    nome: "Patrícia Lima",
    dataDeIncorporacao: "2017-08-09",
    cargo: "escrivã",
  },
  {
    id: "2c1eaf4e-7fd3-4f43-b470-d4b7df2f9c11",
    nome: "Carlos Henrique",
    dataDeIncorporacao: "2013-11-30",
    cargo: "perito",
  },
  {
    id: "f5ea2d65-14a8-4be0-9454-21d5a72be981",
    nome: "Juliana Prado",
    dataDeIncorporacao: "2008-01-12",
    cargo: "delegada",
  },
  {
    id: "7c31b198-fde3-49f0-bbc0-2836106a7d09",
    nome: "Eduardo Ramos",
    dataDeIncorporacao: "2011-05-20",
    cargo: "investigador",
  },
  {
    id: "2b9f20d0-f408-4f88-9c79-1a5f2d26d042",
    nome: "Fernanda Costa",
    dataDeIncorporacao: "2019-07-30",
    cargo: "inspetora",
  },
  {
    id: "68c69d87-1e0e-49fd-a2a6-71975ebd110b",
    nome: "Marcelo Tavares",
    dataDeIncorporacao: "2003-04-02",
    cargo: "perito",
  },
  {
    id: "b7f9cfc8-3d17-4e04-8470-b4e7344b2d40",
    nome: "Silvia Andrade",
    dataDeIncorporacao: "2020-12-05",
    cargo: "escrivã",
  },
  {
    id: "74b1f376-83b6-4e43-844a-cba6f37c589c",
    nome: "André Fernandes",
    dataDeIncorporacao: "2016-09-18",
    cargo: "investigador",
  },
  {
    id: "5c7e1bb1-3701-4b7b-a935-7f3acbe2b9a0",
    nome: "Letícia Moraes",
    dataDeIncorporacao: "2015-03-27",
    cargo: "delegada",
  },
  {
    id: "0e0b18f3-9a64-4e12-a063-e8efb207d528",
    nome: "Bruno Silva",
    dataDeIncorporacao: "2001-11-14",
    cargo: "perito",
  },
  {
    id: "58f6a3bb-9e97-4c1b-8d02-9bbfd9d45e94",
    nome: "Tatiane Oliveira",
    dataDeIncorporacao: "2023-02-10",
    cargo: "inspetora",
  },
  {
    id: "963b098a-8c3c-4745-b002-1c694bc9b2b5",
    nome: "Rafael Martins",
    dataDeIncorporacao: "2018-06-01",
    cargo: "escrivão",
  }
];


const findAll = () => agentes;

const findById = (id) => agentes.find((agente) => agente.id === id);

const create = (agente) => {
  const newAgente = { id: uuidv4(), ...agente };
  agentes.push(newAgente);
  return newAgente;
};

const update = (id, agente) => {
  const index = agentes.findIndex((agente) => agente.id === id);
  if (index === -1) {
    return null;
  }
  const updatedagente = { ...agente, id };
  agentes[index] = updatedagente;
  return updatedagente;
};

const updatePartial = (id, agente) => {
  const index = agentes.findIndex((agente) => agente.id === id);
  if (index === -1) {
    return null;
  }
  const updatedagente = { ...agentes[index], ...agente, id };
  agentes[index] = updatedagente;
  return updatedagente;
};

const remove = (id) => {
  const index = agentes.findIndex((agente) => agente.id === id);
  if (index === -1) {
    return null;
  }
  const removedAgente = agentes[index];
  agentes.splice(index, 1);
  return removedAgente;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  updatePartial,
  remove,
};
