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

        // set boost properties
        this.normalSpeed = 150; // Normal speed
        this.boostSpeed = 300; // Boost speed
        this.boostEnergy = 100; // Boost energy (max 100)
        this.boostRegenRate = 0.5; // Energy regenerated per frame
        this.boostConsumptionRate = 1; // Energy consumed per frame while boosting

        // initialize state machine managing hero (initial state, possible states, state args[])
        scene.rocketFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            // dash: new BoostState(),
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM
    }

    regenerateBoost() {
        if (this.boostEnergy < 100) {
            this.boostEnergy += this.boostRegenRate
            if (this.boostEnergy > 100) {
                this.boostEnergy = 100 // Cap boost energy at 100
            }
        }
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

        if(left.isDown || right.isDown) {
            this.stateMachine.transition('move')
            return
        }

        rocket.regenerateBoost()
    }
}

class MoveState extends State {
    execute(scene, rocket) {
        const { left, right, shift } = scene.keys

        // Handle boosting logic
        if (shift.isDown && rocket.boostEnergy > 0) {
            rocket.boostEnergy -= rocket.boostConsumptionRate;
            if (rocket.boostEnergy < 0) rocket.boostEnergy = 0 // Prevent negative energy

            // Set boosted velocity
            let moveDirection = new Phaser.Math.Vector2(0, 0);
            if (left.isDown) {
                moveDirection.x = -1
                rocket.direction = 'left'
            } else if (right.isDown) {
                moveDirection.x = 1
                rocket.direction = 'right'
            }
            moveDirection.normalize()
            rocket.setVelocity(rocket.boostSpeed * moveDirection.x, 0)
            rocket.anims.play(`boost-${rocket.direction}`, true)

        } else {
            // Regular movement logic
            if (left.isDown || right.isDown) {
                let moveDirection = new Phaser.Math.Vector2(0, 0)
                if (left.isDown) {
                    moveDirection.x = -1
                    rocket.direction = 'left'
                } else if (right.isDown) {
                    moveDirection.x = 1
                    rocket.direction = 'right'
                }
                moveDirection.normalize();
                rocket.setVelocity(rocket.rocketVelocity * moveDirection.x, 0)
                rocket.anims.play(`launch-${rocket.direction}`, true)
            } else {
                this.stateMachine.transition('idle')
                return
            }
        }

        // Regenerate boost energy when not boosting
        if (!shift.isDown && rocket.boostEnergy < 100) {
            rocket.boostEnergy += rocket.boostRegenRate
            if (rocket.boostEnergy > 100) rocket.boostEnergy = 100 // Cap at 100
        }
    }
}