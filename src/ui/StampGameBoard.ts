import Container = PIXI.Container;
import { Loader } from "../core/Loader";
import Point = PIXI.Point;
import { eventEmitter, stamps } from "../Main";
import { GameFlowEvent } from "../core/Event";
import { TimerMask } from './TimerMask';

export let reloadTimes: number = 3;

export class StampGameBoard extends Container {

  private select1 = new Point(-1, -1);
  private select2 = new Point(-1, -1);
  private selected = false;
  private pathHistory = [];
  private valueHistory = [];
  private selectedBorder: PIXI.Graphics;
  private ansPoint1 = { x: 0, y: 0 };
  private ansPoint2 = { x: 0, y: 0 };
  private touchData: any;
  public chooseStampType: number = 1;
  private isPCMode: boolean;
  private touches: any = [];
  private isDevMode: boolean;
  private centerPointArr = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
  private centerCircle: any;
  private angle = 0;
  private stampIcon1: PIXI.Sprite;
  private stampIcon2: PIXI.Sprite;
  private testCircle1: PIXI.Graphics;
  private testCircle2: PIXI.Graphics;
  private testCircle3: PIXI.Graphics;
  private userAnsArr = [];
  private tempDatas = [];

  constructor() {
    super();
    if (location.search.indexOf('dev') > -1) {
      this.isDevMode = true;
    }
    if (stamps.isTouchSupported()) {
      this.isPCMode = false;
      document.addEventListener("contextmenu", (e) => e.preventDefault());

      // alert('支援多點觸控');
    } else {
      this.isPCMode = true;
      // alert('不支援多點觸控');
    }

    this.createNewGame();
    this.x = 0;
    this.y = 0;
    this.interactive = false;
    this
      .on('pointerdown', this.onDragStart)
      .on('pointerup', this.onDragEnd)
      .on('pointerupoutside', this.onDragEnd);

    eventEmitter.on(GameFlowEvent.CreateNewGameRequest, this.createNewAnser.bind(this));
    eventEmitter.on(GameFlowEvent.GameEndWithTimeout, () => {
      this.interactive = true;
      this.removeChild(this.stampIcon1);
      this.removeChild(this.stampIcon2);

    });
    eventEmitter.on(GameFlowEvent.chooseStamp1Request, () => {
      this.chooseStampType = 1;
    });
    eventEmitter.on(GameFlowEvent.chooseStamp2Request, () => {
      this.chooseStampType = 2;
    });
    eventEmitter.on(GameFlowEvent.CheckAnsRequest, this.checkAns.bind(this));
    eventEmitter.on(GameFlowEvent.SeeAnsRequest, () => {
      this.removeChild(this.stampIcon1);
      this.removeChild(this.stampIcon2);
      this.drawStamp(this.ansPoint1, false, 1);
      this.drawStamp(this.ansPoint2, false, 2);
    });
    eventEmitter.on(GameFlowEvent.ReloadGameRequest, this.createNewAnser.bind(this));
  }
  onDragStart = (e) => {
    const eventData = e.data;
    this.touchData = {
      x: Math.floor(eventData.global.x),
      y: Math.floor(eventData.global.y)
    };
    if (!this.isPCMode) {
      const touch = {
        // 主要依據 id 來判斷當下有幾隻手指在手機上
        id: eventData.identifier,
        pos: this.touchData
      };
      this.touches.push(touch);
      this.tempDatas.push(touch);
      if (this.touches.length === 1) {
        this.testCircle1 = new PIXI.Graphics();
        if (this.isDevMode) {
          this.testCircle1.beginFill(0x99ffff);
        } else {
          this.testCircle1.beginFill(0x99ffff, 0);
        }
        this.testCircle1.drawCircle(touch.pos.x, touch.pos.y, 10);
        this.testCircle1.endFill();
        this.addChild(this.testCircle1);
      }
      if (this.touches.length === 2) {
        this.testCircle2 = new PIXI.Graphics();
        if (this.isDevMode) {
          this.testCircle2.beginFill(0x99ffff);
        } else {
          this.testCircle2.beginFill(0x99ffff, 0);
        }
        this.testCircle2.drawCircle(touch.pos.x, touch.pos.y, 10);
        this.testCircle2.endFill();
        this.addChild(this.testCircle2);
      }
      if (this.touches.length === 3) {
        this.testCircle3 = new PIXI.Graphics();
        if (this.isDevMode) {
          this.testCircle3.beginFill(0x99ffff);
        } else {
          this.testCircle3.beginFill(0x99ffff, 0);
        }
        this.testCircle3.drawCircle(touch.pos.x, touch.pos.y, 10);
        this.testCircle3.endFill();
        this.addChild(this.testCircle3);
      }
      this.touchHandler();
    }
  }
  onDragEnd = (e) => {
    console.log('目前有幾隻手指按在螢幕上: ', this.touches.length);
    let checksum = 0;
    if (checksum === 0 && this.touches.length > 5) {
      checksum = this.touches.length - 5
    }

    if ((this.touches.length - checksum) === 1) {
      if (this.tempDatas.length <= 3) {
        this.chooseStampType = 1;
        eventEmitter.emit(GameFlowEvent.chooseStamp1Request);
        this.calcDistance(1);
      } else {
        this.chooseStampType = 2;
        eventEmitter.emit(GameFlowEvent.chooseStamp2Request);
        this.calcDistance(2);
      }

    }
    const eventData = e.data;
    if (!this.isPCMode) {
      for (var i = 0; i < this.touches.length; i++) {
        // 當離開的手指存在在 touches 陣列裡時，移除該筆資料
        if (this.touches[i].id === eventData.identifier) {
          this.touches.splice(i, 1);
        }
      };
    } else {
      this.drawStamp(this.touchData, true, this.chooseStampType);
    }
  }
  touchHandler() {
    // 印出目前有幾隻手指按在螢幕上
    this.removeChild(this.centerCircle); // 把中心點去除    

    this.removeChild(this.testCircle1);
    this.removeChild(this.testCircle2);
    this.removeChild(this.testCircle3);
  }
  calcDistance = (type) => {
    const dis: any = this.tempDatas.map((_touch, idx) => {
      let anotherIdx;
      if (idx === this.tempDatas.length - 1) {
        anotherIdx = 0;
      } else {
        anotherIdx = idx + 1;
      }
      const { x, y } = this.tempDatas[idx].pos;
      const _x = this.tempDatas[anotherIdx].pos.x;
      const _y = this.tempDatas[anotherIdx].pos.y;
      const distance = Math.sqrt(Math.pow(x - _x, 2) + Math.pow(y - _y, 2));
      return distance;
    });
    const maxDistance = Math.max(...dis);
    const maxIdx = dis.findIndex(_dis => _dis === maxDistance);
    this.calcPhotoCenter(maxIdx);
    this.calcPhotoAngle(maxIdx);
    if (type === 1) {
      this.drawStamp(this.centerPointArr[0], true, this.chooseStampType);
    } else {
      this.drawStamp(this.centerPointArr[1], true, this.chooseStampType);
    }
    this.touches = [];
    this.tempDatas = [];
  }
  public checkAns() {
    let isAnsCorrect;
    if (!this.isPCMode) {
      isAnsCorrect = this.validateAns(this.centerPointArr);
    } else {
      isAnsCorrect = this.validateAns(this.userAnsArr);
    }
    if (isAnsCorrect) {
      return eventEmitter.emit(GameFlowEvent.CheckAnsIsRightResponse);
    } return eventEmitter.emit(GameFlowEvent.CheckAnsIsWrongResponse);
  }
  validateAns(posArr) {
    var startIdx1 = 0,
      startIdx2 = 0;
    var count = 0;
    const xd = 1080 / 8;
    const yd = 899 / 8;
    const toloranceD = xd > yd ? yd : xd;
    const ansPointArray = [];
    ansPointArray.push(this.ansPoint1);
    ansPointArray.push(this.ansPoint2);
    for (; startIdx1 < 2; startIdx1++) {
      for (startIdx2 = 0; startIdx2 < 2; startIdx2++) {
        if (!posArr[startIdx1]) {
          return false;
        }
        const distance = Math.sqrt(Math.pow(posArr[startIdx1].x - ansPointArray[startIdx2].x, 2) + Math.pow(posArr[startIdx1].y - ansPointArray[startIdx2].y, 2));
        if (toloranceD >= distance) {
          count++;
        }
      }
    }
    if (count >= 2) {
      return true;
    } else {
      return false;
    }
  }
  calcPhotoCenter = (maxIdx) => {
    var anotherIdx;
    if (maxIdx === this.tempDatas.length - 1) {
      anotherIdx = 0;
    } else {
      anotherIdx = maxIdx + 1;
    }
    const { x, y } = this.tempDatas[maxIdx].pos;
    const _x = this.tempDatas[anotherIdx].pos.x;
    const _y = this.tempDatas[anotherIdx].pos.y;
    this.removeChild(this.centerCircle); // 把中心點去除
    this.centerCircle = new PIXI.Graphics();
    if (this.isDevMode) {
      this.centerCircle.beginFill(0x00FF00);
    } else {
      this.centerCircle.beginFill(0x00FF00, 0);

    }
    if (this.chooseStampType === 1) {
      this.centerPointArr[0].x = (x + _x) / 2;
      this.centerPointArr[0].y = (y + _y) / 2;
      this.centerCircle.drawCircle(this.centerPointArr[0].x, this.centerPointArr[0].y, 10);


    } else {
      this.centerPointArr[1].x = (x + _x) / 2;
      this.centerPointArr[1].y = (y + _y) / 2;
      this.centerCircle.drawCircle(this.centerPointArr[1].x, this.centerPointArr[1].y, 10);

    }
    this.centerCircle.endFill();
    this.addChild(this.centerCircle);
  }
  calcPhotoAngle = (maxIdx) => {
    let anotherIdx;
    if (maxIdx === 0) {
      anotherIdx = this.tempDatas.length - 1;
    } else {
      anotherIdx = maxIdx - 1;
    }
    const { x, y } = this.tempDatas[anotherIdx].pos;
    const _x = this.tempDatas[maxIdx].pos.x;
    const _y = this.tempDatas[maxIdx].pos.y;
    var cX = _x - x;
    var cY = _y - y;
    var xrad = Math.atan2(cY, cX);
    this.angle = xrad / Math.PI * 180;
    this.angle = this.angle;
  }
  createNewGame = () => {
    const param = location.search;
    let levelNumber = 1;
    if (param.indexOf('level=2') > -1) {
      levelNumber = 2;
    } else if (param.indexOf('level=3') > -1) {
      levelNumber = 3;
    } else if (param.indexOf('level=1') > -1) {
      levelNumber = 1;
    } else {
      levelNumber = 1;
      window.history.pushState('', '', '?level=1');
    }
    this.addChild(PIXI.Sprite.from(Loader.resources[`level${levelNumber}`].texture));
    this.createNewAnser();
  }
  createNewAnser = () => {
    if (this.isDevMode) {
      this.drawLine();
    }
    this.removeChild(this.stampIcon1);
    this.removeChild(this.stampIcon2);

    const { ansPoint1, ansPoint2 } = stamps.generateAnsPoint()
    this.ansPoint1 = ansPoint1;
    this.ansPoint2 = ansPoint2;
    this.drawStamp(this.ansPoint1, false, 1);
    this.drawStamp(this.ansPoint2, false, 2);
    this.addChild(new TimerMask());

    eventEmitter.emit(GameFlowEvent.GameRoundStart);
  };
  drawStamp = (point, isUserDraw, stampType) => {

    const xd = 1080 / 8;
    const yd = 899 / 8;
    const stampWidth = xd > yd ? yd : xd;

    let centerCircle = new PIXI.Graphics();
    if (this.isDevMode) {
      centerCircle.beginFill(0x00FF00);
    } else {
      centerCircle.beginFill(0x00FF00, 0);
    }
    let texture;
    if (isUserDraw) {
      if (stampType === 1) {
        this.removeChild(this.stampIcon1);
      } else {
        this.removeChild(this.stampIcon2);
      }
    }
    if (stampType === 1) {
      this.stampIcon1 = PIXI.Sprite.from(Loader.resources["stamp1_icon"].texture);
      this.stampIcon1.pivot.x = this.stampIcon1.width / 2;
      this.stampIcon1.pivot.y = this.stampIcon1.height / 2;
      this.stampIcon1.width = stampWidth;
      this.stampIcon1.height = stampWidth;
      this.stampIcon1.rotation = this.angle * (Math.PI / 180);
      this.stampIcon1.x = point.x;
      this.stampIcon1.y = point.y;
      this.addChild(this.stampIcon1);
    } else {
      this.stampIcon2 = PIXI.Sprite.from(Loader.resources["stamp2_icon"].texture);
      this.stampIcon2.pivot.x = this.stampIcon2.width / 2;
      this.stampIcon2.pivot.y = this.stampIcon2.height / 2;
      this.stampIcon2.width = stampWidth;
      this.stampIcon2.height = stampWidth;
      this.stampIcon2.rotation = this.angle * (Math.PI / 180);
      this.stampIcon2.x = point.x;
      this.stampIcon2.y = point.y;
      this.addChild(this.stampIcon2);
    }
    if (isUserDraw) {
      if (stampType === 1) {
        this.userAnsArr[0] = point;
      } else {
        this.userAnsArr[1] = point;
      }
    }

    centerCircle.drawCircle(point.x, point.y, 10);
    this.addChild(centerCircle);

  };
  drawLine = () => {
    const xd = 1080 / 8;
    const yd = 899 / 8;

    let lines1 = new PIXI.Graphics();
    lines1.lineStyle(4, 0x000000, 1);
    lines1.moveTo(0, 2 * yd);
    lines1.lineTo(1080, 2 * yd);

    let lines2 = new PIXI.Graphics();
    lines2.lineStyle(4, 0x000000, 1);
    lines2.moveTo(0, 4 * yd);
    lines2.lineTo(1080, 4 * yd);

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
}