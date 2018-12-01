import { ButtonBase } from "./ButtonBase";

export class FBBtn extends ButtonBase {
    private _location: any;
    constructor() {
        super('FB_share', 'FB_share', 1347, 805);
        this._location = location;
    }
    public trigger() {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=https://buddalee.github.io/test-pixijs`, 'Budda Lee');
        // window.open(`https://www.facebook.com/sharer/sharer.php?u=${this._location.href}`, 'Budda Lee');
    }
}