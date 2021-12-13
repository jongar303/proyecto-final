const express = require("express");
const app = express ();
const port = 3000;
const mongoose = require("mongoose");


app.use(require('body-parser').urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost/prueba");

const usuarios = mongoose.model("usuarios",{
	nit:String,
	nombre:String,
	correo:String,
	ciudad:String,
	direccion:String,
	telefono:String
});

app.get("/listar",(req,res)=>{
	console.log("listar");
	
	usuarios.find((err,doc)=>{
		//res.send(doc);
		console.log(doc);
		let html="";
		let usuario;
		for(var i in doc)
		{
			usuario=doc[i];
			html+=`<span>${usuario.nit}<span>
			<span>${usuario.nombre}<span>
			<span><a href=mailto:${usuario.correo}">${usuario.correo}</a><span>
			<span>${usuario.ciudad}<span>
			<span>${usuario.direccion}<span>
			<span>${usuario.telefono}<span><br>`;
		}
 		res.send(html);
		
	});

});


app.get("/",(req,res)=>{
	console.log("Se le envia a la terminal de comandos");
	res.send("Guardar Usuario");
	/*new usuarios({
		nit:"890654723",
		nombre:"santaleña",
		correo:"serviciosantalena@gmail.com"
	}).save().then(()=>console.log("Exito"));*/

});
app.post("/grabar",(req,res)=>{
	/*console.log("post de grabar", req,req.body,req.query);
	res.json(req.body);*/
	new usuarios(req.body).save().then(()=>{
		res.send("usuario guadado con exito");
		});
});

app.get("/registro",(req,res)=>{
	let registrarse =`<form action ="/grabar" method="post">
					
					<label for="nit">Nit:</label>
					<input type="text" id="nit" placeholder="Enter Nit" ><br>

					<label for="nombre">Nombre de la empresa:</label>
					<input type="text" placeholder="Enter Name" ><br>

					<label for="correo">Correo electronico:</label>
					<input type="text" placeholder="Correo electronico" ><br>

					<label for="ciudad">Ciudad:</label>
					<input type="text" placeholder="Ciudad" ><br>

					<label for="dirección">Dirección:</label>
					<input type="text" placeholder="Dirección" ><br>

					<label for="telefono">Telefono:</label>
					<input type="text" placeholder="Numero" ><br>

					<label for="Contraseña">Contraseña:</label>
					<input type="Password" placeholder="Contraseña"><br>

					<label for="Confirmar Contraseña">Confirmar contraseña:</label>
					<input type="Password" placeholder="Confirmar contraseña"><br>

					<input type="submit" value="Registrarse"><br>

            				<a href="Index.html">Ya tengo una cuenta</a>

				      </form>`;
				      res.send(registrarse);

});


app.listen(port,()=>{
	console.log("Empezo el servidor");
});

