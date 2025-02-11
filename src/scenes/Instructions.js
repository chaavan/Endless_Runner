class Instructions extends Phaser.Scene {
    constructor() {
        super('instructionsScene')
    }

    create() {
        this.clickSound = this.sound.add('clickAudio')
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'BG').setOrigin(0.5)
        this.add.text(this.game.config.width / 2, 100, 'Instructions', {
            fontSize: '64px',
            fontFamily: 'JumperGradient',
            fill: '#fff',
        }).setOrigin(0.5)

        this.leftrocket = new Rocket(this, width / 4 - 50, 250, 'rockets', 0).setScale(1.75).setAngle(-20)
        this.add.image(this.game.config.width / 4 + 50, 250, 'leftArrow').setScale(0.25).setOrigin(0.5)
    
        this.rightrocket = new Rocket(this, width / 4 - 50, 400 , 'rockets', 0).setScale(1.75).setAngle(20)
        this.add.image(this.game.config.width / 4 + 50, 400, 'rightArrow').setScale(0.25).setOrigin(0.5)


        this.BoostLeftrocket = new Rocket(this, width / 4 - 50, 550 , 'rocketsBoost', 0).setScale(1.75).setAngle(-20)
        this.add.image(this.game.config.width / 4 + 50, 550, 'leftArrow').setScale(0.25).setOrigin(0.5)
        this.add.text(this.game.config.width / 4 + 150, 550, '+', {
            fontSize: '64px',
            fontFamily: 'JumperGradient',
            fill: '#fff',
        }).setOrigin(0.5)
        this.add.image(this.game.config.width / 4 + 250, 550, 'shiftKey').setScale(0.25).setOrigin(0.5)


        this.BoostRightrocket = new Rocket(this, width / 4 - 50, 700 , 'rocketsBoost', 0).setScale(1.75).setAngle(20)
        this.add.image(this.game.config.width / 4 + 50, 700, 'rightArrow').setScale(0.25).setOrigin(0.5)
        this.add.text(this.game.config.width / 4 + 150, 700, '+', {
            fontSize: '64px',
            fontFamily: 'JumperGradient',
            fill: '#fff',
        }).setOrigin(0.5)
        this.add.image(this.game.config.width / 4 + 250, 700, 'shiftKey').setScale(0.25).setOrigin(0.5)

        this.leftrocket.play('launch')
        this.rightrocket.play('launch')
        this.BoostRightrocket.play('boost')
        this.BoostLeftrocket.play('boost')

        const backButton = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 400, 'backMenu')
        .setOrigin(0.5)
        .setScale(0.2)
        .setInteractive()

        backButton.on('pointerover', () => {
            this.input.setDefaultCursor('pointer')
        })

        backButton.on('pointerout', () => {
            this.input.setDefaultCursor('default')
        })

        backButton.on('pointerdown', () => {
            this.clickSound.play()
            this.input.setDefaultCursor('default')
            this.startScene('menuScene', {stopMusic: false })
        })
    }

    startScene(targetScene, data) {
        this.cameras.main.fadeOut(1000, 0, 0, 0)

        if (data.stopMusic) {
            this.tweens.add({
                targets: this.menuMusic,
                volume: 0,
                duration: 1000, 
                onComplete: () => {
                    this.MenuMusic.stop()
                    this.scene.start(targetScene, data)
                }
            })
        } else {
            this.time.delayedCall(1000, () => {
                this.scene.start(targetScene, data)
            })
        }
    }
}