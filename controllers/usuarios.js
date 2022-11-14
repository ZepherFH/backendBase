const { request, response } = require("express");
const pool = require("../db/connection")
const bcryptjs= require("bcryptjs")
//Recibir datos de todos los usuarios
const getUsers = async (req = request, res = response) =>{
    let conn;
    try{
        conn = await pool.getConnection()
        const users = await conn.query("SELECT * FROM Usuarios", (error) =>{throw new Error(error)})
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
//Obtener datos de un usuario por el ID
const getUsersByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn;
    try{ 
        conn = await pool.getConnection()
        const [user] = await conn.query(`SELECT * FROM Usuarios WHERE ID = ${id}`, (error) =>{throw new Error(error)})
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
        const {affectedrows} = await conn.query(`UPDATE Usuarios SET Activo = 'N' WHERE ID = ${id}`, (error) =>{throw new Error(error)})
        
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
        const [user] = await conn.query(`SELECT Usuario FROM Usuarios WHERE Usuario = '${Usuario}'`)
        if (user){
            res.status(403).json({msg:`El usuario ${Usuario} ya se encuentra registrado`})
            return
        }
        const salt = bcryptjs.genSaltSync()
        const ContraseñaCifrada = bcryptjs.hashSync(Contraseña,salt)

        const {affectedRows} = await conn.query(`INSERT INTO Usuarios (
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
            '${Genero || ''}', 
            '${ContraseñaCifrada}',
            '${Fecha_Nacimiento}',
            '${Activo}'
        )`, (error) =>{throw new Error(error)})
        //Genero ? Genero : Null
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
        !Usuario||
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
        const [user] = await conn.query(`
            SELECT Usuario, Nombre, Apellidos, Edad, Genero, Fecha_Nacimiento
            FROM Usuarios 
            WHERE Usuario = '${Usuario}'`)
        if (!user){
            res.status(403).json({msg: `El usuario ${Usuario} no se encuentra registrado`})
        }
        const {affectedRows} = await conn.query(`
            UPDATE Usuarios SET 
            Nombre = '${Nombre || user.Nombre}',
            Apellidos ='${Apellidos || user.Apellidos}',
            Edad =  ${Edad || user.Edad},
            Genero = '${Genero || user.Genero}',
            Fecha_Nacimiento ='${Fecha_Nacimiento}'
            WHERE Usuario = '${Usuario}'
            `, (error) => {throw new Error(error) })
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo actualizar el registro del usuario ${Usuario}`})
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
const signIn = async (req = request, res = response) =>{
    const {
        Usuario,
        Contraseña
    } = req.body

    if (
        !Usuario||
        !Contraseña
    ){
        res.status(400).json({msg:"Falta informacion del usuario"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()
        const [user] = await conn.query(`SELECT Usuario, Contraseña, Activo FROM Usuarios WHERE Usuario = '${Usuario}'`)

        if (!user || user.Activo === 'N'){
            let code = !user  ? 1 : 2
            res.status(403).json({msg: `El usuario o la contraseña son incorrectos`})
        return
        }
        const accesoValido = bcryptjs.compareSync(Contraseña, user.Contraseña)
        if (!accesoValido){
            res.status(403).json({msg: `El usuario o la contraseña son incorrectos`, errorCode: "3"})
            return
        }
        res.json({msg: `El usuario ${Usuario} ha iniciado sesión`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}
//Cambiar Contraseña
const changePassword = async (req = request, res = response) => {
    const {
        Usuario, 
        Contraseña, 
        nuevaContraseña
    } = req.body

    if(
        !Contraseña || 
        !nuevaContraseña || 
        !Usuario){
        res.status(400).json({msg: "Faltan Datos."})
    }

    let conn;
    try {
        conn = await pool.getConnection()

        const [pass] = await conn.query(`SELECT Contraseña, Usuario FROM Usuarios WHERE Usuario = '${Usuario}'`, (error) => {if(error) throw error})
        if(!pass){
            res.status(403).json({msg:"Datos Invalidos"})
            return
        }
        const passValid = bcryptjs.compareSync(Contraseña, pass.Contraseña)
        const salt = bcryptjs.genSaltSync()
        const contraseñaCifrada = bcryptjs.hashSync(nuevaContraseña, salt)

        if(!passValid){
            res.status(403).json({msg:"La contraseña que se ingresó no son válidos."})
            return
        }

        const updpass = await conn.query(`UPDATE Usuarios SET Contraseña = '${contraseñaCifrada}' WHERE Usuario = '${Usuario}'`, (error) => {if(error) throw error})
        res.json({msg:`La contraseña se ha cambiado correctamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    } finally {
        if (conn) conn.end()//Termina la conexión 
    }
}

module.exports = {getUsers, getUsersByID, deleteUsersbyID, addUsers, updateUserByUsuario, signIn, changePassword}