class Rocket extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction){
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add Rocket to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)

        // set custom Hero properties
        this.direction = direction 
        this.rocketVelocity = 100    // in pixels
        this.boostCooldown = 300    // in ms

        // initialize state machine managing hero (initial state, possible states, state args[])
        scene.rocketFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            dash: new BoostState(),
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM
    }
}

class IdleState extends State {
    enter(scene, rocket){
        rocket.setVelocity(0)
        rocket.anims.play(`launch-up`)
        rocket.anims.stop()
    }

    execute(scene,rocket){
        const { left, right, shift } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(shift)){
            this.stateMachine.transition('boost')
            return
        }

        if(left.isDown || right.isDown) {
            this.stateMachine.transition('move')
            return
        }
    }
}

class MoveState extends State {
    execute(scene, rocket){
        const { left, right, shift } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(shift)) {
            this.stateMachine.transition('boost')
            return
        }

        if(!(left.isDown || right.isDown)) {
            this.stateMachine.transition('idle')
            return
        }

        let moveDirection = new Phaser.Math.Vector2(0, 0)

        if(left.isDown) {
            moveDirection.x = -1
            rocket.direction = 'left'
        } else if(right.isDown) {
            moveDirection.x = 1
            rocket.direction = 'right'
        }
        // normalize movement vector, update hero position, and play proper animation
        moveDirection.normalize()
        rocket.setVelocity(rocket.rocketVelocity * moveDirection.x, 1)
        rocket.anims.play(`launch-${rocket.direction}`, true) 
    }
}

class BoostState extends State {
    enter(scene, rocket){
        rocket.setVelocity(0)
        rocket.anims.play(`boost-right`)
        switch(rocket.direction){
            case 'left':
                rocket.setVelocityX(-rocket.rocketVelocity * 3)
                break
            case 'right':
                rocket.setVelocityX(rocket.rocketVelocity * 3)
                break
        }

        scene.time.delayedCall(hero.dashCooldown, () => {
            this.stateMachine.transition('idle')
        })
    }
}