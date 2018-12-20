import Point = PIXI.Point;

export let paintingInfos = [];

export class Stamps {
  public board: Array<Array<number>>;
  private centerPTArr: Array<any>;
  private anserNum1: number;
  private anserNum2: number;
  public LevelNum: number;

  constructor() {
    this.getOpenData();
    this.LevelNum = 1;
    this.centerPTArr = [];
    let startx = 0,
      starty = 0,
      endx = 4,
      endy = 4;
    const xd = 1080 / 8;
    const yd = 899 / 8;
    for (; startx < endx; startx++) {
      for (starty = 0; starty < endy; starty++) {
        const x = xd + starty * 2 * xd;
        const y = yd + startx * 2 * yd;
        this.centerPTArr.push({ x, y });
      }
    }
  }
  private getRandomInt(min: number, max: number) {
    this.anserNum1 = Math.floor(Math.random() * (max - min + 1)) + min;
    this.anserNum2 = Math.floor(Math.random() * (max - min + 1)) + min;
    while (this.anserNum1 === this.anserNum2) {
      this.anserNum2 = Math.floor(Math.random() * (max - min + 1)) + min;
    }

  }
  public getOpenData() {
    const serials = ['04000975', '04001001'];
    const queue = [];
    const firstSettings = {
      "async": false,
      "crossDomain": true,
      "url": `https://cors-anywhere.herokuapp.com/openapi.npm.gov.tw/v1/rest/collection/search/04000974`,
      "method": "GET",
      "headers": {
        "apiKey": "64991b29-619f-43f9-a86d-1441c3c5f8a3"
      }
    }
    $.ajax(firstSettings).done(function (response) {
      paintingInfos.push(response.result[0]);
      window.history.pushState('', '', '?level=1');
      serials.map(serial_no => {
        const settings = {
          "async": true,
          "crossDomain": true,
          "url": `https://cors-anywhere.herokuapp.com/openapi.npm.gov.tw/v1/rest/collection/search/${serial_no}`,
          "method": "GET",
          "headers": {
            "apiKey": "64991b29-619f-43f9-a86d-1441c3c5f8a3"
          }
        }
        queue.push($.ajax(settings));
      });
    });
    $.when(queue[0], queue[1]).done(function (r1, r2, r3) {
      paintingInfos.push(r1[0].result[0]);
      paintingInfos.push(r2[0].result[0]);
      paintingInfos = paintingInfos.sort((pre, next) => +pre.Serial_No - +next.Serial_No);
    });
  }

  public isTouchSupported() {
    if (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0)) {
      return true;
    }
    return false;
  }
  public generateAnsPoint() {
    this.getRandomInt(1, 16);
    return {
      ansPoint1: this.centerPTArr[this.anserNum1 - 1],
      ansPoint2: this.centerPTArr[this.anserNum2 - 1]
    }
  }

}