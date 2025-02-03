class Load extends Phaser.Scene {
    constructor(){
        super('loadScene')
    }

    preload(){
        this.load.path = './assets'
        this.load.image('rocket', 'rocket.png')
    }

    create() {
        // if(window.localStorage) {
        //     console.log('Local storage supported')
        // } else {
        //     console.log('Local storage not supported')
        // }

        // go to Play scene
        this.scene.start('playScene')
    }
}