const templates = require("./templates");
const model = require("./models");
const fs = require("fs");
const path = require("path");

function home(req, res) {
  const inventory = model.getInventory();
  res.setHeader("Content-Type", "text/html");
  res.write(templates.home(inventory));
  return res.end();
}

function item(req, res, id) {
  const item = model.getItem(id);

  if (!item) {
    res.writeHead(404);
    res.end("Item not found");
    return;
  }

  res.setHeader("Content-Type", "text/html");
  res.write(templates.item(item));
  return res.end();
}

function addInventory(req, res) {
  let body = [];

  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const rawBody = Buffer.concat(body).toString();
    const contentType = req.headers["content-type"] || "";
    let itemName = "";

    if (contentType.includes("application/json")) {
      // "{"name": "itemName"}"
      itemName = JSON.parse(rawBody).name;
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      // "name=itemName"
      itemName = rawBody.split("=")[1];
    }

    if (itemName) {
      model.addItem(itemName);
    }

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  });
}

function astronomy(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.write(templates.astronomy());
  return res.end();
}

function serbal(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.write(templates.serbal());
  return res.end();
}

function serveImage(req, res, imagePath) {
  const fullPath = path.join(__dirname, imagePath);
  try {
    const img = fs.readFileSync(fullPath);
    const ext = path.extname(imagePath).toLowerCase();
    const contentType =
      ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";
    res.setHeader("Content-Type", contentType);
    res.end(img);
  } catch (err) {
    res.statusCode = 404;
    res.end("Image not found");
  }
}

function serveStylesheet(req, res, cssPath) {
  const fullPath = path.join(__dirname, cssPath);

  try {
    const css = fs.readFileSync(fullPath, "utf8");

    res.setHeader("Content-Type", "text/css");
    res.end(css);
  } catch (err) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Stylesheet not found");
  }
}

function notFound(req, res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html");
  res.write(templates.notFound());
  return res.end();
}

module.exports = {
  home,
  item,
  addInventory,
  astronomy,
  serbal,
  serveImage,
  serveStylesheet,
  notFound,
};
