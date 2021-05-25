export default class GameScene extends Phaser.Scene {
    constructor(){
        super('GameScene');
    }

    init(){
        this.player;
        this.velocity = 3;
        this.height=this.scale.height;
        this.width=this.scale.width;
        this.gameOver=false;
        this.gameOverTxt;
        this.bg1;
        this.bg2;
        this.score = 0;
        this.scoreText;
    }
    preload()
    {
       
        this.load.image('earth', './assets/images/earth.png');
        this.load.image('stars', './assets/images/stars.png');
        this.load.image('gameover', './assets/images/gameover.png');
        this.load.spritesheet('player', './assets/images/player.png', {frameWidth:128});
        this.load.spritesheet('enemy1', './assets/images/enemy1.png', {frameWidth:128});
        this.load.spritesheet('enemy2', './assets/images/enemy2.png', {frameWidth:128});
        this.load.spritesheet('enemy3', './assets/images/enemy3.png', {frameWidth:128});
        this.load.spritesheet('enemy4', './assets/images/enemy4.png', {frameWidth:128});
        this.load.spritesheet('enemy5', './assets/images/enemy5.png', {frameWidth:128});
    }
    create()
    {
        //Background
        this.bg1 = this.add.tileSprite(264,114,0,0,'stars');
        this.bg2 = this.add.tileSprite(0,472,0,0, 'earth');
      
        //Player Spaceship
        this.player = this.physics.add.sprite(50,440,'player', 0);
        this.player.setCollideWorldBounds(true);
        //Movement
        this.arrows = this.input.keyboard.createCursorKeys();
        //Enemy1
        this.enemy1 = this.physics.add.group({
            collideWorldBounds: false,
            key: 'enemy1',
            repeat: 100,
            setXY: {x:500, y:200, stepX:1000}
        });
        this.enemy1.children.iterate(function (child){
            child.setVelocityX(-300);
        });
        //Enemy2
        this.enemy2 = this.physics.add.group({
            collideWorldBounds: false,
            key: 'enemy2',
            repeat: 100,
            setXY: {x:1500, y:500, stepX:1200}
        });
        this.enemy2.children.iterate(function (child){
            child.setVelocityX(-600);
            
        });
        //Enemy3
        this.enemy3 = this.physics.add.group({
            collideWorldBounds: false,
            key: 'enemy3',
            repeat: 100,
            setXY: {x:2000, y:500, stepX:2000}
        });
        this.enemy3.children.iterate(function (child){
            child.setVelocityX(-200);
            
        });
         //Enemy4
         this.enemy4 = this.physics.add.group({
            collideWorldBounds: false,
            key: 'enemy4',
            repeat: 100,
            setXY: {x:3000, y:190, stepX:2200}
        });
        this.enemy4.children.iterate(function (child){
            child.setVelocityX(-150);
            
        });
         //Enemy5
         this.enemy5 = this.physics.add.group({
            collideWorldBounds: false,
            key: 'enemy5',
            repeat: 100,
            setXY: {x:3500, y:430, stepX:3500}
        });
        this.enemy5.children.iterate(function (child){
            child.setVelocityX(-160);
            
        });
        //Game Over Text
        this.gameOverTxt = this.add.image(400,145, 'gameover');
        this.gameOverTxt.setVisible(false);
        //Colliders for enemies
        this.physics.add.collider(this.player, this.enemy1, this.enemyCollision, null, this);
        this.physics.add.collider(this.player, this.enemy2, this.enemyCollision, null, this);
        this.physics.add.collider(this.player, this.enemy3, this.enemyCollision, null, this);
        this.physics.add.collider(this.player, this.enemy4, this.enemyCollision, null, this);
        this.physics.add.collider(this.player, this.enemy5, this.enemyCollision, null, this);
        //Score 
        this.scoreText=this.add.text(20,15, 'Score:',{fontSize:'35px', fill:'	#FF0000'});
        this.scoreText.setScrollFactor(0);
    }
    update()
    {
        //Player Constant Move to the Right
        this.player.setVelocityX(10);
        //BG Image Loop
        this.bg1.tilePositionX += 1;
        this.bg2.tilePositionX += 2;
        this.phaseKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        this.iter+=0.01
        //Key binding
        if(this.arrows.right.isDown)
        {
            this.player.setVelocityX(400);
            this.enemy3.setVelocityX(-660);
            this.enemy4.setVelocityX(-200);

            
        }
        else if(this.arrows.left.isDown)
        {
            this.player.setVelocityX(-400);
            this.enemy3.setVelocityX(-660);
            this.enemy4.setVelocityX(-180);
        }
        //Phase Powerup
       // else if(this.phaseKey.isDown)
     //   {
      //      this.player.setScale(0.5);
        
      //  }
        if(this.arrows.up.isDown)
        {
            this.player.setVelocityY(-430);
            this.enemy1.setVelocityY(200);
            this.enemy2.setVelocityY(-250);
            this.enemy3.setVelocityX(-660);
            this.enemy4.setVelocityY(-80);
            this.enemy5.setVelocityY(-190);
        }
        else if(this.arrows.down.isDown)
        {
            this.player.setVelocityY(430);
            this.enemy1.setVelocityY(-200);
            this.enemy2.setVelocityY(250);
            this.enemy3.setVelocityX(-660);
            this.enemy4.setVelocityY(80);
            this.enemy5.setVelocityY(190);
        }
        else
        {
            this.player.setVelocityY(0);
            this.enemy1.setVelocityY(0);
            this.enemy2.setVelocityY(0);
            this.enemy4.setVelocityY(0);
            this.enemy1.setVelocityY(0);
            this.enemy2.setVelocityY(0);
            this.enemy4.setVelocityY(0);
            this.enemy5.setVelocityY(0);    
        }
        //Score
        this.score +=10;
        this.scoreText.setText('Score: '+this.score);
        //Restart Game
        this.restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if (this.gameOver==true)
        { 
            this.bg1.tilePositionX =0;
            this.bg2.tilePositionX =0;
            this.gameOverTxt.setVisible(true);
            if (this.restartKey.isDown)
          {
            this.scene.restart();
            this.gameOver = false;
          }
        }
    }
    enemyCollision(enemy,player)
    {
        this.physics.pause();
        this.scoreText.setVisible(false);
        this.gameOver=true;
        
    }

}