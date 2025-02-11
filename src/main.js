// Game Name: Rocket Runner
// Name: Chaavan Sure
// Date: 2/7/2025
//Hours Spent: 49 hours

//Creative Tilt:
    // Technically Intresting:
        // The Boost Bar that I Implemented on the top-right corner of the play scene is dynamically drawn using Phaser’s Graphics API, allowing real-time updates without relying on pre-made sprites. 
        // It depletes as the player boosts and regenerates gradually when boosting stops, creating a resource management mechanic. 
        // The bar is directly tied to the Rocket’s state machine, ensuring accurate energy tracking in different movement states. 
        // This implementation required me to research and look beyod the class teachings, making it a technically interesting feature beyond basic Phaser examples that we leared.

    // Visual Style:
        // Rocket Runner features a cohesive sci-fi visual style, with parallax scrolling backgrounds, a dynamic boost animation, and a smooth explosion effect that enhances feedback. 
        // All visual assets, including the rocket and asteroids, are custom-made by me, maintaining a unique aesthetic.
        // The game’s UI elements, like the Boost Bar, are seamlessly integrated, making the experience feel polished and engaging. 
        // The combination of custom animations, fluid transitions, and harmonious audio makes this game visually appealing.

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