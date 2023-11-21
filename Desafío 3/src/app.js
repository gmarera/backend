const express = require("express");
const ProductManager = require("./ProductManager");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsInstance = new ProductManager("./products.json");
const products = productsInstance.getProducts();

app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  const products = await productsInstance.getProducts();
  const limitedProducts = await productsInstance.getLimitedProducts(limit);
  if (!limit) {
    return res.json(products);
  } else {
    return res.json(limitedProducts);
  }
});

app.get("/products/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  const filteredProduct = await productsInstance.getProductById(pid);
  if (filteredProduct) {
    res.json(filteredProduct);
  } else {
    res.status(404).send("Producto inexistente.");
  }
});

app.listen(8080, () => {
  console.log(`App escuchando en puerto 8080`);
});
