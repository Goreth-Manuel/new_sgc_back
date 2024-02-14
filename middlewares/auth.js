const { verify } = require("jsonwebtoken");
require("dotenv/config.js");

module.exports = {
  async authUsuario(req, res, next) {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      return res.status(401).json({ error: "Nenhum token fornecido" });
    }

    const [, token] = authHeaders.split(" ");
    try {
      verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (err)
          return res
            .status(400)
            .json({ error: "Failed to authenticate token." });
        req.session = decoded?.session;
        return next();
      });
    } catch (error) {
      res.json(error);
    }
  },
};
