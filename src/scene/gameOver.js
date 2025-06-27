import k from "../kaplayCtx";
function gameOverScene(counter){
    k.shake(),
    k.add([
        k.text(`GAME OVER BUDDY\nSCORE: ${counter}`),
        k.anchor("center"),
        k.pos(k.center()),
        k.scale(5),
    ])
}

export default gameOverScene;