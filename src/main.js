// Code Practice: Rocket Runner
// Name: Chaavan Sure
// Date: 2/7/2025

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
            debug: true
        }
    },
    scene: [ Menu, Instructions, Load, Play, GameOver ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config