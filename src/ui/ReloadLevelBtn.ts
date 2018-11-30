import { ButtonBase } from "./ButtonBase";
import { Loader } from "../core/Loader";
import { SoundMgr } from "../core/SoundMgr";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";

export class ReloadLevelBtn extends ButtonBase {
  
  constructor() {
    super(
      'next_level_btn',
      'next_level_btn',
      1176, 765
    );
    const checkAnsText = new PIXI.Text("重新挑戰", {
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
    eventEmitter.emit(GameFlowEvent.ReloadGameRequest);
  }
}