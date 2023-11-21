class productManager {
  constructor() {
    this.products = [];
    this.idAuto = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
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
    return console.log("Producto agregado: " + title);
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
}

const productManagerInstance = new productManager();

productManagerInstance.addProduct("Celular Samsumg", "Celular Samsung 10a", 100000, "No image", "celu1", 10);
productManagerInstance.addProduct("Celular Xiaomi", "Celular Xiaomi Redmi 10", 120000, "No image", "celu2", 5);
productManagerInstance.addProduct("Plancha Noblex", "Plancha a vapor Noblex", 30000, "No image", "plancha1", 10);
productManagerInstance.addProduct("Plancha TCL", "Plancha común", 13000, "No image", "plancha2", 10);
productManagerInstance.addProduct("Plancha TCL", "Plancha común", 13000, "No image", "plancha2", 10);

console.log(productManagerInstance.getProducts());
console.log(productManagerInstance.getProductById(1));
console.log(productManagerInstance.getProductById(2));
