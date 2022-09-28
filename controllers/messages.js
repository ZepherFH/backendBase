const { request, response } = require("express")

const rootMessage = (req=request, res=response) => {
    res.status(400).send({msg:'Mensajes'})
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