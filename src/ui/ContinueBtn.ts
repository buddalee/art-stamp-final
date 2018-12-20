import { ButtonBase } from "./ButtonBase";
import { Loader } from "../core/Loader";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";

export class ContinueBtn extends ButtonBase {
  
  constructor() {
    super(
      'check_ans_btn',
      'check_ans_btn',
      1263, 866
    );
    // this.updateImage();
    const checkAnsText = new PIXI.Text("繼續挑戰", {
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
    eventEmitter.emit(GameFlowEvent.NextLevelRequest);
  }

}