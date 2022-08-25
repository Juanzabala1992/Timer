import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {io} from  'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketServiceService  {
  io = io('http://localhost:3000/',{
    withCredentials:true,
    autoConnect:true,
    transports : ['websocket'] 
  });
  
  constructor() { 
    this.io.on('connect', ()=>{
      console.log('conectado');
    });

    this.io.on('disconnect', ()=>{
      console.log('Desconectado');
    });
    //this.sendTimer({});
  }  
  sendTimer(data:any){
    const mensaje = data;    
    this.io.emit('enviar-timer', mensaje);
  }
}

