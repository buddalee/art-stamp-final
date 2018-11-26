import {ButtonBase} from "./ButtonBase";
import {Loader} from "../core/Loader";
import {SoundMgr} from "../core/SoundMgr";
import { canvasWidth, canvasHeight, canvasScale } from '../Main';

export class IntroduceBtn extends ButtonBase {
    // private isMute: boolean = false;
    constructor() {
      console.log('canvasWidth: ', canvasWidth);
      console.log('canvasHeight: ', canvasHeight);
      
        super(
          'Introduce_Button',
          'introduce_btn',
          (canvasWidth - ((50 + 260) / canvasScale)), (canvasHeight - ((50 + 300)) / canvasScale)
        );
        // this.updateImage();
        
    }

    public trigger(){
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