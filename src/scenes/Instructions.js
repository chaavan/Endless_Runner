class Instructions extends Phaser.Scene {
    constructor() {
        super('instructionsScene')
    }

    create() {
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'BG')
            .setOrigin(0.5)

        const backButton = this.add.image(300, 550, 'backMenu')
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
            this.scene.start('menuScene')
            this.input.setDefaultCursor('default')
        })
    }
}