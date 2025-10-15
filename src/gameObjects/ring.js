import k from "../kaplayCtx";
import { gameState } from "../gameState";

k.loadSprite("ring","graphics/ring.png",{
    sliceX: 16,
    sliceY: 1,
    anims:{
      "spin": {
        from: 0,
        to: 15,
        loop: true,
        speed: 200,
      }
    }
});

export const ringState={
    bullet: 0,
};

let canFire=true;

export function fireRing(){
    if(!canFire || !gameState.sonic.isGrounded() || ringState.bullet==0){
        return;
    }

    ringState.bullet--;

    if(gameState.bulletCount){
        gameState.bulletCount.text=`Rings: ${ringState.bullet}`;
    }

    const direction=gameState.sonic.flipX?-1:1;

    const ring=k.add([
        k.sprite("ring",{anim: "spin"}),
        k.area(),
        k.anchor("center"),
        k.pos(gameState.sonic.pos.x+120*direction,k.height()/2+55),
        k.scale(3),
        k.move(k.vec2(20*direction,0),850),
        k.body({
        isStatic: true,
        }),
    ]);

    canFire=false;

    k.wait(0.3,()=>{ //async function
        canFire=true;
    });

    return ring;
}