import { ButtonBase } from "./ButtonBase";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";

export class IntroduceBtn1 extends ButtonBase {
    constructor() {
        super(
            'StartGame_Button',
            'start_game_btn',
            760, 794
        );
    }
    public trigger() {
        eventEmitter.emit(GameFlowEvent.RenderGameScene);
    }
}