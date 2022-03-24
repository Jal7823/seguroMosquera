const express = require("express");
const router = express.Router();
const policies = require("../../models/polices");

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
  const policiesDB = await policies.find();

  res.render("detailsPolice", {
    title: "Detalle de poliza",
    policies: policiesDB,
  });
});

router.get("/formPolice", (req, res) => {
  res.render("formPolices", { title: "Formulario de poliza" });
});

router.post("/formPolice", (req, res) => {
  
  console.log('==>',req.file.path);
  res.send("uploaded");
});

module.exports = router;
