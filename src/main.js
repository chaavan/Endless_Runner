// Code Practice: RNGolf
// Name: 
// Date:

'use strict'

// const { Physics } = require("phaser")

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
    scene: [ Load, Play ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config