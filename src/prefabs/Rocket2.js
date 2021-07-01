class Rocket2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add to scene
        scene.add.existing(this);
        this.isFiring = false; // is it already going?
        this.moveSpeed = 2; // pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket');  // add rocket sfx
        this.sfxMiss = scene.sound.add('sfx_chin');  // add miss sfx
    }
    
    preload() {
        this.load.audio('sfx_miss', './assets/DragonQuestMiss.wav');
    }
    update() {
        //if(!this.isFiring) { // comment to remove immobileness after firing
            if(keyA.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyD.isDown && this.x <= game.config.width - (borderUISize + this.width)) {
                this.x += this.moveSpeed;
            }
        //}

        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            if(!this.isFiring) {
                this.sfxRocket.play();
            }
            this.isFiring = true;
        }
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.sfxMiss.play();
            this.isFiring = false;
            this.reset();
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - (borderUISize + borderPadding);
    }
}