class Load extends Phaser.Scene{
    constructor(){
        super('loadScene')
    }

    preload(){
        this.load.path = './assets/'
        this.load.image('BG', 'img/background.png')
        this.load.image('Stars', 'img/StarsOverlay.png')
        this.load.image('Planets', 'img/PlanetsOverlay.png')
        this.load.image('Tint', 'img/black.png')
        this.load.image('backMenu', 'img/BackToMenuButton.png')
        this.load.image('PlayButton', 'img/PlayButton.png')
        this.load.image('RetryButton', 'img/RetryButton.png')
        this.load.image('InstructionsButton', 'img/InstructionsButton.png')
        this.load.image('GameName', 'img/RocketRunner.png')
        this.load.image('leftArrow', 'img/left-arrow.png')
        this.load.image('rightArrow', 'img/right-arrow.png')
        this.load.image('shiftKey', 'img/shift.png')
        this.load.audio('BGMusic', 'audio/background-music.mp3' )
        this.load.audio('menuAudio', 'audio/MenuAudio.mp3')
        this.load.audio('explosionAudio', 'audio/explosion.mp3')
        this.load.audio('clickAudio', 'audio/click.mp3')
        this.load.audio('boostAudio', 'audio/boost.mp3')
        // this.load.image('instructions', 'TBM')
        this.load.image('astroid', 'img/AsteroidOverlay.png')
        this.load.spritesheet('rocketsBoost', 'img/RocketsBoost-sprite.png', {
            frameWidth: 64,
            frameHeight: 64,
        })
        this.load.spritesheet('rockets', 'img/Rockets-sprite.png', {
            frameWidth: 64,
            frameHeight: 64,
        })
        this.load.spritesheet('explosion', 'img/RocketsCollision-sprite.png', {
            frameWidth: 64,
            frameHeight: 64,
        })

    }

    create(){
        this.anims.create({
            key: 'launch',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('rockets', { start: 0, end: 6 }),
        })
        
        this.anims.create({
            key: 'boost',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('rocketsBoost', { start: 0, end: 6 }),
        })
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 0,
        })
        
        this.scene.start('menuScene')
    }
}