const agentesRepository = require("../repositories/agentesRepository");
const ApiError = require("../utils/errorHandler");

const getAgentes = (req, res, next) => {
  try {
    const agentes = agentesRepository.findAll();

    if (!agentes) {
      return next(new ApiError("Agentes nao encontrados", 404));
    }

    if (req.query.cargo) {
      const agentesFiltrados = agentes.filter(
        (agente) => agente.cargo === req.query.cargo
      );
      res.status(200).json(agentesFiltrados);
      return;
    }

    if (req.query.sort) {
      if (
        req.query.sort !== "dataDeIncorporacao" &&
        req.query.sort !== "-dataDeIncorporacao"
      ) {
        return res.status(400).json({
          status: 400,
          message: "Parâmetros inválidos",
          errors: [
            {
              status:
                "O campo 'sort' pode ser somente 'dataDeIncorporacao' ou '-dataDeIncorporacao' ",
            },
          ],
        });
      }

      if (req.query.sort === "dataDeIncorporacao") {
        agentes.sort(
          (a, b) =>
            new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao)
        );
      }
      if (req.query.sort === "-dataDeIncorporacao") {
        agentes.sort(
          (a, b) =>
            new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao)
        );
      }
    }

    res.status(200).json(agentes);
  } catch (error) {
    next(new ApiError("Falha ao obter os agentes: " + error, 500));
  }
};

const getAgenteById = (req, res, next) => {
  try {
    const { id } = req.params;
    const agente = agentesRepository.findById(id);

    if (!agente) {
      return next(new ApiError("Agente não encontrado", 404));
    }

    res.status(200).json(agente);
  } catch (error) {
    next(new ApiError("Falha ao obter o agente: " + error, 500));
  }
};

const createAgente = (req, res, next) => {
  try {
    const agente = req.body;
    const agenteCreado = agentesRepository.create(agente);
    res.status(201).json(agenteCreado);
  } catch (error) {
    next(new ApiError("Falha ao criar o agente: " + error, 500));
  }
};

const updateAgente = (req, res, next) => {
  try {
    const { id } = req.params;
    const agente = req.body;
    const agenteAtualizado = agentesRepository.update(id, agente);

    if (!agenteAtualizado) {
      return next(new ApiError("Agente nao encontrado", 404));
    }

    res.status(200).json(agenteAtualizado);
  } catch (error) {
    next(new ApiError("Falha ao atualizar o agente: " + error, 500));
  }
};

const updateAgentePartial = (req, res, next) => {
  try {
    const { id } = req.params;
    const agentePartial = req.body;
    const agenteAtualizado = agentesRepository.updatePartial(id, agentePartial);

    if (!agenteAtualizado) {
      return next(new ApiError("Agente nao encontrado", 404));
    }

    res.status(200).json(agenteAtualizado);
  } catch (error) {
    next(new ApiError("Falha ao atualizar o agente: " + error, 500));
  }
};

const deleteAgente = (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = agentesRepository.remove(id);

    if (!deleted) {
      return next(new ApiError("agente nao encontrado", 404));
    }

    res.status(204).send();
  } catch (error) {
    next(new ApiError("Falha ao deletar o agente: " + error, 500));
  }
};

module.exports = {
  getAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  updateAgentePartial,
  deleteAgente,
};
