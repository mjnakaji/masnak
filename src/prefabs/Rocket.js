class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add to scene
        scene.add.existing(this);
        this.isFiring = false; // is it already going?
        this.moveSpeed = 2; // pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket');  // add rocket sfx
        this.sfxMiss = scene.sound.add('sfx_miss');  // add miss sfx (from Dragon Quest) (Copyright free...?) (It's just a few milliseconds so I should fine... right?)
    }

    update() {
        //if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - (borderUISize + this.width)) {
                this.x += this.moveSpeed;
            }
        //}

        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
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