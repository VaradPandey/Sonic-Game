import k from "../kaplayCtx";
import { fireRing,ringState } from "../gameObjects/ring";
import spawnBug from "../gameObjects/bug";
import { playVideo } from "../utils/popup";
import { gameState } from "../gameState";
import { createSonic } from "../gameObjects/sonic";
import background from "../gameObjects/background";
import platform from "../gameObjects/platform";

export default function gameplayScene(){
    // SETUP
    k.setGravity(1500);
    background();
    platform();
    spawnBug();
    gameState.sonic=createSonic();
    ringState.bullet=0;

    // SOUNDS
    k.loadSound("bgm","sounds/bg.mp3");
    k.loadSound("gameOver","sounds/vine.mp3");
    k.loadSound("ring","sounds/ring.mp3");
    k.loadSound("ringShoot","sounds/ringshoot.mp3");

    let bgMusic=null;

    let musicStarted=false;
    let videoStarted=false;
    

    // Start music when first key pressed
    k.onKeyPress(()=>{
        if(!musicStarted){
        bgMusic=k.play("bgm",{ volume: 0.3,loop: true });
        musicStarted=true;
        }
    });

    // CONTROLS
    k.onKeyDown((key)=>{
    if(key==="d"){
        if(gameState.sonic.flipX) gameState.sonic.flipX=false;
        gameState.sonic.move(gameState.sonic.speed,0);
    }else if(key==="a"){
        if(!gameState.sonic.flipX) gameState.sonic.flipX=true;
        gameState.sonic.move(-gameState.sonic.speed,0);
    }
    });

    // JUMP
    k.onKeyPress("space",()=>{
    if(gameState.sonic.totalJump > 0){
        gameState.sonic.jump();
        gameState.sonic.play("jump");
        gameState.sonic.totalJump--;
    }
    });

    // SCORE & RINGS
    const bulletCount=k.add([
        k.text("Rings: 0"),
        k.scale(2),
        k.pos(0,90)
    ]);

    gameState.bulletCount=bulletCount;

    let counter=0;

    const timer=k.add([
        k.text("Score: 0"),
        k.scale(2),
        k.pos(0,10)
    ]);

    k.loop(0.9,()=>{
    counter++;
        timer.text=`Score: ${counter}`;
        if(counter%5===0){
            ringState.bullet++;
            k.play("ring",{ volume: 0.2 });
            bulletCount.text=`Rings: ${ringState.bullet}`;
        }
    });

    // VIDEO RANDOM TRIGGER
    k.loop(6.4,()=>{
        if(counter>=20 && !videoStarted){
            if(Math.random()<0.17){
                if(bgMusic) bgMusic.stop();
                playVideo("videos/foxy.mp4",true,()=>{
                    console.log("Video ended!");
                    videoStarted=false;
                    if(bgMusic) bgMusic.play();
                });
            videoStarted=true;
            }
        }
    });

    // SHOOT
    k.onKeyPress("l",()=>{
        const ring=fireRing();
        if(ring){
            ring.onCollide("bug",(bug)=>{
            bug.destroy();
            ring.destroy();
            });
            k.play("ringShoot",{ volume: 0.3 });
        }
    });

    // GAME OVER
    const handleGameOver=(score)=>{
        k.shake();

        if(bgMusic){
            bgMusic.stop();
            bgMusic=null;
        }
        if(gameState.sonic){
            gameState.sonic.destroy();
        }

        k.play("gameOver",{volume: 0.5})

        k.go("gameover",score);
    };

    // Collisions
    gameState.sonic.onCollide("bug",()=>{
        handleGameOver(counter);
    });

    gameState.sonic.onExitScreen(()=>{
        handleGameOver(counter);
    });
}
