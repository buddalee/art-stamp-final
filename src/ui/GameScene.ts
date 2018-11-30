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
import { CheckAnsBtn } from "./CheckAnsBtn";
import { PaintingTitle } from './PaintingTitle';
import { Dialog } from './Dialog';
import { ReloadLevelBtn } from './ReloadLevelBtn';
import { SeeAnsBtn } from './SeeAnsBtn';
import { ChooseStamp1Btn } from './ChooseStamp1Btn';
import { ChooseStamp2Btn } from './ChooseStamp2Btn';

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
        application.stage.addChild(new CheckAnsBtn());
        const chooseStampHint = new PIXI.Text("請選擇印章總類", {
            fontSize: 15,
            fontFamily: 'PingFangTC',
            fill: '#4a4a4a',
            align: 'center'
        });
        chooseStampHint.x = 1094;
        chooseStampHint.y = 146;
        application.stage.addChild(chooseStampHint);
        
        // const painting = PIXI.Sprite.from(Loader.resources["painting_name"].texture);
        // painting.x = 1094;
        // painting.y = 23;
        // application.stage.addChild(painting);
        application.stage.addChild(new PaintingTitle());
        application.stage.addChild(new ChooseStamp1Btn());
        application.stage.addChild(new ChooseStamp2Btn());

        application.stage.addChild(new ReloadLevelBtn());
        application.stage.addChild(new SeeAnsBtn());
        
        application.stage.addChild(new Dialog());
        
        
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
        // application.stage.addChild(new FBBtn());
        // application.stage.addChild(new Stars());
        // application.stage.addChild(new Clock());

        // application.stage.addChild(new Character());
        // application.stage.addChild(new GameRoundEnd());
    }
}