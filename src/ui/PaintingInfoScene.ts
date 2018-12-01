import {Loader} from "../core/Loader";
import {application, stamps} from "../Main";
import { paintingInfos } from '../core/Stamps';
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
import { ContinueBtn } from './ContinueBtn';
// import { TimerMask } from './TimerMask';
import { StampGameBoard } from './StampGameBoard';
import { GoHomeBtn } from './GoHomeBtn';
export class PaintingInfoScene {
    
    public static draw(){
        //加入背景
        // application.stage.addChild(PIXI.Sprite.from(Loader.resources["level1"].texture));
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
        application.stage.addChild(PIXI.Sprite.from(Loader.resources[`level${levelNumber}`].texture));
        const handleBackground = PIXI.Sprite.from(Loader.resources["background"].texture);
        handleBackground.x = 1080;
        handleBackground.y = 0;
        application.stage.addChild(handleBackground);
        
        // const _paintingInfos = paintingInfos.sort((pre, next) => next.Serial_No - +pre.Serial_No);

        console.log('paintingInfos ', paintingInfos);

        const info = paintingInfos[levelNumber - 1];
        const author = info.ArticleMaker;
        console.log('author: ', author);
        const authorText = new PIXI.Text(author, {
            fontSize: 16,
            fontFamily: 'PingFangTC',
            fill: '#4a4a4a',
            align: 'center'
        });
        authorText.x = 1094;
        authorText.y = 182;
        application.stage.addChild(authorText);
        const authorTitle = new PIXI.Text('創作者', {
            fontSize: 21,
            fontFamily: 'PingFangTC',
            fill: '#8b572a',
            align: 'center'
        });
        authorTitle.x = 1094;
        authorTitle.y = 146;
        application.stage.addChild(authorTitle);
        const description = info.ArticleContext.replace(/&nbsp;/g, '').replace(/\r/g, '');
        console.log('author: ', author);
        const descriptionText = new PIXI.Text(description, {
            fontSize: 16,
            fontFamily: 'PingFangTC',
            fill: '#4a4a4a',
            align: 'center',
            breakWords: true,
            wordWrap : true,
            wordWrapWidth : 320
        });
        descriptionText.x = 1094;
        descriptionText.y = 258;
        application.stage.addChild(descriptionText);
        const descriptionTitle = new PIXI.Text('文物簡介', {
            fontSize: 21,
            fontFamily: 'PingFangTC',
            fill: '#8b572a',
            align: 'center'
        });
        descriptionTitle.x = 1094;
        descriptionTitle.y = 218;
        application.stage.addChild(descriptionTitle);    
    
        const stampText = new PIXI.Text('印記', {
            fontSize: 21,
            fontFamily: 'PingFangTC',
            fill: '#8b572a',
            align: 'center'
        });
        stampText.x = 1094;
        stampText.y = 753;
        application.stage.addChild(stampText);  

        const stampText1 = new PIXI.Text('乾、隆', {
            fontSize: 16,
            fontFamily: 'PingFangTC',
            fill: '#4a4a4a',
            align: 'center'
        });
        stampText1.x = 1094;
        stampText1.y = 785;
        application.stage.addChild(stampText1);  

        application.stage.addChild(new PaintingTitle());
        application.stage.addChild(new ContinueBtn());

        application.stage.addChild(new FBBtn());
        application.stage.addChild(new GoHomeBtn());
        

    }
}