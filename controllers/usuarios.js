const { request, response } = require("express");
const pool = require("../db/connection")
const getUsers = async (req = request, res = response) =>{
    let conn;
    try{
        conn = await pool.getConnection()
        const users = await conn.query("SELECT * FROM usuarios", (error) =>{throw new Error(error)})
        if (!users){
            res.status(404).json({msg:"No se encontraron datos"})
            return
        }
        res.json({users})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}
const getUsersByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn;
    try{ 
        conn = await pool.getConnection()
        const [user] = await conn.query(`SELECT * FROM usuarios WHERE ID = ${id}`, (error) =>{throw new Error(error)})
        if (!user){
            res.status(404).json({msg: `No se encontró registro con el ID ${id}`})
            return
        }
        res.json({user})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}
const deleteUsersbyID = async (req = request, res = response) =>{
    const {id} = req.query
    let conn;
    try{ 
        conn = await pool.getConnection()
        const {affectedrows} = await conn.query(`UPDATE usuarios SET Activo = 'N' WHERE ID = ${id}`, (error) =>{throw new Error(error)})
        
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
const addUsers = async (req = request, res = response) =>{
    const {
        Usuario,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contraseña,
        Fecha_Nacimiento,
        Activo

    } = req.body
    if (
        !Nombre ||
        !Apellidos ||
        !Edad ||
        !Usuario ||
        !Contraseña ||
        !Activo
    ){ res.status(400).json({msg:"Falta informaciòn del usuario"})}
    
    let conn;
    try{ 
        conn = await pool.getConnection()
        //No exista el usuario antes de insertar
        const {affectedRows} = await conn.query(`INSERT INTO usuarios (
            Usuario,
            Nombre,
            Apellidos,
            Edad,
            Genero,
            Contraseña,
            Fecha_Nacimiento,
            Activo
        ) VALUES (
            '${Usuario}',
            '${Nombre}',
            '${Apellidos}',
            ${Edad},
            '${Genero}',
            '${Contraseña}',
            '${Fecha_Nacimiento}',
            '${Activo}'
        )`, (error) =>{throw new Error(error)})
        
        if (affectedRows === 0){
            res.status(404).json({msg: `No se pudo agregar el registro del usuario ${Usuario}}`})
            return
        }
        res.json({msg:`Se agregp satisfactoriamente el registro con el usuario ${Usuario}`})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}
module.exports = {getUsers, getUsersByID, deleteUsersbyID, addUsers}