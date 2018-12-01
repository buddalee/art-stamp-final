export class CoreEvent{
    public static AssetsLoadComplete: string = "AssetsLoadComplete";
}

export class GameFlowEvent{
    public static GameEndWithTimeout: string = "GameEndWithTimeout";
    public static GameEndWithNoPath: string = "GameEndWithNoPath";
    public static GamePass: string = "GamePass";
    public static ShowAnsCorrect: string = "ShowAnsCorrect";
    public static ShowAnsWrong: string = "ShowAnsWrong";
    
    public static ReloadBoardRequest: string = "ReloadBoardRequest";
    public static RevertBackRequest: string = "RevertBackRequest";
    public static BoardNeedReload: string = "BoardNeedReload";
    public static TipsRequest: string = "TipsRequest";
    public static CreateNewGameRequest: string = "CreateNewGameRequest";
    public static GameRoundStart: string = "GameRoundStart";
    public static LinkedLineSuccess: string = "LinkedLineSuccess";
    public static RenderGameScene: string = "RenderGameScene";
    public static RenderPaintingInfoScene: string = "RenderPaintingInfoScene";
    public static chooseStamp1Request: string = "chooseStamp1Request";    
    public static chooseStamp2Request: string = "chooseStamp2Request";    
    public static CheckAnsRequest: string = "CheckAnsRequest";    
    public static CheckAnsIsRightResponse: string = "CheckAnsIsRightResponse";    
    public static CheckAnsIsWrongResponse: string = "CheckAnsIsWrongResponse";    
    public static NextLevelRequest: string = "NextLevelRequest";
    public static SeeAnsRequest: string = "SeeAnsRequest";     
    public static ReloadGameRequest: string = "ReloadGameRequest";       
    public static GotoHomeRequest: string = "GotoHomeRequest";
    public static RenderIntroductionSceneRequest: string = "RenderIntroductionSceneRequest";             
            
}