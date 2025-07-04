import kaplay from "kaplay";

const k=kaplay({
  width: 1920,
  height: 1080,
  letterbox: true, //maintains aspect ratio
  background: [0,0,0],
  global: false,
  touchToMouse: true, //android support control
  buttons: {
    jump:{
      keyboard: ["space"],
      mouse: "left",
    }
  },
  debugKey: "*",
  debug: true,
});

export default k;