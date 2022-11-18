const {request, response} = require("express");
const pool=require("../db/connection");
const bcryptjs=require("bcryptjs");
const {modeloUsuarios, updateUsuario} = require("../models/usuarios");
//Recibir datos de todos los usuarios
const getUsers = async(req=request,res=response)=>{
    
    let conn;

    try{
        conn = await pool.getConnection()
        const users = await conn.query(modeloUsuarios.queryGetUsers,(error)=>{throw new error})
        if(!users){
            res.status(404).json({msg:"No se encontraron registros"})
            return
        }
        res.json({users})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}
//Obtener datos de un usuario por el ID
const getUsersByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn;
    try{ 
        conn = await pool.getConnection()
        const [user] = await conn.query(modeloUsuarios.queryUserByID,[id],(error)=>{throw new error})
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
//Desactivar un Usuario por su ID
const deleteUsersbyID = async (req = request, res = response) =>{
    const {id} = req.query
    let conn;
    try{ 
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(modeloUsuarios.queryDeleteUserByID,[id],(error)=>{throw new error})
        
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
//Añadir un nuevo usuario
const addUsers = async (req = request, res = response) =>{
    const {
        Usuario,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contraseña,
        Fecha_Nacimiento = '2001-10-04',
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
        const [user]=await conn.query(modeloUsuarios.queryUserExists,[Usuario])
        if (user){
            res.status(403).json({msg:`El usuario ${Usuario} ya se encuentra registrado`})
            return
        }
        const salt = bcryptjs.genSaltSync()
        const ContraseñaCifrada = bcryptjs.hashSync(Contraseña,salt)

        const {affectedRows} = await conn.query(modeloUsuarios.queryAddUser,[
            Usuario,
            Nombre,
            Apellidos,
            Edad,
            Genero || '',
            ContraseñaCifrada,
            Fecha_Nacimiento,
            Activo
        ],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro del usuario ${Usuario}`})
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
//Actualizar información del Usuario
const updateUserByUsuario = async (req = request, res = response) =>{
    const {
        Usuario,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contraseña,
        Fecha_Nacimiento
    } = req.body

    if (
        !Nombre||
        !Apellidos||
        !Edad||
        !Contraseña       
    ){
        res.status(400).json({msg:"Falta informacion del usuario"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()
        const [user]=await conn.query(modeloUsuarios.queryGetUserInfo,[Usuario])
        if (!user){
            res.status(403).json({msg: `El usuario ${Usuario} no se encuentra registrado`})
        }
        const {affectedRows} = await conn.query(updateUsuario(
            Nombre,
            Apellidos,
            Edad,
            Genero,
            Fecha_Nacimiento,
            Usuario
        ),(error)=>{throw new error})
        if (affectedRows === 0) {
            res.status(404).json({msg:`No se pudo actualizar el registro del usuario ${Usuario}`})
            return
        }
        res.json({msg: `El usuario ${Usuario} se actualizo correctamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}
//Iniciar Sesión
const signIn = async (req=request,res=response)=>{
    const {
        Usuario,
        Contraseña
    }=req.body

    if(
        !Usuario||
        !Contraseña
    ){
        res.status(400).json({msg:"Falta información del usuario."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()
        const [user]=await conn.query(modeloUsuarios.querySignIn,[Usuario])

        if(!user || user.Activo == 'N'){
            let code = !user ? 1: 2;
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos`,errorCode:code})
            return
        }

        const accesoValido = bcryptjs.compareSync(Contraseña,user.Contraseña)

        if(!accesoValido){
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos`,errorCode:"3"})
            return
        }


        res.json({msg:`El usuario ${Usuario} ha iniciado seción satisfactoriamenente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}
//Cambiar Contraseña
const changePassword = async (req=request,res=response)=>{
    const {
        Usuario,
        AContraseña,
        NContraseña
    }=req.body

    if(
        !Usuario||
        !AContraseña||
        !NContraseña
    ){
        res.status(400).json({msg:"Faltan datos."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()
        const [user]=await conn.query(modeloUsuarios.querySignIn,[Usuario])

        if(!user || user.Activo == 'N'){
            let code = !user ? 1: 2;
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos`,errorCode:code})
            return
        }

        const datosValidos = bcryptjs.compareSync(AContraseña,user.Contraseña)

        if(!datosValidos){
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos`,errorCode:"3"})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contraseñaCifrada = bcryptjs.hashSync(NContraseña,salt) 

        const {affectedRows} = await conn.query(modeloUsuarios.queryUpdatePasword,[contraseñaCifrada,Usuario],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo actualizar la contraseña de ${Usuario}`})
            return
        }
        res.json({msg:`La contraseña de ${Usuario} se actualizo correctamente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {getUsers, getUsersByID, deleteUsersbyID, addUsers, updateUserByUsuario, signIn, changePassword}