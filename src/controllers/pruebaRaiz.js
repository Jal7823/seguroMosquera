const express = require("express");
const router = express.Router();
const policies = require("../../models/polices");


const raiz = async (req, res) => {
    const policiesDB = await policies.find();
  
    res.render("index", {
      title: "Seguro Mosquera",
      policies: policiesDB,
    });
  }

module.exports = raiz;