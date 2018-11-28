import {Loader} from "../core/Loader";
import {application, stamps} from "../Main";
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
import { CheckAnsBtn } from "./CheckAnsBtn";
import { PaintingTitle } from './PaintingTitle';
import { Dialog } from './Dialog';
import { ReloadLevelBtn } from './ReloadLevelBtn';
import { SeeAnsBtn } from './SeeAnsBtn';

// import { TimerMask } from './TimerMask';
import { StampGameBoard } from './StampGameBoard';
export class PaintingInfoScene {
    
    public static draw(){
        //加入背景
        // application.stage.addChild(PIXI.Sprite.from(Loader.resources["level1"].texture));
        application.stage.addChild(PIXI.Sprite.from(Loader.resources[`level${stamps.LevelNum}`].texture));
        const handleBackground = PIXI.Sprite.from(Loader.resources["background"].texture);
        handleBackground.x = 1080;
        handleBackground.y = 0;
        application.stage.addChild(handleBackground);

        const description = new PIXI.Text("內容簡介", {
            fontSize: 21,
            fontFamily: 'PingFangTC',
            fill: '#8b572a',
            align: 'center'
        });
        description.x = 1094;
        description.y = 146;
        application.stage.addChild(description);
        
        // const painting = PIXI.Sprite.from(Loader.resources["painting_name"].texture);
        // painting.x = 1094;
        // painting.y = 23;
        // application.stage.addChild(painting);
        application.stage.addChild(new PaintingTitle());
        // application.stage.addChild(new SeeAnsBtn());
        
        
        
        // const checkAnsBtn = PIXI.Sprite.from(Loader.resources["btn1"].texture);
        // checkAnsBtn.x = 1104;
        // checkAnsBtn.y = 813;
        // application.stage.addChild(checkAnsBtn);


        
        //加入連連看牌面
        // application.stage.addChild(new GameBoard());
        // application.stage.addChild(LinkedLine.instance);
        //加入按鈕
        // application.stage.addChild(new SoundBtn());
        // application.stage.addChild(new RevertBtn());
        // application.stage.addChild(new TipBtn());
        // application.stage.addChild(new ReloadBtn());
        application.stage.addChild(new FBBtn());
        // application.stage.addChild(new Stars());
        // application.stage.addChild(new Clock());

        // application.stage.addChild(new Character());
        // application.stage.addChild(new GameRoundEnd());
    }
}