import k from "../kaplayCtx";

export default function introScene(){
    k.add([
        k.text(`SONIC 67`),
        k.anchor("center"),
        k.pos(k.center()),
        k.scale(5),
    ])

    k.add([
        k.text(`Press SPACE to start`),
        k.anchor("center"),
        k.pos(k.width()/2, k.height()/2+150),
        k.scale(1.5),
    ]);

  k.onKeyPress("space",()=>{
    k.go("gameplay");
  });
}