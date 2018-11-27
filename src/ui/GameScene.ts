import {Loader} from "../core/Loader";
import {application} from "../Main";
import {SoundBtn} from "./SoundBtn";
// import {GameBoard} from "./GameBoard";
import { LinkedLine } from "./LinkedLine";
import { RevertBtn } from "./RevertBtn";
import { TipBtn } from "./TipBtn";
import { ReloadBtn } from "./ReloadBtn";
import { FBBtn } from "./FBBtn";
import { Stars } from "./Stars";
import { Clock } from "./Clock";
import { GameRoundEnd } from "./GameRoundEnd";
import { Character } from "./Character";
// import { TimerMask } from './TimerMask';
import { StampGameBoard } from './StampGameBoard';
export class GameScene {
    
    public static draw(){
        //加入背景
        // application.stage.addChild(PIXI.Sprite.from(Loader.resources["level1"].texture));
        const handleBackground = PIXI.Sprite.from(Loader.resources["background"].texture);
        handleBackground.x = 1080;
        handleBackground.y = 0;
        application.stage.addChild(handleBackground);
        // application.stage.addChild(new TimerMask());

        // 加入印章牌面
        application.stage.addChild(new StampGameBoard());
        //加入連連看牌面
        // application.stage.addChild(new GameBoard());
        // application.stage.addChild(LinkedLine.instance);
        //加入按鈕
        // application.stage.addChild(new SoundBtn());
        // application.stage.addChild(new RevertBtn());
        // application.stage.addChild(new TipBtn());
        // application.stage.addChild(new ReloadBtn());
        // application.stage.addChild(new FBBtn());
        // application.stage.addChild(new Stars());
        // application.stage.addChild(new Clock());

        // application.stage.addChild(new Character());
        // application.stage.addChild(new GameRoundEnd());
    }
}