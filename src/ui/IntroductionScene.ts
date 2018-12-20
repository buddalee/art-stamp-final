import {Loader} from "../core/Loader";
import {application} from "../Main";
import { LinkedLine } from "./LinkedLine";
import { RevertBtn } from "./RevertBtn";
import { TipBtn } from "./TipBtn";
import { FBBtn } from "./FBBtn";
import { GameRoundEnd } from "./GameRoundEnd";
import { CheckAnsBtn } from "./CheckAnsBtn";
import { PaintingTitle } from './PaintingTitle';
import { Dialog } from './Dialog';
import { ReloadLevelBtn } from './ReloadLevelBtn';
import { SeeAnsBtn } from './SeeAnsBtn';
import { ChooseStamp1Btn } from './ChooseStamp1Btn';
import { ChooseStamp2Btn } from './ChooseStamp2Btn';

import { StampGameBoard } from './StampGameBoard';
import { IntroduceBtn1 } from "./IntroduceBtn1";
export class IntroductionScene {
    
    public static draw(){
        const handleBackground = PIXI.Sprite.from(Loader.resources["background"].texture);
        handleBackground.x = 1080;
        handleBackground.y = 0;
        application.stage.addChild(handleBackground);
        application.stage.addChild(PIXI.Sprite.from(Loader.resources[`demo`].texture));
        // 加入印章牌面
        application.stage.addChild(new CheckAnsBtn());
        const chooseStampHint = new PIXI.Text("請選擇印章總類", {
            fontSize: 21,
            fontFamily: 'PingFangTC',
            fill: '#8b572a',
            align: 'center'
        });
        chooseStampHint.x = 1094;
        chooseStampHint.y = 146;
        application.stage.addChild(chooseStampHint);

        application.stage.addChild(new PaintingTitle());
        application.stage.addChild(new ChooseStamp1Btn());
        application.stage.addChild(new ChooseStamp2Btn());

        application.stage.addChild(new ReloadLevelBtn());
        application.stage.addChild(new SeeAnsBtn());


        
        application.stage.addChild(new SeeAnsBtn());
        //黑底
        let gt = new PIXI.Graphics();
        gt.beginFill(0x333333, 0.2);
        gt.drawRect(0,0,1440,899);
        gt.endFill();
        application.stage.addChild(gt);

        const stampIcon1 = PIXI.Sprite.from(Loader.resources["stamp1_icon"].texture);
        stampIcon1.pivot.x = stampIcon1.width / 2;
        stampIcon1.pivot.y = stampIcon1.height / 2;
        stampIcon1.width = 80;
        stampIcon1.height = 80;
        stampIcon1.x = 348;
        stampIcon1.y = 550;
        application.stage.addChild(stampIcon1);

        const stampIcon2 = PIXI.Sprite.from(Loader.resources["stamp2_icon"].texture);
        stampIcon2.pivot.x = stampIcon2.width / 2;
        stampIcon2.pivot.y = stampIcon2.height / 2;
        stampIcon2.width = 80;
        stampIcon2.height = 80;
        stampIcon2.x = 150;
        stampIcon2.y = 510;
        application.stage.addChild(stampIcon2);

        const descriptionHint1 = new PIXI.Text("1.限時5秒記住印章位置，5秒後即消失", {
            fontSize: 28,
            fontFamily: 'PingFangTC',
            fill: '#fff',
            align: 'center'
        });
        descriptionHint1.x = 152;
        descriptionHint1.y = 386;
        application.stage.addChild(descriptionHint1);

        const descriptionHint2 = new PIXI.Text("2.選擇印章樣式在畫作蓋出相對位置", {
            fontSize: 28,
            fontFamily: 'PingFangTC',
            fill: '#fff',
            align: 'center'
        });
        descriptionHint2.x = 910.5;
        descriptionHint2.y = 292;
        application.stage.addChild(descriptionHint2);

        const descriptionHint3 = new PIXI.Text("3.確定答案或選擇重新挑戰", {
            fontSize: 28,
            fontFamily: 'PingFangTC',
            fill: '#fff',
            align: 'center'
        });
        descriptionHint3.x = 911;
        descriptionHint3.y = 568;
        application.stage.addChild(descriptionHint3);
        const descriptionHint4 = new PIXI.Text("4.看完攻略後，就可以按開始遊戲囉 =>", {
            fontSize: 28,
            fontFamily: 'PingFangTC',
            fill: '#fff',
            align: 'center'
        });
        descriptionHint4.x = 200;
        descriptionHint4.y = 768;
        application.stage.addChild(descriptionHint4);
        application.stage.addChild(new IntroduceBtn1());
        

    }
}