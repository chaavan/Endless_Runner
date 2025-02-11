class Astroid extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        // Add to scene and physics system
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // Set Physics body
        let radius = this.width * 0.5
        this.body.setCircle(radius)
        this.body.setOffset((this.width / 2) - radius, (this.height / 2) - radius + 30)

        // Set initial velocity
        this.speed = Phaser.Math.Between(100, 200)
        this.body.setVelocityY(this.speed);

        // Set Tint
        this.setRandomTint()

        // Set initial position
        this.resetPosition(scene)
    }

    resetPosition(scene) {
        const asteroidWidth = this.displayWidth

        const minX = asteroidWidth / 2
        const maxX = scene.game.config.width - asteroidWidth / 2

        // Place asteroid at a random X position at the top of the screen
        this.x = Phaser.Math.Between(minX, maxX)
        this.y = -this.height

        // Set a random speed
        this.speed = Phaser.Math.Between(100, 200)
        this.body.setVelocityY(this.speed)

        this.setRandomTint()
    }

    setRandomTint() {
        const randomColor = Phaser.Display.Color.RandomRGB()
        this.setTint(randomColor.color)
    }

    update() {
        // Recycle asteroid if it goes off-screen
        if (this.y > this.scene.game.config.height) {
            this.resetPosition(this.scene);
        }
    }
}