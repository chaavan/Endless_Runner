class Astroid extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        // Add to scene and physics system
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set initial velocity
        this.speed = Phaser.Math.Between(100, 200); // Random speed between 100-200
        this.body.setVelocityY(this.speed);

        // Set initial position
        this.resetPosition(scene);
    }

    resetPosition(scene) {
        // Place asteroid at a random X position at the top of the screen
        this.x = Phaser.Math.Between(0, scene.game.config.width);
        this.y = -this.height; // Above the visible screen

        // Set a random speed
        this.speed = Phaser.Math.Between(100, 200);
        this.body.setVelocityY(this.speed);
    }

    update() {
        // Recycle asteroid if it goes off-screen
        if (this.y > this.scene.game.config.height) {
            this.resetPosition(this.scene);
        }
    }
}