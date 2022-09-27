const express = require('express') 
const messagesRouter = require('./routes/messages')

class Server{
    constructor(){
      this.app = express()
      this.paths = {
         messages:"/api/v1/messages"

        }
      this.routes()

    }

routes(){
    
  //this.app.get('/', (req, res) => {
    //res.send('Hello World')
    //  }
    this.app.use(this.paths.messages, messagesRouter)
}

listen(){
    this.app.listen(process.env.PORT,() => { //Poner un this aqui xd//
    console.log("Backend en ejecución en el puerto", process.env.PORT)
})
}
}

module.exports = Server