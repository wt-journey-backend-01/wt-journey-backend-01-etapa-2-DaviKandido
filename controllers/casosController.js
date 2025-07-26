const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");
const ApiError = require("../utils/errorHandler");

const getCasos = (req, res, next) => {
  try {
    const casos = casosRepository.findAll();

    if (req.query.agente_id) {
      const casosFiltrados = casos.filter(
        (caso) => caso.agente_id === req.query.agente_id
      );
      res.status(200).json(casosFiltrados);
      return;
    }

    if (req.query.status || req.query.status) {
      if (req.query.status !== "aberto" && req.query.status !== "solucionado") {
        return res.status(400).json({
          status: 400,
          message: "Parâmetros inválidos",
          errors: [
            {
              status:
                "O campo 'status' pode ser somente 'aberto' ou 'solucionado' ",
            },
          ],
        });
      }
    }

    if (req.query.status) {
      const casosFiltrados = casos.filter(
        (caso) => caso.status === req.query.status
      );
      res.status(200).json(casosFiltrados);
      return;
    }

    res.status(200).json(casos);
  } catch (error) {
    next(new ApiError("Falha ao obter os casos:" + error, 500));
  }
};

const getSearch = (req, res, next) => {
  try {
    const casos = casosRepository.findAll();

    if (req.query.q) {
      const casosFiltrados = casos.filter(
        (caso) =>
          caso.titulo.toLowerCase().includes(req.query.q.toLowerCase()) ||
          caso.descricao.toLowerCase().includes(req.query.q.toLowerCase())
      );
      res.status(200).json(casosFiltrados);
      return;
    }

    res.status(200).json(casos);
  } catch (error) {
    next(new ApiError("Falha ao obter os casos:" + error, 500));
  }
};

const getCasoById = (req, res, next) => {
  try {
    const { id } = req.params;
    const caso = casosRepository.findById(id);

    if (!caso) {
      return next(new ApiError("Caso nao encontrado", 404));
    }

    if (req.query.agente_id) {
      const agente = agentesRepository.findById(req.query.agente_id);
      if (!agente) {
        return next(
          new ApiError("Agente referente ao caso nao encontrado", 404)
        );
      }
      res.status(200).json(agente);
      return;
    }

    res.status(200).json(caso);
  } catch (error) {
    next(new ApiError("Falha ao obter o caso: " + error, 500));
  }
};

const createCaso = (req, res, next) => {
  try {
    const caso = req.body;


    const agente = agentesRepository.findById(caso.agente_id);
    if (!agente) {
    return next(
        new ApiError("Agente referente ao caso nao encontrado", 404)
    );
    }

    const casoCreado = casosRepository.create(caso);
    res.status(201).json(casoCreado);
  } catch (error) {
    next(new ApiError("Falha ao criar o caso: " + error, 500));
  }
};

const updateCaso = (req, res, next) => {
  try {
    const { id } = req.params;
    const caso = req.body;

    const agente = agentesRepository.findById(caso.agente_id);
    if (!agente) {
      return next(new ApiError("Agente referente ao caso nao encontrado", 404));
    }


    const casoAtualizado = casosRepository.update(id, caso);

    if (!casoAtualizado) {
      return next(new ApiError("Caso nao encontrado", 404));
    }

    res.status(200).json(casoAtualizado);
  } catch (error) {
    next(new ApiError("Falha ao atualizar o caso: " + error, 500));
  }
};

const deleteCaso = (req, res, next) => {
  try {
    const deleted = casosRepository.remove(req.params.id);

    if (!deleted) {
      return next(new ApiError("Caso nao encontrado", 404));
    }

    res.status(204).json();
  } catch (error) {
    next(new ApiError("Falha ao deletar o caso: " + error, 500));
  }
};

module.exports = {
  getCasos,
  getCasoById,
  getSearch,
  createCaso,
  updateCaso,
  deleteCaso,
};
