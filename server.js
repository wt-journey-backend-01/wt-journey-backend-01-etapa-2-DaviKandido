const app = require('./app');


const PORT = process.env.PORT || 3000;

// Catch-all para rotas não encontradas → envia para o middleware de erro
app.use((req, res, next) => {
    const error = new Error('Page not found!');
    error.status = 404;
    next(error); // passa para o middleware de erro
});

// Middleware de erro que trata 404 e demais erros
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Something went wrong!",
        status: err.status || 500,
        url: req.url,
        method: req.method,
        query: req.query,
        params: req.params,
        headers: req.headers,
        body: req.body,
        errors: [{...err}] // opcional, útil para debug
    });
});


app.listen(PORT, () => {
  console.log(
    `Servidor do Departamento de Polícia rodando em localhost:${PORT}`
  );
});
