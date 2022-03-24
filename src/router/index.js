const express = require("express");
const router = express.Router();
const policies = require("../../models/polices");
const imagenes = require("../../models/polices");

router.get("/", async (req, res) => {
  const policiesDB = await policies.find();

  res.render("index", {
    title: "Index",
    policies: policiesDB,
  });
});

router.get("/base", (req, res) => {
  res.render("base", { title: "Base" });
});

router.get("/detail/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const policiesDB = await policies.find();
    const policieDB = await policies.findOne({ _id: id });
    res.render("detailsPolice", {
      title: "Detalle de poliza",
      policie: policieDB,
      policies: policiesDB,
      error: false,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/formPolice", (req, res) => {
  res.render("formPolices", { title: "Formulario de poliza" });
});

router.post("/formPolice", async (req, res) => {
  // console.log(req.body)
  console.log("file ==>", req.file);
  const imagenesDB = new imagenes();
  imagenesDB.name = req.body.name;
  imagenesDB.descriptions = req.body.descriptions;
  imagenesDB.img = "/img/uploads/" + req.file.filename;

  await imagenesDB.save();

  res.redirect("/formPolice");
});

module.exports = router;
