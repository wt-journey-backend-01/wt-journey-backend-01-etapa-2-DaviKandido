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

      if (casosFiltrados.length === 0) {
        return next(
          new ApiError("Casos nao encontrados", 404, [
            { agente_id: "Agente informado não existe" },
          ])
        );
      }

      res.status(200).json(casosFiltrados);
      return;
    }

    if (req.query.status) {
      if (req.query.status !== "aberto" && req.query.status !== "solucionado") {
        return next(
          new ApiError("Parâmetros inválidos", 400, [
            {
              status:
                "O campo 'status' pode ser somente 'aberto' ou 'solucionado' ",
            },
          ])
        );
      }

      const casosFiltrados = casos.filter(
        (caso) => caso.status === req.query.status
      );

      if (casosFiltrados.length === 0) {
        return next(new ApiError("Casos nao encontrados", 404));
      }

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

      if (casosFiltrados.length === 0) {
        return next(
          new ApiError("Casos nao encontrados", 404, [
            { q: "Nenhum caso encontrado" },
          ])
        );
      }

      res.status(200).json(casosFiltrados);
      return;
    }

    res.status(200).json(casos);
  } catch (error) {
    next(
      new ApiError("Falha ao obter os casos:" + error, 500, [
        {
          q: "Nenhum caso encontrado",
        },
      ])
    );
  }
};

const getCasoById = (req, res, next) => {
  try {
    const { id } = req.params;
    const caso = casosRepository.findById(id);

    if (!caso) {
      return next(
        new ApiError("Caso nao encontrado", 404, [
          {
            id: "O id informado nao corresponde a nenhum caso",
          },
        ])
      );
    }

    const agente = agentesRepository.findById(caso.agente_id);
    if (!agente) {
      return next(
        new ApiError(
          "O agente informado não corresponde ao agente responsável pelo caso.",
          404,
          [
            {
              agente_id:
                "O agente informado nao corresponde ao agente responsavel pelo caso",
            },
          ]
        )
      );
    }

    res.status(200).json({caso, agente});
  } catch (error) {
    next(
      new ApiError("Falha ao obter o caso: " + error, 500)
    );
  }
};

const createCaso = (req, res, next) => {
  try {
    const caso = req.body;

    const agente = agentesRepository.findById(caso.agente_id);
    if (!agente) {
      return next(
        new ApiError("Agente referente ao caso nao encontrado", 404, [
          {
            agente_id: "O agente informado nao corresponde a nenhum agente",
          },
        ])
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

const updateCasoPartial = (req, res, next) => {
  try {
    const { id } = req.params;
    const casoPartial = req.body;

    if (casoPartial.agente_id) {
      const agente = agentesRepository.findById(casoPartial.agente_id);
      if (!agente) {
        return next(
          new ApiError("Agente referente ao caso nao encontrado", 404)
        );
      }
    }

    const casoAtualizado = casosRepository.updatePartial(id, casoPartial);

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

    res.status(204).send();
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
  updateCasoPartial,
  deleteCaso,
};
