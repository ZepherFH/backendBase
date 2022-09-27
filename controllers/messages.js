const { request, response } = require("express")

const rootMessage = (req=request, res=response) => {
    res.send({msg:'Mensajes'})
}

const hiMessage =(req=request, res=response) => {
    res.json({msg:'Hola Mundo'})
}

const byMessage = (req=request, res=response) => {
    res.json({msg:'Adios Mundo'})
}

const postMessage = (req=request, res=response) => {
    res.json({msg:'Mensaje POST'})
}

const putMessage = (req=request, res=response) => {
    res.json({msg:'Mensaje PUT'})
}

const deleteMessage = (req=request, res=response) => {
    res.json({msg:'Mensaje DELETE'})
}

    module.exports = {rootMessage, hiMessage, byMessage, postMessage, putMessage, deleteMessage}