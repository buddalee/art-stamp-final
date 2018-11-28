import Container = PIXI.Container;
import { Board } from "../core/Board";
import { Loader } from "../core/Loader";
import Point = PIXI.Point;
import { Path } from "../core/Path";
import { SoundMgr } from "../core/SoundMgr";
import { GameIcon } from "./GameIcon";
import { LinkedLine } from "./LinkedLine";
import { eventEmitter, stamps } from "../Main";
import { GameFlowEvent } from "../core/Event";
import { Stamps } from '../core/Stamps';
import {application} from "../Main";
import { TimerMask } from './TimerMask';

export let board: Board;
export let reloadTimes: number = 3;

export class StampGameBoard extends Container {

  private select1 = new Point(-1, -1);
  private select2 = new Point(-1, -1);
  private selected = false;
  private pathHistory = [];
  private valueHistory = [];
  private selectedBorder: PIXI.Graphics;
  private ansPoint1 = { x: 0, y: 0};
  private ansPoint2 = { x: 0, y: 0};  
  
  constructor() {
    super();
    // stamps = new Stamps();
    this.createNewGame();
    this.x = 0;
    this.y = 0;

    // eventEmitter.on(GameFlowEvent.ReloadBoardRequest, this.reloadBoard.bind(this));
    // eventEmitter.on(GameFlowEvent.TipsRequest, this.showTips.bind(this));
    // eventEmitter.on(GameFlowEvent.RevertBackRequest, this.revertBoard.bind(this));
    eventEmitter.on(GameFlowEvent.CreateNewGameRequest, this.createNewAnser.bind(this));
  }
  createNewGame = () => {
    this.addChild(PIXI.Sprite.from(Loader.resources[`level${stamps.LevelNum}`].texture));
    this.createNewAnser();
  }
  createNewAnser = () => {
    console.log('this: ', this);

    // this.select1 = new Point(-1, -1);
    // this.select2 = new Point(-1, -1);
    // this.selected = false;
    // this.pathHistory = [];
    // this.valueHistory = [];
    // reloadTimes = 3;
    // board = new Board();
    if (location.search === '?dev') {
      this.drawLine();
    }

    const { ansPoint1, ansPoint2 } = stamps.generateAnsPoint()
    this.ansPoint1 = ansPoint1;
    this.ansPoint2 = ansPoint2;
    this.drawStamp(this.ansPoint1, 1);
    this.drawStamp(this.ansPoint2, 2);
    // this.drawBoardIcon();
    this.addChild(new TimerMask());    

    eventEmitter.emit(GameFlowEvent.GameRoundStart);
    // this.tipsPath = board.getFirstExistPath();
  };
  drawStamp = (point, stampType) => {
    const xd = 1080 / 8;
    const yd = 899 / 8;

    let centerCircle = new PIXI.Graphics();
    if (location.search === '?dev') {
      centerCircle.beginFill(0x00FF00);      
    } else {
      centerCircle.beginFill(0x00FF00, 0);      
    }
    let stampIcon;
    if (stampType === 1) {
      stampIcon = PIXI.Sprite.from(Loader.resources["stamp1_icon"].texture);
    } else {
      stampIcon = PIXI.Sprite.from(Loader.resources["stamp2_icon"].texture);
    }
    const stampWidth = xd > yd ? yd : xd;
    stampIcon.pivot.x = stampIcon.width / 2;
    stampIcon.pivot.y = stampIcon.height / 2;
    stampIcon.width = stampWidth;
    stampIcon.height = stampWidth;
    stampIcon.x = point.x;
    stampIcon.y = point.y;
    centerCircle.drawCircle(point.x, point.y, 10);
    this.addChild(centerCircle);
    this.addChild(stampIcon);
    
  };
  drawLine = () => {
    const xd = 1080 / 8;
    const yd = 899 / 8;
    console.log('xd: ', xd);
    console.log('yd: ', yd);
    
    let lines1 = new PIXI.Graphics();
    lines1.lineStyle(4, 0x000000, 1);
    lines1.moveTo(0, 2 * yd);
    lines1.lineTo(1080, 2 * yd);

    let lines2 = new PIXI.Graphics();
    lines2.lineStyle(4, 0x000000, 1);
    lines2.moveTo(0, 4 * yd);
    lines2.lineTo(1080, 4* yd);

    let lines3 = new PIXI.Graphics();
    lines3.lineStyle(4, 0x000000, 1);
    lines3.moveTo(0, 6 * yd);
    lines3.lineTo(1080, 6 * yd);

    let lines4 = new PIXI.Graphics();
    lines4.lineStyle(4, 0x000000, 1);
    lines4.moveTo(2 * xd, 0);
    lines4.lineTo(2 * xd, 899);

    let lines5 = new PIXI.Graphics();
    lines5.lineStyle(4, 0x000000, 1);
    lines5.moveTo(4 * xd, 0);
    lines5.lineTo(4 * xd, 899);

    let lines6 = new PIXI.Graphics();
    lines6.lineStyle(4, 0x000000, 1);
    lines6.moveTo(6 * xd, 0);
    lines6.lineTo(6 * xd, 899);

    this.addChild(lines1);
    this.addChild(lines2);
    this.addChild(lines3);
    this.addChild(lines4);
    this.addChild(lines5);
    this.addChild(lines6);    
  };
  revertBoard = () => {
    console.log('我也進來了～');
    let value = this.valueHistory.pop();
    let path = this.pathHistory.pop();
    if (value != null && path != null) {
      board.board[path.point1.x][path.point1.y] = value;
      board.board[path.point2.x][path.point2.y] = value;

      this.drawBoardIcon();
      SoundMgr.play('Back');
    }
  }

