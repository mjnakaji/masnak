class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    init() {}
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('sfx_miss', './assets/DragonQuestMiss.wav');
        this.load.audio('sfx_manscream', './assets/man_scream.wav');
        this.load.audio('sfx_chin', './assets/chin.wav');
        this.load.audio('sfx_Menu', './assets/Night_Theme.wav');
        this.load.audio('sfx_bass', './assets/bassdrum.wav');
    }
    create() {
        this.sound.play('sfx_Menu');
        // this.add.text(20, 20, "Rocket Patrol Menu");
        // this.scene.start("playScene");
        game.settings = {
            invert: false
        }
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    }
    update() {
        if(game.settings.invert) {
            let menuConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#0C4EBE',
                color: '#7BC9FA',
                align: 'right',
                padding: {
                    top: 5, bottom: 5
                },
                fixedWidth: 0
            }
            this.add.text(game.config.width / 2, game.config.height / 4 - (borderUISize + borderPadding) * 2.5, 'ROCKET PATROL',
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 4 - (borderUISize + borderPadding) * 1.5, 'P1 Use <- -> to move & ^ to fire',
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 4 - (borderUISize + borderPadding) * 0.5, 'P2 Use A D to move & W to fire',
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 4 + (borderUISize + borderPadding) * 0.5, 'Push SPACE to demolish ALL enemies',
            menuConfig).setOrigin(0.5);

            menuConfig.backgroundColor = "#FF00FF";
            menuConfig.color = "#FFF";

            this.add.text(game.config.width / 2, game.config.height / 2 - (borderUISize + borderPadding), 'Press <- of Novice or -> for Expert',
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2, '(Single Player)',
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + (borderUISize + borderPadding), 'Press A of Novice or D for Expert',
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + (borderUISize + borderPadding) * 2, '(Two Player Co-op)',
            menuConfig).setOrigin(0.5);

            menuConfig.backgroundColor = "#0000FF";
            menuConfig.color = "#FFF";
            this.add.text(game.config.width / 2, game.config.height / 2 + (borderUISize + borderPadding) * 4, 'Press I to invert menu',
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + (borderUISize + borderPadding) * 5, 'Press O to revert to original',
            menuConfig).setOrigin(0.5);
        } else {
            let menuConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'right',
                padding: {
                    top: 5, bottom: 5
                },
                fixedWidth: 0
            }
            this.add.text(game.config.width / 2, game.config.height / 4 - (borderUISize + borderPadding) * 2.5, 'ROCKET PATROL',
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 4 - (borderUISize + borderPadding) * 1.5, 'P1 Use <- -> to move & ^ to fire',
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 4 - (borderUISize + borderPadding) * 0.5, 'P2 Use A D to move & W to fire',
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 4 + (borderUISize + borderPadding) * 0.5, 'Push SPACE to demolish ALL enemies',
            menuConfig).setOrigin(0.5);

            menuConfig.backgroundColor = "#00FF00";
            menuConfig.color = "#000";

            this.add.text(game.config.width / 2, game.config.height / 2 - (borderUISize + borderPadding), 'Press <- of Novice or -> for Expert',
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2, '(Single Player)',
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + (borderUISize + borderPadding), 'Press A of Novice or D for Expert',
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + (borderUISize + borderPadding) * 2, '(Two Player Co-op)',
            menuConfig).setOrigin(0.5);

            menuConfig.backgroundColor = "#FFFF00";
            menuConfig.color = "#000";
            this.add.text(game.config.width / 2, game.config.height / 2 + (borderUISize + borderPadding) * 4, 'Press I to invert menu',
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + (borderUISize + borderPadding) * 5, 'Press O to revert to original',
            menuConfig).setOrigin(0.5);
        }
        if(Phaser.Input.Keyboard.JustDown(keyI)) {
            game.settings = {
                invert: true
            }
            this.sound.play('sfx_select');
        }
        if(Phaser.Input.Keyboard.JustDown(keyO)) {
            game.settings = {
                invert: false
            }
            this.sound.play('sfx_select');
        }
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                multi: false
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                multi:false
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyA)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                multi: true
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyD)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                multi: true
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}