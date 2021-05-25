export default class MenuScene extends Phaser.Scene {
    constructor(){
        super('MenuScene');
    }

    preload()
    {
        this.load.image('title', './assets/images/gametitle.png');
        this.load.image('comet', './assets/images/comet.png');
        this.load.image('start', './assets/images/start.png');
        this.load.audio('music', './assets/audio/spaceoddity.mp3')
        this.objects = {};
    }
    create()
    {
        this.add.image(385,150,'title');
        this.add.image(370,350,'comet');
        this.music=this.sound.add('music');
        this.music.play();
        //Start Button
        let startBtn  = this.add.sprite(490,600, 'start');
        startBtn.setInteractive();
        startBtn.on('pointerdown', () => this.startFunction());
    }
    startFunction(pointer,start){
        this.scene.start('GameScene');
    }



}