import Container = PIXI.Container;
import { Loader } from "../core/Loader";
import { reloadTimes } from "./GameBoard";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";

export class Timer extends Container {
    private starList = [];
    private remainTimes:number = 480;
    private remainText:PIXI.Text;
    private clockInterval:any;
    constructor() {
        super();
        this.x = 483;
        this.y = 349;
        console.log('!!!!', PIXI.Sprite.from(Loader.resources['timer_bg'].textures));
        this.addChild(PIXI.Sprite.from(Loader.resources['timer_bg'].textures));
        
        eventEmitter.on(GameFlowEvent.CreateNewGameRequest, ()=>{
            this.remainTimes = 480;
            this.remainText.text = "8:00";
        });
        this.remainText = new PIXI.Text("8:00", {
            fontWeight: 'bold',
            fontSize: 20,
            fontFamily: 'Arial',
            fill: '#75C6ED',
            align: 'center',
            stroke: '#FFFFFF',
            strokeThickness: 6
        });
        this.remainText.x = 36;
        this.addChild(this.remainText);
        // this.clockInterval = setInterval(this.updateTime.bind(this), 1000);
    }

    public updateTime(){
        this.remainTimes --;
        if(this.remainTimes == 0){
            clearInterval(this.clockInterval);
            eventEmitter.emit(GameFlowEvent.GameEndWithTimeout);
        }
        this.remainText.text = Math.floor(this.remainTimes/60)+':'+((this.remainTimes%60 < 10) ? "0":"")+this.remainTimes%60;
    }
}