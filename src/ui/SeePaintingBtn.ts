import { ButtonBase } from "./ButtonBase";
import { Loader } from "../core/Loader";
import { SoundMgr } from "../core/SoundMgr";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";

export class SeePaintingBtn extends ButtonBase {
  private isClicked: boolean = false;
  private isAnsCorrect: boolean = false;
  
  constructor() {
    super(
      'next_level_btn',
      'next_level_btn',
      750, 435
    );
    // this.updateImage();
    const checkAnsText = new PIXI.Text("賞畫去", {
      fontSize: 21,
      fontFamily: 'PingFangTC',
      fill: '#fff',
      align: 'center'
    });
    checkAnsText.x = -34;
    checkAnsText.y = -13;
    this.addChild(checkAnsText);
  }
  public trigger() {
    this.handleAnsCorrect();
    // this.isClicked = !this.isClicked;
    // this.updateImage();
  }
  handleAnsCorrect() {
    this.isAnsCorrect = true;
    eventEmitter.emit(GameFlowEvent.ShowAnsCorrect);
    eventEmitter.emit(GameFlowEvent.RenderPaintingInfoScene);
    
  }
  // updateImage = () => {
  //   if (this.isClicked) {
  //     this.texture = PIXI.Sprite.fromImage("assets/btn-active-m.png").texture;
  //   } else {
  //     this.texture = PIXI.Sprite.fromImage("assets/btn-normal-m.png").texture;
  //   }
  // }

}