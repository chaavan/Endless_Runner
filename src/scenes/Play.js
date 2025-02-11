class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        this.sound.stopAll()
        this.sound.play('explosionAudio', { volume: 0.7 })

        this.score = 0
        this.mainBackground = this.add.image(0, 0, 'BG').setOrigin(0)

        // add parallax background
        this.background1 = this.add.image(0, 0, 'Planets').setOrigin(0, 0)
        this.background2 = this.add.image(0, -this.background1.height, 'Planets').setOrigin(0, 0)

        // Add Background Music
        this.backgroundMusic = this.sound.add('BGMusic', {
            loop: true,
            volume: 0.5
        })

        // Add parallax stars layer
        this.stars1 = this.add.image(0, 0, 'Stars').setOrigin(0, 0);
        this.stars2 = this.add.image(0, -this.stars1.height, 'Stars').setOrigin(0, 0);

        // Add Tint
        this.tint = this.add.image(0, 0, 'Tint').setOrigin(0)
        
        // add rocket
        this.rocket = new Rocket(this, width / 2, 850, 'rockets', 0).setScale(1.75)

        // add keyboard input
        this.keys = this.input.keyboard.createCursorKeys()

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        // add astroids
        this.asteroids = this.add.group();

        // Spawn initial asteroids
        for (let i = 0; i < 6; i++) {
            const asteroid = new Astroid(this, Phaser.Math.Between(0, this.game.config.width), -100, 'astroid').setScale(0.75)
            this.asteroids.add(asteroid)
        }

        // rocket/astroid collision
        this.physics.add.collider(this.rocket, this.asteroids, this.handleCollision, null, this)

        // add score
        this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
            fontFamily: 'JumperGradient',
            fontSize: '32px',
            fill: '#ffffff',
        })

        this.scoreTimer = this.time.addEvent({
            delay: 500, // Update score every 100ms
            callback: () => {
                this.score += 1;
                this.scoreText.setText(`Score: ${this.score}`)
            },
            loop: true,
        })

        // Boost Bar
        this.boostBar = this.add.graphics()

        this.updateBoostBar()

        this.backgroundMusic.play()
    }

    update() {
        this.scrollbackground()

        this.rocketFSM.step()

        this.updateBoostBar()

        this.asteroids.getChildren().forEach((asteroid) => {
            asteroid.update()
        })
    }

    handleCollision(rocket, asteroid) {
        this.backgroundMusic.stop()

        rocket.setVisible(false)
        asteroid.setVisible(false)

        if (this.scoreTimer) {
            this.scoreTimer.remove(); // This stops the timer from running
        }

        this.asteroids.getChildren().forEach((asteroid) => {
            asteroid.destroy()
        })

        this.asteroids.clear(true, true) // Fully clear asteroids

        this.sound.play('explosionAudio')

        // Transition rocket to the explode state
        this.rocketFSM.transition('explode')
    }

    scrollbackground(){
        const planetScrollSpeed = 0.5
        const starsScrollSpeed = 1 // Parallax effect: stars move slower

        // Move grass layers downward
        this.background1.y += planetScrollSpeed
        this.background2.y += planetScrollSpeed

        // Loop grass layers
        if (this.background1.y >= this.game.config.height) {
            this.background1.y = this.background2.y - this.background2.height
        }
        if (this.background2.y >= this.game.config.height) {
            this.background2.y = this.background1.y - this.background1.height
        }

        // Move stars layers downward
        this.stars1.y += starsScrollSpeed
        this.stars2.y += starsScrollSpeed

        // Loop stars layers
        if (this.stars1.y >= this.game.config.height) {
            this.stars1.y = this.stars2.y - this.stars2.height
        }
        if (this.stars2.y >= this.game.config.height) {
            this.stars2.y = this.stars1.y - this.stars1.height
        }
    }

    updateBoostBar(){
        const barWidth = 200
        const barHeight = 20
        const x = 16
        const y = 60

        this.boostBar.clear()

        this.boostBar.fillStyle(0x000000, 1)
        this.boostBar.fillRect(x, y, barWidth, barHeight)

        const fillWidth = (this.rocket.boostEnergy / 100) * barWidth

        this.boostBar.fillStyle(0x00ff00, 1)
        this.boostBar.fillRect(x, y, fillWidth, barHeight)

        this.boostBar.lineStyle(2, 0xffffff, 1)
        this.boostBar.strokeRect(x, y, barWidth, barHeight)
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