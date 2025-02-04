class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        // add parallax background
        this.grass = this.add.image(0, 0, 'BG').setOrigin(0)
            // this.grass.setRotation(1.5708)
        
        // add rocket
        this.rocket = new Rocket(this, width / 2, 850, 'rocket', 0)

        // add keyboard input
        this.keys = this.input.keyboard.createCursorKeys()

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        // add astroids

        // rocket/astroid collision
    
    }

    update() {
        this.rocketFSM.step()
    }
}