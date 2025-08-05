let mic;
let threshold = 0.15; // 音量のしきい値（0〜1）
let lastTriggerTime = 0;
let cooldown = 3000; // ミリ秒（3秒間隔）
let laughSounds = [];
let laughFiles = ["laugh1.mp3", "laugh2.mp3"]; // 用意した音声ファイル名

function preload() {
  for (let file of laughFiles) {
    laughSounds.push(loadSound(file));
  }
}

function setup() {
  createCanvas(300, 200);
  mic = new p5.AudioIn();
  mic.start();
  userStartAudio(); // iOS対応のため必要
  background(0);
  textSize(16);
  fill(255);
}

function draw() {
  background(0);
  let vol = mic.getLevel();
  let now = millis();

  text("Volume: " + vol.toFixed(3), 10, height / 2);

  if (vol > threshold && now - lastTriggerTime > cooldown) {
    let sound = random(laughSounds);
    sound.setVolume(1.0); // 再生開始時は最大音量
    sound.play();

    // volに応じてフェード時間を変える（例：0.1〜0.5のvolで1〜3秒）
    let fadeDuration = map(vol, 0.1, 0.5, 1, 3);
    fadeDuration = constrain(fadeDuration, 1, 3);

    sound.setVolume(0, fadeDuration); // フェードアウト処理

    lastTriggerTime = now;
    console.log("笑いトリガー発動（フェード: " + fadeDuration + "秒）");
  }
}

