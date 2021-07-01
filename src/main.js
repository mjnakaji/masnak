/*

Name: Masateru Nakajima
Project Title: Modded Rocket Patrol
Date: July 1st, 2021
How long it took to complete the whole project: nearly a week including the tutorial

Point Breakdown:
    20 pts - Finishing the Tutorial
    30 pts - Implement a simultaneous two-player mode
    20 pts - Create and implement a new weapon (w/ new behavior and graphics)
                I created a beam that triggers with a space bar that demolishes everything on screen
    5 pts  - Allow the player to control the Rocket after it's fired
    5 pts  - Add your own (copyright-free) background music to the Play scene

    20 pts(?) - Create new title screen, but extra
                    The user is able to alternate the title screen with opposite colors in the color wheel
    10 pts(?) - Added even more sound effects in the case of impact and action
    5 pts(?)  - Bug fix: Disabled rapid fire sound while in the shooting animation


I am certain that all the work done here is my own, except for the professor's code shown in lecture.

*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyR, keyLEFT, keyRIGHT, keyUP, keyA, keyD, keyW, keyI, keyO, keySPACE, keyM;