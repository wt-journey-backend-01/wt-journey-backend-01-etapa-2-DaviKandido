const express = require('express');
const swagger = require('./docs/swagger');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const casosRouter = require('./routes/casosRoutes');
const agentesRouter = require('./routes/agentesRoutes');


app.use("/casos", casosRouter);
app.use("/agentes", agentesRouter);


app.use((req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} | Requisição: ${req.method} ${req.url}`
  );
  next();
});



swagger(app);

module.exports = app;