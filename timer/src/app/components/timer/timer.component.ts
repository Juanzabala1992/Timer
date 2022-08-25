import { Component, OnInit, NgZone } from '@angular/core';
import {timer} from 'rxjs';
import { SocketServiceService } from '../../services/socket-service.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  public hours:number=0;
  public minutes:number=0;
  public seconds:number=0;
  private timer: any;  
  private date = new Date();  

  constructor(    
   private socketServiceService:SocketServiceService,
   private _ngZone: NgZone
  ) { }

  ngOnInit(): void {
      this.start();

    
  }
  updateTimer(){
    let dates = new Date();    
    let lastDateHour = dates.getTime() - this.date.getTime();
    let hour = new Date(lastDateHour);
    //console.log("date-->",hour.getHours()-19,':', hour.getMinutes(),':', hour.getSeconds());
    this.hours = hour.getHours()-19;
    this.minutes = hour.getMinutes();
    this.seconds = hour.getSeconds();

    let timer =  {
      hour :this.hours, 
      minute: this.minutes,
      second: this.seconds
    }
    this.socketServiceService.sendTimer({
      timer
    });
    this.watch(timer);
  }
  start(){     
    this.timer = setInterval(()=>{
      this.updateTimer();
    },1000)
       
  }
  watch(timer:any){
    this.hours=timer.hour;
    this.minutes=timer.minute;
    this.seconds=timer.second;
  }
}
