import {Loader} from "../core/Loader";
import {application} from "../Main";
import { IntroduceBtn } from "./IntroduceBtn";
import { StartGameBtn } from "./StartGameBtn";

export class MainMenuScene {
    
    public static draw(){
        //加入背景
        application.stage.addChild(PIXI.Sprite.from(Loader.resources["background_main_menu"].texture));
        //加入按鈕
        application.stage.addChild(new IntroduceBtn());
        application.stage.addChild(new StartGameBtn());
    }
}