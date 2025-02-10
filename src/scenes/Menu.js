class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }
    preload(){
        this.load.path = './assets/'
        this.load.audio('menuAudio', 'audio/MenuAudio.mp3')
        this.load.image('BG', 'img/background.png')
        this.load.image('Stars', 'img/StarsOverlay.png')
        this.load.image('Planets', 'img/PlanetsOverlay.png')
        this.load.image('Tint', 'img/black.png')
        this.load.image('PlayButton', 'img/PlayButton.png')
        this.load.image('InstructionsButton', 'img/InstructionsButton.png')
        this.load.image('GameName', 'img/RocketRunner.png')
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

    const gameName = this.add.image(325, 350, 'GameName')
        .setOrigin(0.5)
        .setScale(0.35)
        .setInteractive()
        // this.add.text(this.game.config.width / 2, this.game.config.height / 3, 'Rocket Runner', {
        //     fontSize: '48px',
        //     fill: '#ffffff'
        // }).setOrigin(0.5)

        const startButton = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'PlayButton')
        .setOrigin(0.5)
        .setScale(0.2)
        .setInteractive()

        // let startButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2, 
        //     'Press SPACE or Click to Start', {
        //     fontSize: '24px',
        //     fill: '#00ff00'
        // }).setOrigin(0.5).setInteractive()

        startButton.on('pointerdown', () => {
            this.MenuMusic.stop()
            this.startScene('loadScene', { nextScene: 'playScene', stopMusic: true })
        })

        // let instructionsButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 50, 
        //     'Instructions', {
        //     fontSize: '24px',
        //     fill: '#ffff00'
        // }).setOrigin(0.5).setInteractive()

        const instructionsButton = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 110, 'InstructionsButton')
        .setOrigin(0.5)
        .setScale(0.2)
        .setInteractive()

        instructionsButton.on('pointerdown', () => {
            this.startScene('loadScene', { nextScene: 'instructionsScene', stopMusic: false })
        })

        this.input.keyboard.on('keydown-SPACE', () => {
            this.MenuMusic.stop()
            this.startScene('loadScene', { nextScene: 'playScene', stopMusic: true })
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
