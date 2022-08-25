const express = require ('express');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();
        this.middlewares();  
        this.server = require('http').createServer(this.app); 
        this.io = require('socket.io')(this.server);
        this.socket();
    }
    middlewares(){
    this.app.use( cors({
        origin:'http://localhost:4300/'
    }) );
    this.app.use(express.static('public')) 
    }
    socket(){
        this.io.on('connection', socket=>{
            console.log("cliente conectado");
            socket.on('enviar-timer', (payload)=>{
                console.log('mensaje enviado desde el cliente', 
                payload.timer.hour,':',payload.timer.minute, ':', payload.timer.second)
            });   
            
            socket.on('disconnect', ()=>{
                console.log('cliente desconectado')
            });
        })
    }
    listen(){
        this.server.listen(3000, ()=>{
            console.log('Servidor corriendo en pto 3000')
        })
    }
}
module.exports=Server