export const sounds = {
  select: new Audio("./assets/audio/cowabunga.mp3"),
  win: new Audio("./assets/audio/win.mp3"),
};

export function playSound(name) {
  if (sounds[name]) {
    sounds[name].currentTime = 0;
    sounds[name].play();
  }
}
