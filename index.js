require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Base de datos y esquemas

mongoose.connect(process.env.MONGODB_URL)
.then(() =>{
    console.log("conexion exitosa a la base de datos")
})
.catch((error) => console.log("hubo un error al conectarse a la base de datos", { error}))

const animeSkema = new Schema({
  name: String,
  season: Number,
  chapter: Number,
  state: String,
  user: String,
  done: Boolean
})

const anime = mongoose.model("anime", animeSkema, "dbAnime")

//Parsear Json
app.use(express.json());

//Servir archivos estaticos
app.use(express.static('public'))


//Configurar Rutas//
app.get('/api/anime', (req, res) => {
  anime.find()
  .then((animes) => {
   res.status(200).json({ok:true, data: animes})
  })
  .catch((error) => {
   res
       .status(400)
       .json({ok: false, message: "Hubo un problema al obtener los animes"})
  })
 })

app.post('/api/anime', (req, res) => {
  const body = req.body
  console.log({ body })
  anime.create({
    name: body.name,
    season: body.season,
    chapter: body.chapter,
    state: body.state,
    user: body.user,
    done: false,
  }).then((createdAnime)=>{
    res
    .status(201)
    .json ({ ok:true, message: "Anime agregado con exito", data: createdAnime})
  }).catch((error) => {
    res.status(400).json({ok:false, message:"Error al agregar el Anime"})
  })
})

app.put('/api/anime/:id', (req, res) => {
  const body = req.body
  const id = req.params.id
  console.log({ body })
  anime.findByIdAndUpdate(id,{
    name: body.name,
    season: body.season,
    chapter: body.chapter,
    state: body.state,
    user: body.user,
    done: false,
  }).then((updatedAnime)=>{
    res
    .status(200)
    .json ({ ok:true, message: "Anime actualizado con exito", data: updatedAnime})
  }).catch((error) => {
    res.status(400).json({ok:false, message:"Error al actualizar el Anime"})
  })
})

app.delete('/api/anime/:id', (req, res) => {
  const id = req.params.id
  anime.findByIdAndDelete(id).then((deletedAnime) => {
    res.status(200).json({ok:true, data: deletedAnime })
  }).catch(() =>{
    res.status(400).json({ok:false, message: "Hubo un error al eliminar la tarea"})
  })
})


//Configurar Puerto//
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})