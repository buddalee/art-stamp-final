import EventEmitter = PIXI.utils.EventEmitter;
import {CoreEvent} from "./core/Event";
import Application = PIXI.Application;
import {Loader} from "./core/Loader";
import Resource = PIXI.loaders.Resource;
import { SoundMgr } from "./core/SoundMgr";
import { GameScene } from "./ui/GameScene";
import { MainMenuScene } from "./ui/MainMenuScene";
import { GameFlowEvent } from "./core/Event";

export let eventEmitter:EventEmitter;
export let application:Application;
export let canvasWidth: number;
export let canvasHeight: number;
export let canvasScale: number;

/**
 * 主要的 client application.
 *
 */
export class Main {
    public initGame() {
        //設定場景
        let gameCanvasContext = (< HTMLCanvasElement >jQuery("#gameCanvas")[0]);
        application = new PIXI.Application(1440, 899, {backgroundColor : 0xF6D0A3, view: gameCanvasContext});
        //設定共用的事件傳遞元件
        eventEmitter = new EventEmitter();
        SoundMgr.load();
        eventEmitter.on(CoreEvent.AssetsLoadComplete,()=>{
            console.log('!!!!!');
            //隱藏loading page
            jQuery("#loadingPage").hide();
            //播放背景音樂
            // SoundMgr.play('Sound_bg',true);
            //繪製主選單場景
            MainMenuScene.draw();
            eventEmitter.on(GameFlowEvent.RenderGameScene, ()=>{
                console.log('我有按了喔！！！');
                application.stage.removeChildren();
                //繪製場景
                GameScene.draw();
            });

        });
        //載入素材
        Loader.load();

        //設定遊戲大小隨視窗大小改變
        this.onResize();
        window.onresize = this.onResize; 
    }

    public onResize() { 
        var w = window.innerWidth; 
        var h = window.innerHeight; 
        var scale = Math.min(w/1440,h/899);
        canvasScale = scale; 
        console.log('canvasScale: ', canvasScale);
        application.view.style.left = (w-scale*1440)/2 + "px"; 
        application.view.style.top = (h-scale*899)/2 + "px"; 
        canvasWidth =1440 ;     
        canvasHeight = 899  ;   
        application.view.style.width = scale*1440 + "px";
        application.view.style.height = scale*899 + "px"; 
    } 
}