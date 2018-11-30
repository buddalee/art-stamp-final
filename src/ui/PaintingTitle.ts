import Container = PIXI.Container;
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";
import { Loader } from "../core/Loader";
import { paintingInfos } from '../core/Stamps';

export class PaintingTitle extends Container {
  private paintingText: PIXI.Text;
  constructor() {
    super();
    this.interactive = true;
    this.visible = true;
    const painting = PIXI.Sprite.from(Loader.resources["painting_name"].texture);
    painting.x = 1094;
    painting.y = 23;
    this.addChild(painting);
    console.log('paintingInfos ', paintingInfos);
    const param = location.search;
    let levelNumber = 1;
    if (param.indexOf('level=2') > -1) {
      levelNumber = 2;
    }
    if (param.indexOf('level=3') > -1) {
      levelNumber = 3;
    }
    if (param.indexOf('level=1') > -1) {
      levelNumber = 1;
    }
    const info = paintingInfos[levelNumber - 1];
    const paintingName = info.ArticleSubject;
    this.paintingText = new PIXI.Text(paintingName, {
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