async function prueba() {
  const ProductManager = require("./ProductManager");

  // Instancio la Clase
  const productsInstance = new ProductManager("./products.json");

  // Creo 4 productos, 1 de ellos lo repito para comprobar si funciona el exists, en duplicado.
  console.log("**** Creación de Productos ****");
  await productsInstance.addProduct("Celular Samsumg", "Celular Samsung 10a", 100000, "No image", "celu1", 10);
  await productsInstance.addProduct("Celular Xiaomi", "Celular Xiaomi Redmi 10", 120000, "No image", "celu2", 5);
  await productsInstance.addProduct("Plancha Noblex", "Plancha a vapor Noblex", 30000, "No image", "plancha1", 10);
  await productsInstance.addProduct("Plancha TCL", "Plancha común", 13000, "No image", "plancha2", 10);
  await productsInstance.addProduct("Plancha TCL", "Plancha común", 13000, "No image", "plancha2", 10);

  console.log("Productos cargados: \n");
  const products = await productsInstance.getProducts();
  console.log(products);
}

prueba();
