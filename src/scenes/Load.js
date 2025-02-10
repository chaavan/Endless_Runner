class Load extends Phaser.Scene{
    constructor(){
        super('loadScene')
    }

    init(data){
        this.nextScene = data.nextScene || 'playScene'
    }

    preload(){
        this.load.path = './assets/'
        this.load.image('BG', 'img/background.png')
        this.load.image('Stars', 'img/StarsOverlay.png')
        this.load.image('Planets', 'img/PlanetsOverlay.png')
        this.load.image('Tint', 'img/black.png')
        this.load.image('backMenu', 'img/BackToMenuButton.png')
        this.load.audio('BGMusic', 'audio/background-music.mp3' )
        // this.load.image('instructions', 'TBM')
        this.load.image('astroid', 'img/AsteroidOverlay.png')
        this.load.spritesheet('rocket', 'img/rocket-sprite.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
    }

    create(){
        this.anims.create({
            key: 'launch-up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('rocket', { start: 8, end: 11 }),
        })
        this.anims.create({
            key: 'launch-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('rocket', { start: 4, end: 7 }),
        })

        this.anims.create({
            key: 'launch-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('rocket', { start: 12, end: 15 }),
        })
        
        this.anims.create({
            key: 'boost-right',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('rocket', { start: 24, end: 27 }),
        })

        this.anims.create({
            key: 'boost-left',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('rocket', { start: 28, end: 31 }),
        })
        
        this.scene.start(this.nextScene)
    }
}