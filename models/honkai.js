const modelsHonkai = {
    queryGetValk: "SELECT * FROM Valkiryas",
    queryGetValkbyID: `SELECT * FROM Valkiryas WHERE ID = ?`,
    queryDeleteValkByID : `UPDATE Valkiryas SET Activo='N' WHERE ID=?`,
    queryValkExists : `SELECT Nombre FROM Valkiryas WHERE Nombre = ?`,
    queryAddValk:`INSERT INTO Valkiryas (
        Nombre,
        Actor_Voz,
        Rango,
        Genero,
        Arma,
        Cumpleaños,
        Altura,
        Peso,
        Activo
    ) VALUES (
        ?,
        ?,
        ?,
        ?, 
        ?,
        ?,
        ?,
        ?,
        ?
    )`,
    queryGetValkInfo: `
    SELECT Nombre, Actor_Voz, Rango, Genero, Arma, Cumpleaños, Altura, Peso
    FROM Valkiryas 
    WHERE Nombre = ?`,
    queryUpdateValkByNombre: `
    UPDATE Valkiryas SET 
    Nombre = ?,
    Actor_Voz = ?,
    Rango =  ?,
    Genero = ?,
    Arma = ?,
    Cumpleaños = ?,
    Altura = ?,
    Peso =  ?
    WHERE Nombre = ?`
}
module.exports = modelsHonkai