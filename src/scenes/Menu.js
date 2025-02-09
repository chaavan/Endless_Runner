class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    create() {
        this.add.text(this.game.config.width / 2, this.game.config.height / 3, 'Rocket Runner', {
            fontSize: '48px',
            fill: '#ffffff'
        }).setOrigin(0.5)

        let startButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2, 
            'Press SPACE or Click to Start', {
            fontSize: '24px',
            fill: '#00ff00'
        }).setOrigin(0.5).setInteractive()

        startButton.on('pointerdown', () => {
            this.scene.start('loadScene', { nextScene: 'playScene' })
        })

        let instructionsButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 50, 
            'Instructions', {
            fontSize: '24px',
            fill: '#ffff00'
        }).setOrigin(0.5).setInteractive()

        instructionsButton.on('pointerdown', () => {
            this.scene.start('loadScene', { nextScene: 'instructionsScene' })
        })

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('loadScene', { nextScene: 'playScene' })
        })
    }
}
