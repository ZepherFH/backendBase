const {Router} = require("express")
const {getUsers, getUsersByID, deleteUsersbyID, addUsers, updateUserByUsuario, changePassword, signIn} = require("../controllers/usuarios")
const router = Router()

//http://localhost:4007/api/v1/usuarios
//Tipo Get
router.get("/", getUsers)
router.get("/id/:id", getUsersByID)
//Tipo Delete
router.delete("/", deleteUsersbyID)
//Tipo Post
router.post("/", addUsers)
router.post("/signIn", signIn)
//Tipo Put
router.put("/", updateUserByUsuario)
router.put("/change", changePassword)

module.exports = router