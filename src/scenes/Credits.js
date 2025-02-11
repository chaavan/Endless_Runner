class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }

    create() {
        this.clickSound = this.sound.add('clickAudio')
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'BG').setOrigin(0.5)
        this.add.text(this.game.config.width / 2, 100, 'Credits', {
            fontSize: '64px',
            fontFamily: 'JumperGradient',
            fill: '#fff',
        }).setOrigin(0.5)

        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 300, 'Designed & Created By:', {
            fontSize: '32px',
            fontFamily: 'JumperGradient',
            fill: '#eee',
        }).setOrigin(0.5)

        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 250, 'Chaavan Sure', {
            fontSize: '32px',
            fontFamily: 'JumperGradient',
            fill: '#ccc',
        }).setOrigin(0.5)

        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 150, 'Assets:', {
            fontSize: '32px',
            fontFamily: 'JumperGradient',
            fill: '#eee',
        }).setOrigin(0.5)

        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 100, 'Chaavan Sure', {
            fontSize: '32px',
            fontFamily: 'JumperGradient',
            fill: '#ccc',
        }).setOrigin(0.5)

        this.add.text(this.game.config.width / 2, this.game.config.height / 2 , 'Programming:', {
            fontSize: '32px',
            fontFamily: 'JumperGradient',
            fill: '#eee',
        }).setOrigin(0.5)

        this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 50, 'Chaavan Sure', {
            fontSize: '32px',
            fontFamily: 'JumperGradient',
            fill: '#ccc',
        }).setOrigin(0.5)

        this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 150, 'Music/SFX:', {
            fontSize: '32px',
            fontFamily: 'JumperGradient',
            fill: '#eee',
        }).setOrigin(0.5)

        this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 200, 'Pixabay.com', {
            fontSize: '32px',
            fontFamily: 'JumperGradient',
            fill: '#ccc',
        }).setOrigin(0.5)

        const backButton = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 350, 'backMenu')
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