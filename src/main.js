import k from "./kaplayCtx";
import sonic from "./gameObjects/sonic";
import { fireRing,ringState } from "./gameObjects/ring";
import spawnBug from "./gameObjects/bug";
import gameOverScene from "./scene/gameOver";

//SETUP
k.setGravity(1500);

spawnBug();

k.scene("game-over",(score)=>{
  gameOverScene(score);
});

const platform=k.add([
  k.rect(k.width(),150),
  k.anchor("center"),
  k.pos(k.width()/2,727),
  k.area(),
  k.body({
    isStatic: true,
  }),
])

//CONTROLS
k.onKeyDown((key)=>{
  if(key=='d'){
    if(sonic.flipX){
      sonic.flipX=false;
    }
    sonic.move(sonic.speed,0);
  }
  else if(key=='a'){
    if(!sonic.flipX){
      sonic.flipX=true;
    }
    sonic.move(-sonic.speed,0);
  }
});

let lastFrameGround=false;
k.onUpdate(()=>{
  if(!lastFrameGround && sonic.isGrounded()){
    sonic.totalJump=2;
    sonic.play("run");
  }
  lastFrameGround=sonic.isGrounded();
})

k.onKeyPress("space",()=>{
  if(sonic.totalJump>0){
      sonic.jump();
      sonic.play("jump");
      sonic.totalJump--;
  }
  console.log(sonic.totalJump);
})

//SCORE & BULLET DISPLAY

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
  if(counter%5==0){
    ringState.bullet++;
    bulletCount.text=`Rings: ${ringState.bullet}`;
  }
});

//COLLIDE LOGIC
k.onKeyPress("l",()=>{
  const ring=fireRing();
  if(ring){
    ring.onCollide("bug",(bug)=>{
      bug.destroy();
      ring.destroy();
    });
  }

});

//GAME OVER SCREEN

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