import Container = PIXI.Container;
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";
import { Loader } from "../core/Loader";
import { NextLevelBtn } from './NextLevelBtn'
import { SeePaintingBtn } from './SeePaintingBtn'

export class Dialog extends Container {
  private dialogText: PIXI.Text;
  private message: string;
  constructor() {
    super();
    this.interactive = false;
    this.visible = false;
    //黑底
    let gt = new PIXI.Graphics();
    gt.beginFill(0x333333, 0.3);
    gt.drawRect(0,0,1440,899);
    gt.endFill();
    this.addChild(gt);
    const dialog = PIXI.Sprite.from(Loader.resources["dialog"].texture);
    dialog.x = 394;
    dialog.y = 250;
    this.addChild(dialog);
    this.message = '  恭喜你 \n 挑戰成功';
    this.dialogText = new PIXI.Text(this.message, {
      fontSize: 32,
      fontFamily: 'PingFangTC',
      fill: '#d0021b',
      align: 'center'
    });
    this.dialogText.x = 585;
    this.dialogText.y = 298;

    this.addChild(this.dialogText);
    this.addChild(new NextLevelBtn());
    this.addChild(new SeePaintingBtn());

    eventEmitter.on(GameFlowEvent.ShowAnsCorrect, () => this.visible = true);
  }
  public trigger() {
    // eventEmitter.emit(GameFlowEvent.CreateNewGameRequest);
    // this.visible = false;
  }
}