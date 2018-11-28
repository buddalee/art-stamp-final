import Container = PIXI.Container;
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";
import { Loader } from "../core/Loader";

export class PaintingTitle extends Container {
  private paintingText: PIXI.Text;
  private paintingName: string;
  constructor() {
    super();
    this.interactive = true;
    this.visible = true;
    const painting = PIXI.Sprite.from(Loader.resources["painting_name"].texture);
    painting.x = 1094;
    painting.y = 23;
    this.addChild(painting);
    this.paintingName = '唐人明皇幸蜀圖　軸';
    this.paintingText = new PIXI.Text(this.paintingName, {
      fontSize: 24,
      fontFamily: 'PingFangTC',
      fill: '#4a4a4a',
      align: 'center'
    });
    this.paintingText.x = 1125;
    this.paintingText.y = 43;
    this.addChild(this.paintingText);
  }
  public trigger() {
    // eventEmitter.emit(GameFlowEvent.CreateNewGameRequest);
    // this.visible = false;
  }
}