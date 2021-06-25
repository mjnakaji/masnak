class Rocket extends Phaser.Gameobjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add to scene
        scene.add.existing(this);
        this.isFiring = false; // is it already going?
        this.moveSpeed = 2; // pixels per frame
    }

    update() {
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && thisx <= game.config.width - (borderUISize + ___)) {
                this.x += this.moveSpeed;
            }
        }

        if (Phase.Input.Keyboard.JustDown) {

        }
    }
}