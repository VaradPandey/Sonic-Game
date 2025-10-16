import k from "../kaplayCtx";
import { gameState } from "../gameState";

k.loadSprite("platform","graphics/platform.png");

export default function createPlatform(){
    const gameSpeed=460;
    const platformHeight=150;
    const platformWidth=k.width();
    const initialY=727 - platformHeight/2;

    const colliders=[
        k.add([
            k.rect(platformWidth,platformHeight),
            k.anchor("center"),
            k.pos(platformWidth/2,727),
            k.area(),
            k.body({ isStatic: true }),
        ]),
        k.add([
            k.rect(platformWidth,platformHeight),
            k.anchor("center"),
            k.pos(platformWidth+platformWidth/2,727),
            k.area(),
            k.body({ isStatic: true }),
        ]),
    ];

    const visuals=[
        k.add([
            k.sprite("platform"),
            k.pos(0,initialY),
            k.anchor("topleft"),
            k.scale(2),
        ]),
        k.add([
            k.sprite("platform"),
            k.pos(platformWidth,initialY),
            k.anchor("topleft"),
            k.scale(2),
        ]),
    ];

    let lastFrameGround=false;

    k.onUpdate(()=>{
        if(visuals[1].pos.x<0){
            visuals[0].moveTo(visuals[1].pos.x+platformWidth*2,visuals[0].pos.y);
            visuals.push(visuals.shift());
        }

        visuals[0].move(-gameSpeed,0);
        visuals[1].moveTo(visuals[0].pos.x+platformWidth*2,visuals[1].pos.y);

        if(gameState.sonic){
            if(!lastFrameGround && gameState.sonic.isGrounded()){
                gameState.sonic.totalJump=2;
                gameState.sonic.play("run");
            }
            lastFrameGround=gameState.sonic.isGrounded();
        }
    });
}