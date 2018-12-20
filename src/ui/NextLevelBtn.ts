import { ButtonBase } from "./ButtonBase";
import { Loader } from "../core/Loader";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";

export class NextLevelBtn extends ButtonBase {
  
  constructor() {
    super(
      'next_level_btn',
      'next_level_btn',
      585, 435
    );
    // this.updateImage();
    const checkAnsText = new PIXI.Text("下一關", {
      fontSize: 21,
      fontFamily: 'PingFangTC',
      fill: '#fff',
      align: 'center'
    });
    checkAnsText.x = -32;
    checkAnsText.y = -13;
    this.addChild(checkAnsText);
  }
  public trigger() {
    eventEmitter.emit(GameFlowEvent.NextLevelRequest);
  }

}