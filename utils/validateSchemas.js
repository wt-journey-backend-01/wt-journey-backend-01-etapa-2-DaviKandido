const z = require("zod");

function validateSchema(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issues = result.error.issues;
      const errors = {};
      for (const issue of issues) {
        const field = issue.path[0];
        const message = issue.message;

        if (!errors[field]) {
          errors[field] = message;
        }
      }
      return res.status(400).json({
        status: 400,
        message: "Parâmetros inválidos",
        errors,
      });
    }
    next();
  };
}

module.exports = {
  validateSchema,
};
