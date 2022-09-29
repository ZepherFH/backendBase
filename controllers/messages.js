const { request, response } = require("express")

const rootMessage = (req=request, res=response) => {
    const {texto1, texto2}=req.query
    /*console.log(req.query)El query tiene almacenado el mensaje Hola
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

const hiMessage =(req=request, res=response) => {
    res.status(401).json({msg:'Hola Mundo'})
}

const byMessage = (req=request, res=response) => {
    res.status(418).json({msg:'Adios Mundo'})
}

const postMessage = (req=request, res=response) => {
    res.status(416).json({msg:'Mensaje POST'})
}

const putMessage = (req=request, res=response) => {
    res.status(414).json({msg:'Mensaje PUT'})
}

const deleteMessage = (req=request, res=response) => {
    res.status(422).json({msg:'Mensaje DELETE'})
}

    module.exports = {rootMessage, hiMessage, byMessage, postMessage, putMessage, deleteMessage}