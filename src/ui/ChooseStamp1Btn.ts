import Container = PIXI.Container;
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";
import { Loader } from "../core/Loader";

export class ChooseStamp1Btn extends Container {
  private gt: PIXI.Graphics;
  private isClicked = true;
  constructor() {
    super();
    this.interactive = true;
    this.visible = true;
    this.buttonMode = true;
    this.gt = new PIXI.Graphics();
    this.gt.beginFill(0xf5a623, 0.3);
    this.gt.drawRect(1094,175,151,85);
    this.gt.endFill();
    this.addChild(this.gt);
    const stamp1 = PIXI.Sprite.from(Loader.resources["stamp1_icon"].texture);
    stamp1.x = 1174;
    stamp1.y = 192;
    stamp1.width = 50;
    stamp1.height = 50;
    
    this.addChild(stamp1);
    const mouseStamp = PIXI.Sprite.from(Loader.resources["mouse_stamp"].texture);
    mouseStamp.x = 1112;
    mouseStamp.y = 192;
    mouseStamp.width = 50;
    mouseStamp.height = 50;
    this.addChild(mouseStamp);

    this.on("mouseup", this.trigger.bind(this));
    this.on("touchend", this.trigger.bind(this));
    eventEmitter.on(GameFlowEvent.chooseStamp2Request, () => {
      this.isClicked = false;
      this.gt.visible = false;
    });
  }
  trigger() {
    eventEmitter.emit(GameFlowEvent.chooseStamp1Request);   
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