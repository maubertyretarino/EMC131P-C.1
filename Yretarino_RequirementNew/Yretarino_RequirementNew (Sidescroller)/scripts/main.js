import GameScene from "./scenes/GameScene.js";
import MenuScene from "./scenes/MenuScene.js";

let menuScene = new MenuScene();
let gameScene = new GameScene();

var config = {
    type: Phaser.AUTO,
    parent: 'sidescroller-parent',
    width: 800,
    height: 600, 
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:0},
        }
    }  
};

let sidescroller = new Phaser.Game(config);

sidescroller.scene.add('GameScene', gameScene);
sidescroller.scene.add('MenuScene',menuScene);

sidescroller.scene.start('MenuScene');

