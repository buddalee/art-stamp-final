import Sprite = PIXI.Sprite;
import { Loader } from "../core/Loader";
//add gasp
declare const TweenLite;
declare const TimelineMax;

export class ButtonBase extends Sprite {

    constructor(_id: string, textureID: string, _x: number, _y: number) {
        super();
        if (textureID === 'introduce_btn') {
          this.texture = PIXI.Sprite.fromImage("assets/introduce_btn.png").texture;
        } else if (textureID === 'start_game_btn') {
          this.texture = PIXI.Sprite.fromImage("assets/start_game_btn.png").texture;
        } else if (textureID === 'check_ans_btn') {
          this.texture = PIXI.Sprite.fromImage("assets/btn-normal-m.png").texture;
        } else if (textureID === 'next_level_btn') {
          this.texture = PIXI.Sprite.fromImage("assets/btn-normal-s.png").texture;
        } else if (textureID === 'FB_share') {
          this.texture = PIXI.Sprite.fromImage("assets/fb.png").texture;
        } else if (textureID === 'go_home') {
            this.texture = PIXI.Sprite.fromImage("assets/icon-home-copy.png").texture;
        } else {
          console.log('Loader.resources[_id]: ', Loader.resources);
          this.texture = Loader.resources[_id].textures[textureID];
        }
        this.interactive = true;
        this.buttonMode = true;
        this.x = _x;
        this.y = _y;
        this.anchor.set(0.5);

        //按下效果
        this.on("mousedown", this.mouseDownEffect.bind(this));
        this.on("mouseup", this.mouseUpEffect.bind(this));
        this.on("mouseout", this.mouseOutEffect.bind(this));
        this.on("touchstart", this.mouseDownEffect.bind(this));
        this.on("touchend", this.mouseUpEffect.bind(this));

        this.on("mouseup", this.trigger.bind(this));
        this.on("touchend", this.trigger.bind(this));
    }
    public trigger() {
    }
    private _enable: boolean = true;
    public set enable(v: boolean) {
        this.interactive = v;
        this.buttonMode = v;
        this.alpha = v ? 1 : 0.5;
    }
    public mouseDownEffect(): void {
        let animTweenTimeline = new TimelineMax();
        animTweenTimeline.add(new TweenLite(this, 0.2,
            {
                "scaleX": 0.9,
                "scaleY": 0.9
            }));
        animTweenTimeline.play();
    }
    public mouseUpEffect(): void {
        let animTweenTimeline = new TimelineMax();
        animTweenTimeline.add(new TweenLite(this, 0.1,
            {
                "scaleX": 1.1,
                "scaleY": 1.1
            }));
        animTweenTimeline.add(new TweenLite(this, 0.1,
            {
                "scaleX": 1,
                "scaleY": 1
            }));
        animTweenTimeline.play();
    }
    set scaleX(v: number) {
        this.scale.x = v;
    }
    set scaleY(v: number) {
        this.scale.y = v;
    }
    public mouseOutEffect(): void {
        this.scale.set(1, 1);
    }
}