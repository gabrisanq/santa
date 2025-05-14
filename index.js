const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
const PORT = 5500;
const bodyParser = require('body-parser');
const Product = require("./models/product");

// Configurazione body-parser per gestire i dati del body delle richieste
app.use(bodyParser.urlencoded({ extended: true }));

// Configurazione EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Configurazione method-override per le richieste POST, PUT e DELETE dai forms in HTML
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Configurazione dei file statici
app.use(express.static(path.join(__dirname, 'public')));

// Connessione a MongoDB

mongoose.connect("mongodb+srv://gabryscuola8:G3f2EYlTXrqLAI5r@cluster0.xyqpfcv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connesso a MongoDB"))
    .catch((err) => console.log("Errore nella connessione a MongoDB", err));


// Definizione degli endpoints
app.get('/', (req, res) => {
  res.render('homepage.ejs');
});

app.get("/products", async (req, res) => {
    const products = await Product.find({});
    res.render("products/index", { products });
  });

  app.get("/products/new", (req, res) => {
    res.render("products/new");
  });

  app.post("/products/new", async (req, res) => {
    const { nome, prezzo, descrizione } = req.body;
  
    const product = new Product({
      nome,
      prezzo,
      descrizione,
    });
  
    await product.save();
  
    res.redirect("/products");
  });

  app.get("/products/edit/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("products/edit", { product: product });
  });

  app.put("/products/:id", async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/products");
  });

  app.delete("/products/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
  });

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
})