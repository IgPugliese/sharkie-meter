
let playSound1 = false
const audioSrc1 = './sharkieSound1.aac'
const audioSrc2 = './sharkieSound2.aac'

sharkieIdle = document.getElementById("sharkie-idle");
sharkieClick = document.getElementById("sharkie-click");
sharkieIdle.onclick = function changeGif() {
  sharkieIdle.src = "./animation-click.gif";
  var audio = playSound1 ?  new Audio(audioSrc1) : new Audio(audioSrc2);
  playSound1 = !playSound1
  audio.play();
  setTimeout(()=>{sharkieIdle.src = "./animation-idle.gif"},1600);
};

document.onkeydown = (e) => {
  if (e.ctrlKey)
    sharkieIdle.classList.add("draggable");
}

document.onkeyup = () => {
  sharkieIdle.classList.remove("draggable");

}