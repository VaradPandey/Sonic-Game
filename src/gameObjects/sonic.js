import k from "../kaplayCtx";

k.loadSprite("sonic","graphics/sonic.png",{
    sliceX: 8,
    sliceY: 2,
    anims:{
        "run": {
          from: 0,
          to: 7,
          loop: true,
          speed: 30,
        },
        "jump": {
          from: 8,
          to: 15,
          loop: true,
          speed: 30,
        }
    },
});

export function createSonic(){

  const sonic=k.add([
      k.sprite("sonic",{
        anim: "run",
        flipX: false
      }),
      k.area({
        shape: new k.Rect(k.vec2(0,3),40,42),
      }),
      k.anchor("center"),
      k.scale(5,5),
      k.pos(400,532),
      k.body(),
      {
        speed:350,
        totalJump: 2,
      },
      k.offscreen(),
  ]);

  return sonic;
  
}