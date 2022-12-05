const {request, response} = require("express");
const pool = require("../db/connection")
const modelsHonkai = require ("../models/honkai")
//Obtener información de todas las valkiryas
const getValkiryas = async (req = request, res = response) =>{
    let conn;
    try{
        conn = await pool.getConnection()
        const valks = await conn.query(modelsHonkai.queryGetValk, (error) =>{throw new Error(error)})
        if (!valks){
            res.status(404).json({msg:"No se encontraron datos"})
            return
        }
        res.json({valks})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}
//Obtener datos de una Valkiryas por el ID
const getValkiryasByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn;
    try{ 
        conn = await pool.getConnection()
        const [valk] = await conn.query(modelsHonkai.queryGetValkbyID, [id],(error) =>{throw new Error(error)})
        if (!valk){
            res.status(404).json({msg: `No se encontró registro con el ID ${id}`})
            return
        }
        res.json({valk})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}
//Desactivar una Valkiryas por su ID
const deleteValksbyID = async (req = request, res = response) =>{
    const {id} = req.query
    let conn;
    try{ 
        conn = await pool.getConnection()
        const {affectedrows} = await conn.query(modelsHonkai.queryDeleteValkByID,[id], (error) =>{throw new Error(error)})
        
        if (affectedrows === 0){
            res.status(404).json({msg: `No se pudo eliminar el registro con el ID ${id}`})
            return
        }
        res.json({msg: `Se elimino satisfactoriamente el registro con el ID ${id}`})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}
//Añadir una nuevo Valkiryas
const addValks = async (req = request, res = response) =>{
    const {
        Nombre,
        Actor_Voz,
        Rango,
        Genero,
        Arma,
        Cumpleaños,
        Altura,
        Peso,
        Activo
    } = req.body
    if (
        !Nombre ||
        !Actor_Voz ||
        !Rango ||
        !Arma ||
        !Activo
    ){ res.status(400).json({msg:"Falta informaciòn de la valkirya"})}
    
    let conn;
    try{ 
        conn = await pool.getConnection()
        //No exista el usuario antes de insertar
        const [Valk] = await conn.query(modelsHonkai.queryValkExists, [Nombre])
        if (Valk){
            res.status(403).json({msg:`La Valkirya ${Nombre} ya se encuentra registrado`})
            return
        }
        
        const {affectedRows} = await conn.query(modelsHonkai.queryAddValk, [
            Nombre,
            Actor_Voz,
            Rango,
            Genero || '',
            Arma,
            Cumpleaños || '',
            Altura || '',
            Peso || '',
            Activo
        ],(error) =>{throw new Error(error)})
        if (affectedRows === 0){
            res.status(404).json({msg: `No se pudo agregar el registro de la Valkirya ${Nombre}}`})
            return
        }
        res.json({msg:`Se agregp satisfactoriamente el registro con la Valkirya ${Nombre}`})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}
//Actualizar información de las Valkiryas
const updateValkByNombre = async (req = request, res = response) =>{
    const {
        Nombre,
        Actor_Voz,
        Rango,
        Genero,
        Arma,
        Cumpleaños,
        Altura,
        Peso
    } = req.body

    if (
        !Nombre ||
        !Actor_Voz ||
        !Rango ||
        !Arma
    ){
        res.status(400).json({msg:"Falta informacion del usuario"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()
        const [Valk] = await conn.query(modelsHonkai.queryGetValkInfo, [Nombre])
        if (!Valk){
            res.status(403).json({msg: `Los datos de la Valkirya ${Nombre} no se encuentra registrado`})
        }
        const {affectedRows} = await conn.query(modelsHonkai.queryUpdateValkByNombre, [
            Nombre||Valk.Nombre,
            Actor_Voz||Valk.Actor_Voz,
            Rango || Valk.Rango,
            Genero || Valk.Genero,
            Arma || Valk.Arma,
            Cumpleaños || Valk.Cumpleaños,
            Altura || Valk.Altura,
            Peso || Valk.Peso,
            Nombre
        ], (error) => {throw new Error(error) })
        if (affectedRows === 0) {
            res.status(404).json({msg:`No se pudo actualizar el registro de la Valkirya ${Nombre}`})
            return
        }
        res.json({msg: `Los datos de la Valkirya ${Nombre} se actualizo correctamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {getValkiryas, getValkiryasByID, deleteValksbyID, addValks, updateValkByNombre}