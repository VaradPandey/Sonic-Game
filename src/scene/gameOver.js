import k from "../kaplayCtx";
function gameOverScene(counter){
    k.shake(),
    k.add([
        k.text(`GAME OVER BUDDY\nSCORE: ${counter}`),
        k.anchor("center"),
        k.pos(k.center()),
        k.scale(5),
    ])

    k.add([
        k.text(`Press R to restart`),
        k.anchor("center"),
        k.pos(k.width()/2, k.height()/2+280),
        k.scale(2),
    ]);

    // RESTART
    k.onKeyPress("r",()=>{
        k.go("gameplay");
    });
}

export default gameOverScene;