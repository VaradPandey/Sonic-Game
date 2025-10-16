import k from "../kaplayCtx";

k.loadSprite("bg","graphics/background.png")

function background(){
    const gameSpeed=460
    const initalHeight=-780

    const bgPieceWidth=1920
    const bgPieces=[
        k.add([
            k.sprite("bg"),
            k.pos(0,initalHeight),
            k.scale(2),
            k.opacity(0.8)
        ]),
        k.add([
            k.sprite("bg"),
            k.pos(1920,initalHeight),
            k.scale(2),
            k.opacity(0.8),
        ]),
    ]

    k.onUpdate(()=>{
        if(bgPieces[1].pos.x<0){
            bgPieces[0].moveTo(bgPieces[1].pos.x+bgPieceWidth*2,bgPieces[0].pos.y);
            bgPieces.push(bgPieces.shift());
        }

        bgPieces[0].move(-gameSpeed,0);
        bgPieces[1].moveTo(bgPieces[0].pos.x+bgPieceWidth*2,bgPieces[1].pos.y);
    });
    

}

export default background;