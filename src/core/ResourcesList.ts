class Resources {
    public id:string;
    public path:string;

    constructor(id, path) {
        this.id = id;
        this.path = path;
    }
}
export class ResourcesList{
    public static img = [
        new Resources('bunny','assets/bunny.png'),
        new Resources('level1','assets/2.jpg'),
        new Resources('background','assets/bg-2.png'),
        new Resources('background_main_menu','assets/bg.png'),
        new Resources('timer_bg','assets/img-number.png'),
        new Resources('stamp1_icon','assets/stamp1.png'),
        new Resources('stamp2_icon','assets/stamp2.png'),
        new Resources('btn1','assets/btn-normal-m.png'),
        new Resources('painting_name','assets/img-border.png'),
        new Resources('dialog','assets/img-pop.png'),
        new Resources('next_level_btn','assets/btn-normal-s.png'),
        new Resources('Button','assets/Button.json'),
        
        new Resources('Introduce_Button','assets/introduce_btn.png'),
        new Resources('StartGame_Button','assets/start_game_btn.png'),
        new Resources('Character_Idle','assets/Character_Idle.json'),
        new Resources('Character_Jump','assets/Character_Jump.json'),
        new Resources('Character_Laugh','assets/Character_Laugh.json'),
        new Resources('Icon','assets/Icon.json')
    ];
    public static sound:Array<Resources> = [
        new Resources('Sound_bg','assets/bg.mp3'),
        new Resources('Sound_level_pass','assets/level_pass.mp3'),
        new Resources('Sound_select_1','assets/select_1.mp3'),
        new Resources('Sound_select_crrect','assets/select_crrect.mp3'),
        new Resources('Sound_select_error','assets/select_error.mp3'),
        new Resources('ReloadBoard','assets/reloadBoard.mp3'),
        new Resources('Tips','assets/tips.mp3'),
        new Resources('Back','assets/back.mp3'),
        new Resources('About','assets/about.mp3'),
    ];
}