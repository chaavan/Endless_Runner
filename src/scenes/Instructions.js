class Instructions extends Phaser.Scene {
    constructor() {
        super('instructionsScene')
    }

    create() {
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'BG')
            .setOrigin(0.5)

        const backButton = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 300, 'backMenu')
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