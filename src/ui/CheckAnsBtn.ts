import { ButtonBase } from "./ButtonBase";
import { Loader } from "../core/Loader";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";
export class CheckAnsBtn extends ButtonBase {
  private isClicked: boolean = false;
  
  constructor() {
    super(
      'check_ans_btn',
      'check_ans_btn',
      1259, 841
    );
    const checkAnsText = new PIXI.Text("確定答案", {
      fontSize: 21,
      fontFamily: 'PingFangTC',
      fill: '#fff',
      align: 'center'
    });
    checkAnsText.x = -41;
    checkAnsText.y = -13;
    this.addChild(checkAnsText);
    this.interactive = false;

    eventEmitter.on(GameFlowEvent.GameEndWithTimeout, () => {
      this.interactive = true;
    });
    
  }
  public trigger() {
    eventEmitter.emit(GameFlowEvent.CheckAnsRequest);
  }
}