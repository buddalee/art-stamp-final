import { ButtonBase } from "./ButtonBase";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";

export class IntroduceBtn extends ButtonBase {
    constructor() {
        super(
            'Introduce_Button',
            'introduce_btn',
            1130, 549
        );
    }
    public trigger() {
        eventEmitter.emit(GameFlowEvent.RenderIntroductionSceneRequest);
    }
}