import k from "./kaplayCtx";
import introScene from "./scene/intro";
import gameplayScene from "./scene/gamePlay";
import gameOverScene from "./scene/gameOver";

k.scene("intro",introScene);
k.scene("gameplay",gameplayScene);
k.scene("gameover",gameOverScene);

k.go("intro");
