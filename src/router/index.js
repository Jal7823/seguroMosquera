const express = require("express");
const router = express.Router();
const policies = require("../../models/polices")

router.get("/", async (req, res) => {
  const policiesDB = await policies.find();
  res.render('index',{
    title: 'Index',
    policies:policiesDB,
  });
});

router.get("/base", (req, res) => {
  res.render('base',{title: 'Base'});
});

router.get('/:id', async (req, res) => {
  const policiesDB = await policies.find();

  res.render('detailsPolice',{
    title:'Detalle de poliza',
    policies:policiesDB,

  })
})



module.exports = router;
