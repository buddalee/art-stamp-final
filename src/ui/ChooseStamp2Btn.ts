import Container = PIXI.Container;
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";
import { Loader } from "../core/Loader";

export class ChooseStamp2Btn extends Container {
  private gt: PIXI.Graphics;
  private isClicked = false;
  constructor() {
    super();
    this.interactive = true;
    this.visible = true;
    this.buttonMode = true;
    this.gt = new PIXI.Graphics();
    this.gt.beginFill(0xf5a623, 0.3);
    this.gt.drawRect(1260,180,151,85);
    this.gt.endFill();
    this.addChild(this.gt);
    if (!this.isClicked) {
      this.gt.visible = false;
    } else {
      this.gt.visible = true;
    }
    const stamp1 = PIXI.Sprite.from(Loader.resources["stamp2_icon"].texture);
    stamp1.x = 1340;
    stamp1.y = 197;
    stamp1.width = 50;
    stamp1.height = 50;
    
    this.addChild(stamp1);
    const mouseStamp = PIXI.Sprite.from(Loader.resources["mouse_stamp"].texture);
    mouseStamp.x = 1278;
    mouseStamp.y = 197;
    mouseStamp.width = 50;
    mouseStamp.height = 50;
    this.addChild(mouseStamp);

    this.on("mouseup", this.trigger.bind(this));
    this.on("touchend", this.trigger.bind(this));
    eventEmitter.on(GameFlowEvent.chooseStamp2Request, () => {
      this.isClicked = true;
      this.gt.visible = true;
    });
    eventEmitter.on(GameFlowEvent.chooseStamp1Request, () => {
      this.isClicked = false;
      this.gt.visible = false;
    });
  }
  trigger() {
    eventEmitter.emit(GameFlowEvent.chooseStamp2Request);  
    this.gt.visible = true;
    // this.handleClick();
  }
  handleClick() {
    // this.isClicked = !this.isClicked;
    console.log('this.isClicked: ', this.isClicked);
    if (!this.isClicked) {
        this.gt.visible = false;
    } else {
        this.gt.visible = true;
    }
  }
}