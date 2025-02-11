// Game Name: Rocket Runner
// Name: Chaavan Sure
// Date: 2/7/2025
//Hours Spent: 49 hours

//Creative Tilt:
    // Technically Intresting:
    // Visual Style:

'use strict'

let config = {
    parent: "Game-container",
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Load, Menu, Instructions, Play, GameOver ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config