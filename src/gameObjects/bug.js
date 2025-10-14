import k from "../kaplayCtx";

k.loadSprite("bug","graphics/motobug.png",{
    sliceX: 5,
    sliceY: 1,
    anims: {
      "slide": {
        from: 0,
        to: 4,
        loop: true,
        speed: 200,
      }
    }
});
function spawnBug(){
    k.add([
      k.sprite("bug"),
      k.scale(2),
      k.anchor("center"),
      k.area({
        shape: new k.Rect(k.vec2(-5,0),40,28),
      }),
      k.pos(k.width()/2+940,k.height()/2+80),
      k.body({
        isStatic: true,
      }),
      k.move(k.vec2(-1,0),1000),
      "bug",
      k.offscreen(),
    ])
  
    k.wait(k.rand(0.5,1.6),()=>{
      spawnBug();
    });
}

export default spawnBug;