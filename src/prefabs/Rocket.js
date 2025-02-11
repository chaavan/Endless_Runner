class Rocket extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction){
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add Rocket to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        this.body.setSize(this.width / 2 - 3, this.height / 2 + 28)
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
            explode: new ExplodeState(),
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
        rocket.anims.play(`launch`)
        // rocket.anims.stop()
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
    enter(scene, rocket){
        rocket.isBoosting = false
    }

    execute(scene, rocket) {
        const { left, right, shift } = scene.keys

        let isMoving = left.isDown || right.isDown

        // Handle boosting logic
        if (shift.isDown && rocket.boostEnergy > 0 && isMoving) {
            rocket.boostEnergy -= rocket.boostConsumptionRate;
            if (rocket.boostEnergy < 0) rocket.boostEnergy = 0 // Prevent negative energy

            if (!rocket.isBoosting) {
                if(rocket.isBoosting){
                    rocket.boostSound.stop()
                }
                rocket.boostSound = scene.sound.add('boostAudio', { loop: false, volume: 0.8 })
                rocket.boostSound.play()
                rocket.isBoosting = true
            }

            // Set boosted velocity
            if (left.isDown || right.isDown) {
                let moveDirection = new Phaser.Math.Vector2(0, 0)
                if (left.isDown) {
                    moveDirection.x = -1
                    rocket.direction = 'left'
                    rocket.setAngle(-20)
                } else if (right.isDown) {
                    moveDirection.x = 1
                    rocket.direction = 'right'
                    rocket.setAngle(20)
                }
                moveDirection.normalize()
                rocket.setVelocity(rocket.boostSpeed * moveDirection.x, 0)
                rocket.anims.play(`boost`, true)
            } else {
                rocket.setAngle(0)
                this.stateMachine.transition('idle')
                return
            }

        } else {
            if (rocket.isBoosting) {
                if (rocket.boostSound && rocket.boostSound.isPlaying) {
                    rocket.boostSound.stop()
                }
                rocket.isBoosting = false
            }

            // Regular movement logic
            if (isMoving) {
                let moveDirection = new Phaser.Math.Vector2(0, 0)
                if (left.isDown) {
                    moveDirection.x = -1
                    rocket.direction = 'left'
                    rocket.setAngle(-10)
                } else if (right.isDown) {
                    moveDirection.x = 1
                    rocket.direction = 'right'
                    rocket.setAngle(10)
                }
                moveDirection.normalize();
                rocket.setVelocity(rocket.rocketVelocity * moveDirection.x, 0)
                rocket.anims.play(`launch`, true)
            } else {
                rocket.setAngle(0)
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

class ExplodeState extends State {
    enter(scene, rocket) {
        // Stop all movement
        rocket.setVelocity(0)
        rocket.setVisible(false) // Hide the rocket

        if (rocket.isBoosting) {
            if (rocket.boostSound && rocket.boostSound.isPlaying) {
                rocket.boostSound.stop()
            }
            rocket.isBoosting = false
        }

        // Destroy all asteroids
        scene.asteroids.children.iterate((ast) => {
            if (ast) ast.destroy()
        });

        scene.asteroids.clear(true, true)

        // Play explosion animation
        let explosion = scene.add.sprite(rocket.x, rocket.y, 'explosion').setScale(1.75)
        explosion.play('explode')

        // Transition to Game Over after explosion animation
        explosion.on('animationcomplete', () => {
            scene.time.delayedCall(300, ()=>{
                explosion.destroy()
                scene.scene.start('GameOverScene', { score: scene.score })
            })
        })
    }
}