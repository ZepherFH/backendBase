const modeloUsuarios = {
    queryGetUsers: "SELECT * FROM Usuarios",
    queryUserByID : `SELECT * FROM Usuarios WHERE ID=?`,
    queryDeleteUserByID : `UPDATE Usuarios SET Activo='N' WHERE ID=?`,
    queryUserExists : `SELECT Usuario FROM Usuarios WHERE Usuario = ?`,
    queryAddUser:`
    INSERT INTO Usuarios(
        Usuario,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contraseña,
        Fecha_Nacimiento,
        Activo
    )VALUES(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )`,
    queryGetUserInfo : `SELECT Usuario,Nombre,Apellidos,Edad,Genero,Fecha_Nacimiento FROM Usuarios WHERE Usuario = ?`,
    queryUpdateByUsuario : `
    UPDATE Usuarios SET
        Nombre=?,
        Apellidos= ?,
        Edad= ?,
        Genero= ?,
        Fecha_Nacimiento= ?
    WHERE Usuario= ?`,
    querySignIn : `SELECT Usuario, Contraseña, Activo FROM Usuarios WHERE Usuario = ?`,
    queryUpdatePasword : `UPDATE usuarios SET Contraseña=? WHERE Usuario= ?`
}

module.exports = modeloUsuarios