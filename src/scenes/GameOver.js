class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOverScene')
    }

    init(data) {
        this.finalScore = data.score // Get the final score from the Play scene
    }

    create() {
        // Display "Game Over" text
        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 50, 'Game Over', {
            fontSize: '48px',
            fill: '#ff0000',
        }).setOrigin(0.5)

        // Display the final score
        this.add.text(this.game.config.width / 2, this.game.config.height / 2, `Final Score: ${this.finalScore}`, {
            fontSize: '32px',
            fill: '#ffffff',
        }).setOrigin(0.5)

        // console.log(`Score: ${this.finalScore}`)

        // Add a restart button
        const restartButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 50, 'Restart', {
            fontSize: '28px',
            fill: '#00ff00',
        }).setOrigin(0.5).setInteractive()

        restartButton.on('pointerover', () => {
            this.input.setDefaultCursor('pointer')
        })

        // Reset the cursor when not hovering
        restartButton.on('pointerout', () => {
            this.input.setDefaultCursor('default')
        })

        restartButton.on('pointerdown', () => {
            this.scene.start('playScene') // Restart the game
        })
    }
}