  drawBoardIcon = () => {
    this.removeChildren();
    for (var i = 0; i < board.board.length; i++) {
      for (var j = 0; j < board.board[i].length; j++) {
        this.createIcon(board.board[i][j], i, j);
      }
    }
  };

  clearIcon = (point: Point) => {
    this.removeChild(this.getChildByName('icon_' + point.x + "_" + point.y));
    board.clearPoint(point);
  };

  iconSelected = (point: Point) => {
    let icon = this.getChildByName('icon_' + point.x + "_" + point.y) as GameIcon;
    icon.select();
  };

  iconUnSelected = (point: Point) => {
    let icon = this.getChildByName('icon_' + point.x + "_" + point.y) as GameIcon;
    icon.unSelect();
  };

  reloadBoard = () => {
    reloadTimes--;
    do {
      board.rearrangeBoard();
    } while (board.getFirstExistPath() == null)
    this.drawBoardIcon();
    SoundMgr.play('ReloadBoard');
  }
  private tipsPath: Path;
  showTips = () => {
    this.tipsPath = board.getFirstExistPath();
    let icon1 = this.getChildByName('icon_' + this.tipsPath.point1.x + "_" + this.tipsPath.point1.y) as GameIcon;
    icon1.select();

    let icon2 = this.getChildByName('icon_' + this.tipsPath.point2.x + "_" + this.tipsPath.point2.y) as GameIcon;
    icon2.select();
    SoundMgr.play('Tips');
  }
  cancelTips = () => {
    if (this.tipsPath == null) {
      return;
    }
    let icon1 = this.getChildByName('icon_' + this.tipsPath.point1.x + "_" + this.tipsPath.point1.y) as GameIcon;
    if (icon1) icon1.unSelect();

    let icon2 = this.getChildByName('icon_' + this.tipsPath.point2.x + "_" + this.tipsPath.point2.y) as GameIcon;
    if (icon2) icon2.unSelect();
  }

  createIcon = (id, x, y) => {
    let icon = new GameIcon(id, x, y);
    this.addChild(icon);
    let iconClickHandler = () => {
      this.cancelTips();
      if (this.selected) {
        let selectCorrect = false;
        this.select2 = new Point(x, y);
        this.iconSelected(this.select2);
        setTimeout(() => {
          if (board.hasSameValue(this.select1, this.select2)) {
            if (!(this.select1.x == x && this.select1.y == y)) {
              let path = new Path(this.select1, this.select2, board);
              if (path.canLinkInLine()) {
                this.pathHistory.push(path);
                this.valueHistory.push(board.getValue(this.select1));
                LinkedLine.instance.drawPath(path);
                this.clearIcon(this.select1);
                this.clearIcon(this.select2);
                eventEmitter.emit(GameFlowEvent.LinkedLineSuccess);
                selectCorrect = true;
                //判斷還有沒有路走
                if (board.gameRoundEnd()) {
                  eventEmitter.emit(GameFlowEvent.GamePass);
                } else if (board.getFirstExistPath() == null) {
                  if (reloadTimes > 0) {
                    this.reloadBoard();
                    eventEmitter.emit(GameFlowEvent.BoardNeedReload);
                  } else {
                    eventEmitter.emit(GameFlowEvent.GameEndWithNoPath);
                  }
                }
              }
            }
          }
          if (selectCorrect) {
            SoundMgr.play('Sound_select_crrect');
          } else {
            SoundMgr.play('Sound_select_error');
            this.iconUnSelected(this.select1);
            this.iconUnSelected(this.select2);
          }
          this.selected = false;
        }, 0);

      } else {
        this.select1 = new Point(x, y);
        this.iconSelected(this.select1);
        this.selected = true;
        SoundMgr.play('Sound_select_1');

      }
    };
    icon.on("click", iconClickHandler);
    icon.on("tap", iconClickHandler);
  }
}