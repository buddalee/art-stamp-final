import Container = PIXI.Container;
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";
import { Loader } from "../core/Loader";

export class TimerMask extends Container {
    private text:PIXI.Text;
    // private remainTimes:number = 5;
    private remainTimes:number = 1;
    private remainText:PIXI.Text;
    private clockInterval:any;
    constructor() {
        super();
        this.interactive = true;
        this.visible = true;
        eventEmitter.on(GameFlowEvent.GameEndWithTimeout, ()=>{
            this.visible = false;
        });
        // eventEmitter.on(GameFlowEvent.GameEndWithNoPath, ()=>{
        //     this.text.text = "Game over";
        //     this.text.x = 260;
        //     this.text.y = 200;
        //     this.visible = true;
        // });
        // eventEmitter.on(GameFlowEvent.GamePass, ()=>{
        //     this.text.text = "Congratulations! \nYou passed!";
        //     this.text.x = 210;
        //     this.text.y = 200;
        //     this.visible = true;
        // });
        //黑底
        let gt = new PIXI.Graphics();
        gt.beginFill(0x333333, 0.2);
        gt.drawRect(0,0,1080,899);
        gt.endFill();
        this.addChild(gt);
        const timer = PIXI.Sprite.from(Loader.resources["timer_bg"].texture);
        timer.x = 483;
        timer.y = 349;
        this.addChild(timer);
        eventEmitter.on(GameFlowEvent.CreateNewGameRequest, ()=>{
          this.remainTimes = 5;
          this.remainText.text = "5";
        });
        this.remainText = new PIXI.Text("5", {
            fontWeight: 'bold',
            fontSize: 60,
            fontFamily: 'PingFangTC',
            fill: '#fff',
            align: 'center',
            stroke: '#fff',
            strokeThickness: 6
        });
        this.remainText.x = 521;
        this.remainText.y = 370;
        
        this.addChild(this.remainText);
        this.clockInterval = setInterval(this.updateTime.bind(this), 1000);

    }
    public updateTime(){
      this.remainTimes --;
      if(this.remainTimes == 0){
          clearInterval(this.clockInterval);
          eventEmitter.emit(GameFlowEvent.CreateNewGameRequest);
          eventEmitter.emit(GameFlowEvent.GameEndWithTimeout);
      }
      this.remainText.text = this.remainTimes.toString();
    }
    public trigger(){
        // eventEmitter.emit(GameFlowEvent.CreateNewGameRequest);
        // this.visible = false;
    }
}