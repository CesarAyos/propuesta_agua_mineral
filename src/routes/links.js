const express = require("express");
const router = express.Router();
const Handlebars = require("handlebars");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/add", (req, res) => {
  res.render("links/add");
});

router.post("/add", async (req, res) => {
  const { nombre, apellido, Pedido, Direccion, Numero, Sector,Punto } = req.body;
 
  const newLink = {
    nombre,
    apellido,
    Pedido,
    Direccion,
    Numero,
    Sector,
    Punto,
  };
  
  await pool.query('INSERT INTO pedidos set ?', [newLink]);
  req.flash('success', 'Su orden se a realizado en minutos llegara su pedido, para mas informacion xxxx-xxxxxxx');
  res.redirect('/links/add');

});



router.get("/", isLoggedIn, async (req, res) => {
  const pedidos = await pool.query("SELECT * FROM pedidos");
  res.render('links/list',{pedidos});
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM pedidos WHERE ID = ? ", [id]);
  req.flash("success", "producto a sido elimnado, ya se entrego la orden");
  res.redirect("/links");   
});


router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const pedidos = await pool.query("SELECT * FROM pedidos WHERE id = ?", [id]);
  res.render("links/edit", { pedidos: pedidos[0]});
});


router.post("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, Pedido,Direccion,Numero,Sector,Punto } = req.body;
  const newLink = {
    nombre,
    apellido,
    Pedido,
    Direccion,
    Numero,
    Sector,
    Punto,
  };
  await pool.query('UPDATE pedidos set ? WHERE id ', [newLink]);
  req-flash('success',"producto modificado");
  res.redirect("/links/");
});

router.get("/desayunos", async (req, res) => {
  const agua = await pool.query("SELECT * FROM pedidos");
  res.render("links/desayunos", { agua });
});

router.get("/inicio2", async (req, res) => {
  const links = await pool.query("SELECT * FROM pedidos");
  res.render("links/inicio2", { links });
});

Handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

// router.get('/imagen/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const rows = await pool.query('SELECT imagen FROM links WHERE id = ?', [id]);
//     const imagen = rows[0].imagen;
//     res.sendFile(path.resolve(imagen));
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error al leer la imagen');
//   }
// });





module.exports = router;
