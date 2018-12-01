import { ButtonBase } from "./ButtonBase";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";

export class GoHomeBtn extends ButtonBase {
    private _location: any;
    constructor() {
        super('go_home', 'go_home', 1400, 805);
        this._location = location;
    }
    public trigger() {
      eventEmitter.emit(GameFlowEvent.GotoHomeRequest);
    }
}