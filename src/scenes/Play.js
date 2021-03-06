class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        game.settings.beam = true;
        this.gameOver = false;

        this.add.text(20, 20, "Rocket Patrol Play");

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);

        // green UI Background
        this.add.rectangle(0, borderUISize + borderPadding,
            game.config.width,
            borderUISize * 2, 0x00FF00).setOrigin(0,0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);

        this.p1Rocket = new Rocket(this,
            game.config.width / 2,
            game.config.height - (borderUISize + borderPadding),
            'rocket').setOrigin(0.5, 0);
        if(game.settings.multi) { // multiplayer enabled, added new class Rocket2 because they have different controls
            this.p2Rocket = new Rocket2(this,
                game.config.width / 2,
                game.config.height - (borderUISize + borderPadding),
                'rocket').setOrigin(0.5, 0);
        }
        // add spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0,0);

        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // I looked up some Phaser keycodes to assign the correct values

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30});
        
        this.p1Score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5, bottom: 5
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);



        // clock: 60 seconds
        // ignore this, I did not implement a timer
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or (M) for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        this.sound.play('sfx_bass');
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5, bottom: 5
            },
            fixedWidth: 100
        }
        this.timer = game.settings.gameTimer;
        this.timeRight = this.add.text(borderUISize + borderPadding * 40, borderUISize + borderPadding * 2, this.timer, timeConfig);
    }

    update() {
        // also ignore this too, I did not implement a timer here as well
        //this.timer += delta_lag;
        //while(this.timer > 1000) {
        //    this.resources += 1;
        //    this.timer -= 1000;
        //}
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start("playScene");
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        if(!this.gameOver) {
            this.p1Rocket.update();
            if(game.settings.multi) { // multiplayer option
                this.p2Rocket.update();
            }
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        // beam that demolishes everything on screen
        if(game.settings.beam && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.shipExplode(this.ship01);
            this.shipExplode(this.ship02);
            this.shipExplode(this.ship03);
            game.settings.beam = false;
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            // this.ship03.reset();
            // console.log("kaboom ship 03");
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            // this.ship02.reset();
            // console.log("kaboom ship 02");
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            // this.ship01.reset();
            // console.log("kaboom ship 01");
        }
        if(game.settings.multi) {
            if(this.checkCollision(this.p2Rocket, this.ship03)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship03);
                // this.ship03.reset();
                // console.log("kaboom ship 03");
            }
            if(this.checkCollision(this.p2Rocket, this.ship02)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship02);
                // this.ship02.reset();
                // console.log("kaboom ship 02");
            }
            if(this.checkCollision(this.p2Rocket, this.ship01)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship01);
                // this.ship01.reset();
                // console.log("kaboom ship 01");
            }
        }
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true;
        }
        return false;
    }

    shipExplode(ship) {
        ship.alpha = 0; // hide the ship
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        this.sound.play('sfx_explosion');
        this.sound.play('sfx_manscream');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        // add score and repaint score display
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
    }
}