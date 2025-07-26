const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');

const {agentePostSchema, agentePatchSchema, agentePutSchema  } = require('../utils/ZodSchemas');
const {validateSchema} = require('../utils/validateSchemas');


/**
 * @openapi
 * components:
 *   schemas:
 *     Agente:
 *       type: object
 *       required:
 *         - id
 *         - nome
 *         - dataDeIncorporacao
 *         - cargo
 *       properties:
 *         id:
 *           type: string
 *         nome:
 *           type: string
 *         dataDeIncorporacao:
 *           type: string
 *           format: date
 *         cargo:
 *           type: string
 * 
 */



// Lista todos os agentes registrados.
/**
 * @openapi
 * /agentes:
 *   get:
 *     summary: Retorna todos os agente.
 *     description: Essa rota Lista todos os agentes.
 *     tags: [Agentes]
 *     parameters:
 *       - in: query
 *         name: cargo
 *         schema:
 *           type: string
 *         description: Cargo do agente
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Ordena os agentes por data de incorporação
 *     responses:
 *       200:
 *         description: Agente retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *                 nome: Rommel Carneiro
 *                 dataDeIncorporacao: 1992/10/04
 *                 cargo: delegado
 *       404:
 *         description: Agentes não encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 404
 *                 message: Agentes não encontrados
 *       500:
 *         description: Falha ao obter os agentes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 500
 *                 message: Falha ao obter os agentes
 *
 */
router.get('/', agentesController.getAgentes);


// Retorna os detalhes de um caso específico.
/**
 * @openapi
 * /agentes/{id}:
 *   get:
 *     summary: Retorna um agente.
 *     description: Essa rota Lista todos os agentes.
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id do agente
 *     responses:
 *       200:
 *         description: Agente retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Agente'
 *               example:
 *                 - id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *                   nome: Rommel Carneiro
 *                   dataDeIncorporacao: 1992/10/04
 *                   cargo: delegado
 *       404:
 *         description: Agente não encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 404
 *                 message: Agente não encontrados
 *       500:
 *         description: Falha ao obter o agente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 500
 *                 message: Falha ao obter o agente
 *
 */
router.get('/:id', agentesController.getAgenteById);


// Cria um novo caso com os seguintes campos:
/**
 * @openapi
 * /agentes:
 *   post:
 *     summary: Cria um agente
 *     description: Essa rota cria um novo agente.
 *     tags: [Agentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agente'
 *           examples:
 *             Agente:
 *               value:
 *                 nome: Rommel Carneiro
 *                 dataDeIncorporacao: 1992/10/04
 *                 cargo: delegado
 *     responses:
 *       201:
 *         description: Agente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *                 nome: Rommel Carneiro
 *                 dataDeIncorporacao: 1992/10/04
 *                 cargo: delegado
 *       400:
 *         description: Dados incorretos ou incompletos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 400
 *                 message: Parâmetros inválidos
 *                 errors:
 *                   - status: O campo 'status' pode ser somente 'aberto' ou 'solucionado'
 *                   - descricao: O campo 'descricao' precisa ter pelo menos 1 caractere 
*       500:
 *         description: Falha ao criar o agente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 500
 *                 message: Falha ao criar o agente 
 */
router.post("/", validateSchema(agentePostSchema), agentesController.createAgente);

// Atualiza os dados de um caso por completo.
/**
 * @openapi
 * /agentes:
 *   put:
 *     summary: Atualiza um agente
 *     description: Essa rota atualiza um agente.
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id do agente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agente'
 *           examples:
 *             Agente:
 *               value:
 *                 nome: Rommel Carneiro
 *                 dataDeIncorporacao: 1992/10/04
 *                 cargo: delegado
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *                 nome: Rommel Carneiro
 *                 dataDeIncorporacao: 1992/10/04
 *                 cargo: delegado
 *       404:
 *         description: Agente nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 404
 *                 message: Agente nao encontrado
 *       400:
 *         description: Dados incorretos ou incompletos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 400
 *                 message: Parâmetros inválidos
 *                 errors:
 *                   - status: O campo 'status' pode ser somente 'aberto' ou 'solucionado'
 *                   - descricao: O campo 'descricao' precisa ter pelo menos 1 caractere 
 *       500:
 *         description: Falha ao atualizar o agente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 500
 *                 message: Falha ao atualizar o agente 
 */
router.put('/:id', validateSchema(agentePutSchema), agentesController.updateAgente);

// Atualiza os dados de um caso parcialmente.
/**
 * @openapi
 * /agentes:
 *   patch:
 *     summary: Atualiza um agente parcialmente
 *     description: Essa rota atualiza um agente parcialmente.
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id do agente
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agente'
 *           examples:
 *             Agente:
 *               value:
 *                 nome: Rommel Carneiro
 *                 dataDeIncorporacao: 1992/10/04
 *                 cargo: delegado
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *                 nome: Rommel Carneiro
 *                 dataDeIncorporacao: 1992/10/04
 *                 cargo: delegado
 *       404:
 *         description: Agente nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 404
 *                 message: Agente nao encontrado
 *       400:
 *         description: Dados incorretos ou incompletos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 400
 *                 message: Parâmetros inválidos
 *                 errors:
 *                   - status: O campo 'status' pode ser somente 'aberto' ou 'solucionado'
 *                   - descricao: O campo 'descricao' precisa ter pelo menos 1 caractere 
 *       500:
 *         description: Falha ao atualizar o agente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 500
 *                 message: Falha ao atualizar o agente 
 */
router.patch('/:id', validateSchema(agentePatchSchema),agentesController.updateAgente);


// Remove um caso.
/**
 * @openapi
 * /agentes:
 *   delete:
 *     summary: deleta um agente
 *     description: Essa rota deleta um agente.
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id do agente
 *     responses:
 *       204:
 *         description: Agente deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: 401bccf5-cf9e-489d-8412-446cd169a0f1
 *                 nome: Rommel Carneiro
 *                 dataDeIncorporacao: 1992/10/04
 *                 cargo: delegado
 * 
 *       404:
 *         description: Agente nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 404
 *                 message: Agente nao encontrado
 * 
 *       500:
 *         description: Falha ao deletar o agente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: 500
 *                 message: Falha ao deletar o agente 
 */
router.delete('/:id', agentesController.deleteAgente);

module.exports = router;