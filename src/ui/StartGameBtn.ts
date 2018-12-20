import {ButtonBase} from "./ButtonBase";
import {Loader} from "../core/Loader";
import { canvasWidth, canvasHeight, canvasScale } from '../Main';
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";

export class StartGameBtn extends ButtonBase {
    constructor() {
        super(
          'StartGame_Button',
          'start_game_btn',
          1260, 549 
        );
    }

    public trigger(){
      eventEmitter.emit(GameFlowEvent.RenderGameScene);
    }
}