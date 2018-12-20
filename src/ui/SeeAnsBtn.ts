import { ButtonBase } from "./ButtonBase";
import { Loader } from "../core/Loader";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";

export class SeeAnsBtn extends ButtonBase {
  private isClicked: boolean = false;
  private isAnsCorrect: boolean = false;
  
  constructor() {
    super(
      'next_level_btn',
      'next_level_btn',
      1340, 765
    );
    const checkAnsText = new PIXI.Text("看答案", {
      fontSize: 21,
      fontFamily: 'PingFangTC',
      fill: '#fff',
      align: 'center'
    });
    checkAnsText.x = -35;
    checkAnsText.y = -13;
    this.addChild(checkAnsText);
    this.interactive = false;
    eventEmitter.on(GameFlowEvent.GameEndWithTimeout, () => {
      this.interactive = true;
    });
  }
  public trigger() {
    eventEmitter.emit(GameFlowEvent.SeeAnsRequest);
  }
}