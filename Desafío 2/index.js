const fs = require("fs");

class productManager {
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
    return this.products;
  }

  getProductById(id) {
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
}

// PRUEBAS

async function pruebasAsincronas() {
  // Instancio la Clase
  const productManagerInstance = new productManager();

  // Creo 4 productos, 1 de ellos lo repito para comprobar si funciona el exists, en duplicado.
  await console.log("\n**** Creación de Productos ****\n");
  await productManagerInstance.addProduct("Celular Samsumg", "Celular Samsung 10a", 100000, "No image", "celu1", 10);
  await productManagerInstance.addProduct("Celular Xiaomi", "Celular Xiaomi Redmi 10", 120000, "No image", "celu2", 5);
  await productManagerInstance.addProduct("Plancha Noblex", "Plancha a vapor Noblex", 30000, "No image", "plancha1", 10);
  await productManagerInstance.addProduct("Plancha TCL", "Plancha común", 13000, "No image", "plancha2", 10);
  await productManagerInstance.addProduct("Plancha TCL", "Plancha común", 13000, "No image", "plancha2", 10);

  // Muestro todos los productos
  await console.log("\n**** Muestro todos los productos ****");
  console.log(productManagerInstance.getProducts());

  // Muestro un producto por ID - Busco el ID 3
  await console.log("\n**** Muestro un producto por ID - ID Seleccionado: 3 ****");
  console.log(productManagerInstance.getProductById(3));

  // Actualizado el producto cuyo ID es el 2, actualizo precio y stock
  await console.log("\n**** Actualizado el producto cuyo ID es el 2 ****\n");
  productManagerInstance.updateProduct(2, "Celular Xiaomi", "Celular Xiaomi Redmi 10", 140000, "No image", "celu2", 10);
  console.log(productManagerInstance.getProductById(2));

  // Elimino el producto cuyo ID es el 3
  await console.log("\n**** Elimino el producto cuyo ID es el 3 ****\n");
  productManagerInstance.deleteProduct(3);
  console.log(productManagerInstance.getProducts());
}

pruebasAsincronas();
