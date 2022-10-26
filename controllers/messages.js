const { request, response } = require("express")
const { param } = require("../routes/messages")

const rootMessage = (req=request, res=response) => {
    const {texto1, texto2}=req.query
/*console.log(req.query)/*El query tiene almacenado el mensaje Hola
    if(!texto1 || !texto2){
        res.status(400).json({
         msg:'No se ha enviado los parametros necesarios, este EndPoint ocupa los parametros texto1 y texto2 '
       })
    }*/
 if (!texto1){
    res.status(400).json({msg:"Falta el parametro 'texto1'"})
 }
 if(!texto2){
    res.status(400).json({msg:"Falta el parametro 'texto2'"})
 }
    res.status(200).json({msg: texto1 + ' ' + texto2})
}
/*PROBAR UN STATUS EN CADA UNA DE ELLAS: res.status(número del error).json*/

const hiMessage =(req=request, res=response) => {
   // console.log(req.params)//
   const {name} = req.params
   res.json({msg:'Hola ' + name})
    //res.status(405).json({msg:'Hola Mundo'})//
}

const byMessage = (req=request, res=response) => {
    res.status(406).json({msg:'Adios Mundo'})
}

const postMessage = (req=request, res=response) => {
    const{no_control, nombre} = req.body
    //console.log({no_control, nombre})
    res.json({
        msg: `Número de Control = ${no_control}, Nombre = ${nombre}`
    })
}

const putMessage = (req=request, res=response) => {
    res.status(408).json({msg:'Mensaje PUT'})
}

const deleteMessage = (req=request, res=response) => {
    res.status(409).json({msg:'Mensaje DELETE'})
}

    module.exports = {rootMessage, hiMessage, byMessage, postMessage, putMessage, deleteMessage}