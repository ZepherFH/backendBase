const {Router} = require("express")
const {getValkiryas, getValkiryasByID, addValks, deleteValksbyID, updateValkByNombre} = require("../controllers/honkai")
const router = Router()

//http://localhost:4007/api/v1/honkai
//Tipo Get
router.get("/valk", getValkiryas)
router.get("/id:id", getValkiryasByID)
//Tipo Delete
router.delete("/", deleteValksbyID)
//Tipo Post
router.post("/", addValks)
//Tipo Put
router.put("/", updateValkByNombre)

module.exports = router