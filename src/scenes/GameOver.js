class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOverScene')
    }

    init(data) {
        this.finalScore = data.score // Get the final score from the Play scene
    }

    create() {
        this.mainBackground = this.add.image(0, 0, 'BG').setOrigin(0)
        this.background1 = this.add.image(0, 0, 'Planets').setOrigin(0)
        this.stars1 = this.add.image(0, 0, 'Stars').setOrigin(0)
        this.tint = this.add.image(0, 0, 'Tint').setOrigin(0)

        if (!this.MenuMusic) {
            this.MenuMusic = this.sound.add('menuAudio', {
                loop: true,
                volume: 0.5
            })
            this.MenuMusic.play()
        }

        // Display "Game Over" text
        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 150, 'Game Over', {
            fontFamily: 'JumperGradient',
            fontSize: '64px',
            fill: '#ff0000',
        }).setOrigin(0.5)

        // Display the final score
        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 75, `Final Score: ${this.finalScore}`, {
            fontFamily: 'JumperGradient',
            fontSize: '32px',
            fill: '#ffffff',
        }).setOrigin(0.5)

        // Add a restart button
        const restartButton = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 25, 'RetryButton')
        .setOrigin(0.5)
        .setScale(0.2)
        .setInteractive()

        restartButton.on('pointerover', () => {
            this.input.setDefaultCursor('pointer')
        })

        restartButton.on('pointerout', () => {
            this.input.setDefaultCursor('default')
        })

        restartButton.on('pointerdown', () => {
            // this.MenuMusic.stop()
            this.input.setDefaultCursor('default')
            this.startScene('playScene', {stopMusic: true })
        })

        const menuButton = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 125, 'backMenu')
        .setOrigin(0.5)
        .setScale(0.2)
        .setInteractive()

        menuButton.on('pointerover', () => {
            this.input.setDefaultCursor('pointer')
        })

        menuButton.on('pointerout', () => {
            this.input.setDefaultCursor('default')
        })

        menuButton.on('pointerdown', () => {
            // this.MenuMusic.stop()
            this.input.setDefaultCursor('default')
            this.startScene('menuScene', {stopMusic: false })
        })
    }

    startScene(targetScene, data) {
        // Fade out the camera
        this.cameras.main.fadeOut(1000, 0, 0, 0); // 1-second fade-out to black

        // Gradually lower the music volume
        if (data.stopMusic) {
            this.tweens.add({
                targets: this.menuMusic,
                volume: 0,
                duration: 1000, // Matches the fade-out duration
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