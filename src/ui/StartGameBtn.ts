import {ButtonBase} from "./ButtonBase";
import {Loader} from "../core/Loader";
import {SoundMgr} from "../core/SoundMgr";
import { canvasWidth, canvasHeight, canvasScale } from '../Main';
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";

export class StartGameBtn extends ButtonBase {
    // private isMute: boolean = false;
    constructor() {
        super(
          'StartGame_Button',
          'start_game_btn',
          (canvasWidth - ((50 + 130) / canvasScale)), (canvasHeight - ((50 + 300) / canvasScale) )
        );
        // this.updateImage();
    }

    public trigger(){
      eventEmitter.emit(GameFlowEvent.RenderGameScene);
        // this.isMute = !this.isMute;
        // SoundMgr.mute(this.isMute);
        // this.updateImage();
    }
    
    // updateImage = ()=>{
    //     if (this.isMute){
    //         this.texture = this.texture = Loader.resources['Button'].textures['Sound_Off'];
    //     } else{
    //         this.texture = this.texture = Loader.resources['Button'].textures['Sound_On'];
    //     }
    // }
    
}