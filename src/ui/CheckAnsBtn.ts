import { ButtonBase } from "./ButtonBase";
import { Loader } from "../core/Loader";
import { SoundMgr } from "../core/SoundMgr";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";

export class CheckAnsBtn extends ButtonBase {
  private isClicked: boolean = false;
  private isAnsCorrect: boolean = false;
  
  constructor() {
    super(
      'check_ans_btn',
      'check_ans_btn',
      1259, 841
    );
    // this.updateImage();
    const checkAnsText = new PIXI.Text("確定答案", {
      fontSize: 21,
      fontFamily: 'PingFangTC',
      fill: '#fff',
      align: 'center'
    });
    checkAnsText.x = -41;
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
  }
  // updateImage = () => {
  //   if (this.isClicked) {
  //     this.texture = PIXI.Sprite.fromImage("assets/btn-active-m.png").texture;
  //   } else {
  //     this.texture = PIXI.Sprite.fromImage("assets/btn-normal-m.png").texture;
  //   }
  // }

}