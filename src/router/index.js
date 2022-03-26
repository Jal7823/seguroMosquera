const express = require("express");
const router = express.Router();
const policies = require("../../models/polices");
const imagenes = require("../../models/polices");
const nodemailer = require("nodemailer");

router.get("/", async (req, res) => {
  const policiesDB = await policies.find();

  res.render("index", {
    title: "Seguro Mosquera",
    policies: policiesDB,
  });
});


router.post("/", async (req, res) => {

  //Creamos el objeto de transporte
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c67b567f2de622",
      pass: "f659be89c2dbed",
    },
  });

  const mailOptions = {
    from: "tucorreo@gmail.com",
    to: "mi-amigo@yahoo.com",
    subject: "Asunto Del Correo",
    html: 
    
    `

    <style>
    
    .negrita{
      font-weight: bold;
    }


    </style>

    <div>
    
    <p class='negrita'>Buen dia Luis Fernando</p>


    <br>
    <br>
    <br>

    <p>

    Has tenido una nueva solicitud de cotizacion para una poliza de <span class='negrita'>${req.body.option}</span> :, te dejo los datos del cliente:
    </p>

    <p>Nombre y Apellido:<span class='negrita'> ${req.body.name} ${req.body.lastName}</p></span>
    <p>Telefono:<span class='negrita'> ${req.body.phone}</p></span>
    <p>Informacion adicional:<span class='negrita'> ${req.body.tArea}</p></span>




    </div>


    `,
  };

  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email enviado: " + info.response);
    }
  });
  // const mensaje =`Nombre:${req.body.name}, Apellido:${req.body.lastName},Telefono:${req.body.phone}, informacion adicional:${req.body.tArea}`;
  res.redirect('congratulations')



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

router.get("/quote", async (req, res) => {
  const policiesDB = await policies.find();
  res.render("quote", {
    title: "Cotizacion",
    policies: policiesDB,
  });
});

router.post("/quote", (req, res) => {
  //Creamos el objeto de transporte
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c67b567f2de622",
      pass: "f659be89c2dbed",
    },
  });

  console.log(req.body.option);
  const mailOptions = {
    from: "tucorreo@gmail.com",
    to: "mi-amigo@yahoo.com",
    subject: "Asunto Del Correo",
    html: 
    
    `

    <style>
    
    .negrita{
      font-weight: bold;
    }


    </style>

    <div>
    
    <p class='negrita'>Buen dia Luis Fernando</p>


    <br>
    <br>
    <br>

    <p>

    Has tenido una nueva solicitud de cotizacion para una poliza de <span class='negrita'>${req.body.option}</span> :, te dejo los datos del cliente:
    </p>

    <p>Nombre y Apellido:<span class='negrita'> ${req.body.name} ${req.body.lastName}</p></span>
    <p>Telefono:<span class='negrita'> ${req.body.phone}</p></span>
    <p>Informacion adicional:<span class='negrita'> ${req.body.tArea}</p></span>




    </div>


    `,
  };

  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email enviado: " + info.response);
    }
  });
  // const mensaje =`Nombre:${req.body.name}, Apellido:${req.body.lastName},Telefono:${req.body.phone}, informacion adicional:${req.body.tArea}`;
  res.redirect('congratulations')
});

router.get('/congratulations',(req, res)=>[
  res.render('congratulations',{title:'Felicidades!'})
])


module.exports = router;
