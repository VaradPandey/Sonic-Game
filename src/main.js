import k from "./kaplayCtx";
import sonic from "./gameObjects/sonic";
import { fireRing,ringState } from "./gameObjects/ring";
import spawnBug from "./gameObjects/bug";
import gameOverScene from "./scene/gameOver";
import { playVideo } from "./utils/popup";

// SETUP
k.setGravity(1500);
spawnBug();


//MUSIC SETUPs
k.loadSound("bgm","sounds/bg.mp3");
k.loadSound("gameOver","sounds/vine.mp3")
k.loadSound("ring","sounds/ring.mp3")
k.loadSound("ringShoot","sounds/ringshoot.mp3")

let bgMusic=null;
let gameOver=null;
let ringGain=null;
let ringShoot=null;

let musicStarted=false;
let videoStarted=false;

k.onKeyPress(()=>{
  if(!musicStarted){
    bgMusic=k.play("bgm",{
      volume: 0.3,
      loop: true,
    });
    musicStarted=true;
  }
});

// GAME OVER SCENE
if(gameOver) gameOver.stop()

k.scene("game-over",(score)=>{
  if(bgMusic) bgMusic.stop();
  gameOver=k.play("gameOver",{
    volume: 0.2,
  })
  gameOverScene(score);
});

// PLATFORM
const platform=k.add([
  k.rect(k.width(),150),
  k.anchor("center"),
  k.pos(k.width() / 2,727),
  k.area(),
  k.body({ isStatic: true }),
]);

// CONTROLS
k.onKeyDown((key)=>{
  if(key==="d"){
    if(sonic.flipX) sonic.flipX=false;
    sonic.move(sonic.speed,0);
  } else if(key==="a"){
    if(!sonic.flipX) sonic.flipX=true;
    sonic.move(-sonic.speed,0);
  }
});

// UPDATE LOOP
let lastFrameGround=false;
k.onUpdate(()=>{
  if(!lastFrameGround && sonic.isGrounded()){
    sonic.totalJump=2;
    sonic.play("run");
  }
  lastFrameGround=sonic.isGrounded();
});

// JUMP
k.onKeyPress("space",()=>{
  if(sonic.totalJump>0){
    sonic.jump();
    sonic.play("jump");
    sonic.totalJump--;
  }
  console.log(sonic.totalJump);
});

// SCORE & BULLET DISPLAY
export const bulletCount=k.add([
  k.text("Rings: 0"),
  k.scale(2),
  k.pos(0,90),
]);

let counter=0;

const timer=k.add([
  k.text("0"),
  k.scale(2),
  k.pos(0,10),
]);

k.loop(0.9,()=>{
  counter++;
  timer.text=`Current Score: ${counter}`;
  if(counter%5===0){
    ringState.bullet++;
    ringGain=k.play("ring",{
      volume: 0.2,
    })
    bulletCount.text=`Rings: ${ringState.bullet}`;
  }
});

// Random video trigger
k.loop(2.0,()=>{
  if(counter>=40 && counter<=155&&!videoStarted){
    if(Math.random()<0.25){
      if(!videoStarted){
        if(bgMusic) bgMusic.stop();
        playVideo("videos/foxy.mp4",true,()=>{
          console.log("Video ended!");
        });
      }
      videoStarted=true;
    }
  }
});


// SHOOT LOGIC
k.onKeyPress("l",()=>{
  const ring=fireRing();
  if(ring){
    ring.onCollide("bug",(bug)=>{
      bug.destroy();
      ring.destroy();
    });
    ringShoot=k.play("ringShoot",{
      volume: 0.3,
    })
  }
});

// GAME OVER CONDITIONS
sonic.onCollide("bug",()=>{
  k.shake();
  sonic.destroy();
  k.go("game-over",counter);
});

sonic.onExitScreen(()=>{
  k.shake();
  sonic.destroy();
  k.go("game-over",counter);
});

// REFRESH
k.onKeyDown((key)=>{
  if(key.toLowerCase()==="r"){
    window.location.reload();
  }
});
