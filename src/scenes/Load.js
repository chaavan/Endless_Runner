class Load extends Phaser.Scene{
    constructor(){
        super('LoadScene')
    }

    preload(){
        this.load.path = './assets/img/'
        this.load.image('BG', 'background.jpg')
        this.load.image('astroid', 'astroid.png')
        this.load.spritesheet('rocket', 'rocket-sprite.png', {
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


        this.scene.start('playScene')
    }
}