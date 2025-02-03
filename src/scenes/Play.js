class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
    }
    create(){
        rocket = this.physics.add.sprite(32, 32, 'rocket').setOrigin(0.5)
        rocket.setCollideWorldBounds(true)
        rocket.Immovable()
    }

    update(){}
}