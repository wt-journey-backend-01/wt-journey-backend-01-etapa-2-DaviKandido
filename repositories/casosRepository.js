/*
Estrutura de um caso:
id: string (UUID) obrigatório.
titulo: string obrigatório.
descricao: string obrigatório.
status: deve ser "aberto" ou "solucionado" obrigatório.
agente_id: string (UUID), id do agente responsável obrigatório Exemplo:

{
    "id": "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
    "titulo": "homicidio",
    "descricao": "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    "status": "aberto",
    "agente_id": "401bccf5-cf9e-489d-8412-446cd169a0f1" 

}


Regras e Validações:
status deve ser "aberto" ou "solucionado".
IDs inexistentes devem retornar status 404.
Dados mal formatados devem retornar status 400.
Status HTTP esperados: 201, 200, 204, 400, 404.
*/

const { v4: uuidv4 } = require("uuid");

const casos = [
  {
    id: uuidv4(),
    titulo: "homicidio",
    descricao:
      "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
  },
  {
    id: uuidv4(),
    titulo: "roubo a residência",
    descricao:
      "Na madrugada de 15/08/2023, uma residência no bairro Santa Luzia foi invadida por dois indivíduos armados. Objetos de valor foram levados.",
    status: "solucionado",
    agente_id: "6f90f273-bc5c-4c4a-8ff8-7d2a0ffec112",
  },
  {
    id: uuidv4(),
    titulo: "tráfico de drogas",
    descricao:
      "Durante patrulhamento em 27/06/2024, foi interceptado um veículo no bairro São Jorge transportando substâncias ilícitas.",
    status: "solucionado",
    agente_id: "bc1eeb78-d3ae-42b7-a1b7-d31ae3a04129",
  },
  {
    id: uuidv4(),
    titulo: "violência doméstica",
    descricao:
      "Ocorrência registrada no dia 02/03/2022 em um apartamento no centro da cidade. Vítima do sexo feminino, 32 anos, com marcas visíveis de agressão.",
    status: "aberto",
    agente_id: "5f8e81a7-e9cf-4321-93c3-6c364d68dce9",
  },
  {
    id: uuidv4(),
    titulo: "desaparecimento",
    descricao:
      "Jovem de 17 anos foi dado como desaparecido no dia 05/05/2025 após sair para a escola no bairro Jardim das Palmeiras e não retornar.",
    status: "solucionado",
    agente_id: "2c1eaf4e-7fd3-4f43-b470-d4b7df2f9c11",
  },
  {
    id: "28b7b167-f1a4-4fc9-9e7f-cc57a5a111e7",
    titulo: "furto de veículo",
    descricao:
      "Um carro modelo Gol 2012 foi furtado em frente ao shopping Vitória por volta das 13:45 do dia 03/04/2024.",
    status: "aberto",
    agente_id: "7c31b198-fde3-49f0-bbc0-2836106a7d09",
  },
  {
    id: "7e98cc40-7c39-4e3d-802e-689189fb888f",
    titulo: "fraude bancária",
    descricao:
      "Vítima relatou movimentações financeiras indevidas em sua conta bancária no dia 12/03/2023.",
    status: "solucionado",
    agente_id: "2b9f20d0-f408-4f88-9c79-1a5f2d26d042",
  },
  {
    id: "3ec2e7d3-9b2c-43d3-8c8c-f2d1e789e2f9",
    titulo: "vazamento de dados",
    descricao:
      "Servidores da prefeitura tiveram seus dados pessoais expostos em um fórum online.",
    status: "aberto",
    agente_id: "68c69d87-1e0e-49fd-a2a6-71975ebd110b",
  },
  {
    id: "c0878273-541e-4237-a370-2f2c06e6b066",
    titulo: "sequestro relâmpago",
    descricao:
      "Mulher foi rendida e obrigada a sacar dinheiro em caixas eletrônicos, no centro da cidade.",
    status: "solucionado",
    agente_id: "b7f9cfc8-3d17-4e04-8470-b4e7344b2d40",
  },
  {
    id: "fda44b89-b597-43b9-8616-35e0708986fb",
    titulo: "extorsão digital",
    descricao:
      "Criminosos exigem pagamento para não divulgar fotos íntimas da vítima obtidas por invasão de conta.",
    status: "aberto",
    agente_id: "74b1f376-83b6-4e43-844a-cba6f37c589c",
  },
  {
    id: "adf94700-59be-45ad-b4e5-44a81e2b5d3c",
    titulo: "acidente de trânsito com fuga",
    descricao:
      "Motociclista atingiu pedestre e fugiu sem prestar socorro na Av. das Américas, dia 01/06/2024.",
    status: "aberto",
    agente_id: "5c7e1bb1-3701-4b7b-a935-7f3acbe2b9a0",
  },
  {
    id: "ce1a20be-5688-43d5-8871-b91b3cfce684",
    titulo: "denúncia ambiental",
    descricao:
      "Despejo irregular de lixo industrial em área de preservação ambiental, próximo ao rio Serra Azul.",
    status: "aberto",
    agente_id: "0e0b18f3-9a64-4e12-a063-e8efb207d528",
  },
  {
    id: "c70cd703-438f-44c1-96d4-c66254a4d1b3",
    titulo: "violação de domicílio",
    descricao:
      "Indivíduo invadiu residência desocupada na rua Maranhão, causando danos ao imóvel.",
    status: "solucionado",
    agente_id: "58f6a3bb-9e97-4c1b-8d02-9bbfd9d45e94",
  },
  {
    id: "f81cd6f4-1610-40a6-b144-12f7ff02e2f1",
    titulo: "furto em comércio",
    descricao:
      "Ladrão foi flagrado por câmeras furtando produtos eletrônicos em uma loja no centro.",
    status: "aberto",
    agente_id: "963b098a-8c3c-4745-b002-1c694bc9b2b5",
  },
  {
    id: "ae7589ae-6237-4389-b637-6e4e6d1a1b0b",
    titulo: "falsidade ideológica",
    descricao:
      "Homem foi preso tentando abrir conta bancária usando documentos falsos em nome de terceiro.",
    status: "solucionado",
    agente_id: "f5ea2d65-14a8-4be0-9454-21d5a72be981",
  },
];

const findAll = () => casos;

const findById = (id) => casos.find((caso) => caso.id === id);

const create = (caso) => {
  const newCaso = { id: uuidv4(), ...caso };
  casos.push(newCaso);
  return newCaso;
};

const update = (id, caso) => {
  const index = casos.findIndex((caso) => caso.id === id);
  if (index === -1) {
    return null;
  }
  const updatedCaso = { id, ...caso };
  casos[index] = updatedCaso;
  return updatedCaso;
};

const updatePartial = (id, caso) => {
  const index = casos.findIndex((caso) => caso.id === id);
  if (index === -1) {
    return null;
  }
  const updatedCaso = { ...casos[index], ...caso, id };
  casos[index] = updatedCaso;
  return updatedCaso;
};

const remove = (id) => {
  const index = casos.findIndex((caso) => caso.id === id);
  if (index === -1) {
    return null;
  }
  const removedCaso = casos[index];
  casos.splice(index, 1);
  return removedCaso;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  updatePartial,
  remove,
};
