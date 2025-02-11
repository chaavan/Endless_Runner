class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    create() {
        this.mainBackground = this.add.image(0, 0, 'BG').setOrigin(0)
        this.background1 = this.add.image(0, 0, 'Planets').setOrigin(0)
        this.stars1 = this.add.image(0, 0, 'Stars').setOrigin(0)
        this.tint = this.add.image(0, 0, 'Tint').setOrigin(0)
        this.clickSound = this.sound.add('clickAudio')

        if (!this.MenuMusic) {
            this.MenuMusic = this.sound.add('menuAudio', {
                loop: true,
                volume: 0.5
            })
            this.MenuMusic.play()
        }

        const gameName = this.add.image(325, 350, 'GameName')
        .setOrigin(0.5)
        .setScale(0.35)
        .setInteractive()

        const startButton = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'PlayButton')
        .setOrigin(0.5)
        .setScale(0.2)
        .setInteractive()

        startButton.on('pointerdown', () => {
            this.clickSound.play()
            this.input.setDefaultCursor('default')
            this.startScene('playScene', {stopMusic: true })
        })

        startButton.on('pointerover', () => {
            this.input.setDefaultCursor('pointer')
        })

        startButton.on('pointerout', () => {
            this.input.setDefaultCursor('default')
        })

        const instructionsButton = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 110, 'InstructionsButton')
        .setOrigin(0.5)
        .setScale(0.2)
        .setInteractive()

        instructionsButton.on('pointerdown', () => {
            this.clickSound.play()
            this.input.setDefaultCursor('default')
            this.startScene('instructionsScene', {stopMusic: false })
        })
        
        instructionsButton.on('pointerover', () => {
            this.input.setDefaultCursor('pointer')
        })

        instructionsButton.on('pointerout', () => {
            this.input.setDefaultCursor('default')
        })

        this.input.keyboard.on('keydown-SPACE', () => {
            this.clickSound.play()
            this.input.setDefaultCursor('default')
            this.startScene('playScene', {stopMusic: true })
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
