const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./products.json";
    this.products = [];
    this.idAuto = 1;
    this.getProducts(true);
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const exists = this.products.find((product) => product.code === code);
    if (exists) {
      return console.log("El producto " + title + " ya existe");
    }

    const newProduct = {
      id: this.idAuto,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };
    this.products.push(newProduct);
    this.idAuto++;
    const productsJson = JSON.stringify(this.products, null, 2);
    await fs.promises.writeFile(this.path, productsJson);
    console.log("Producto agregado: " + title);
  }

  getProducts() {
    const productsJson = fs.readFileSync(this.path, "utf-8");
    this.products = JSON.parse(productsJson);
    return this.products;
  }

  getProductById(id) {
    const productsJson = fs.readFileSync(this.path, "utf-8");
    this.products = JSON.parse(productsJson);
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      return console.log("Producto no encontrado");
    }
    return product;
  }

  updateProduct(id, title, description, price, thumbnail, code, stock) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      return console.log("Producto no encontrado");
    }
    product.title = title;
    product.description = description;
    product.price = price;
    product.thumbnail = thumbnail;
    product.code = code;
    product.stock = stock;
    const productsJson = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, productsJson);
    console.log("Producto actualizado: " + title);
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return console.log("Producto no encontrado");
    }
    this.products.splice(productIndex, 1);
    const productsJson = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, productsJson);
    console.log("Producto eliminado");
  }

  async getLimitedProducts(limit) {
    let productsInJson = await fs.promises.readFile("./products.json", "utf-8");
    productsInJson = JSON.parse(productsInJson);

    if (parseInt(limit) <= 0) {
      console.log("Límite inválido.");
    } else {
      return productsInJson.slice(0, parseInt(limit));
    }
  }
}

module.exports = ProductManager;
