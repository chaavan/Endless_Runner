// Game Name: 
// Name: Chaavan Sure
// Date: 2/2/2025

let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true
            // gravity: {
            //     x: 0,
            //     y: 0
            // }
        }
    },
    scene: [ Load, Title, Play, GameOver ]
}

let game = new Phaser.Game(config)