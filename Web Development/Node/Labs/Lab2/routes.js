const controllers = require("./controllers");

const handler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    controllers.home(req, res);
    return;
  }

  if (url.startsWith("/item/") && method === "GET") {
    const segments = url.split("/").filter(Boolean);
    const id = segments[1];

    controllers.item(req, res, id);
    return;
  }

  if (url === "/inventory" && method === "POST") {
    controllers.addInventory(req, res);
    return;
  }

  if (url === "/astronomy") {
    controllers.astronomy(req, res);
    return;
  }

  if (url === "/serbal") {
    controllers.serbal(req, res);
    return;
  }

  if (url.startsWith("/images/")) {
    controllers.serveImage(req, res, url);
    return;
  }

  if (url.startsWith("/styles/") && url.endsWith(".css")) {
    controllers.serveStylesheet(req, res, url);
    return;
  }

  controllers.notFound(req, res);
};

module.exports = {
  handler,
};
