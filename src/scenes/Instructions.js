class Instructions extends Phaser.Scene {
    constructor() {
        super('instructionsScene')
    }

    create() {
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'BG')
            .setOrigin(0.5)

        let backButton = this.add.text(this.game.config.width / 2, this.game.config.height - 50, 
            'Back to Menu', {
            fontSize: '24px',
            fill: '#ff0000'
        }).setOrigin(0.5).setInteractive()

        backButton.on('pointerover', () => {
            this.input.setDefaultCursor('pointer')
        })

        backButton.on('pointerout', () => {
            this.input.setDefaultCursor('default')
        })

        backButton.on('pointerdown', () => {
            this.scene.start('menuScene')
        })
    }
}