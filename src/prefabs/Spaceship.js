class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, c, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = 3;
    }

    update() {
        this.x -= this.moveSpeed;
        if(this.x <= o - this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        
    }
}