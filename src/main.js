

let arrTechs = [
  { tech: "html", path: "../imgs/html.png" },
  { tech: "css", path: "../imgs/css.png" },
  { tech: "javascript", path: "../imgs/javascript.png" },
  { tech: "typescript", path: "../imgs/typescript.png" },
  { tech: "vuejs", path: "../imgs/vue.png" },
  { tech: "react", path: "../imgs/react.png" },
  { tech: "Next", path: "../imgs/Next.js.png" },
  { tech: "PHP", path: "../imgs/php.png" },
  { tech: "mySQL", path: "../imgs/mysql.png" },
  { tech: "Laravel", path: "../imgs/laravel.png" }
];


let gameContainer = document.querySelector(".game-container");

arrTechs.forEach((item) => {
  for (let i = 0; i < 2; i++) {
    let div = document.createElement("div");
    div.className = "game-block";
    div.setAttribute("data-tech", item.tech);
    div.innerHTML = `
        <div class="face front"></div>
        <div class="face back">
          <img style="width: 80px; height: fit ;" src="${item.path}" alt="${item.tech}">
        </div>
      `;
    gameContainer.appendChild(div);
  }
});
let timerInterval;
let duration = 1000;
const controlButton = document.querySelector(".control-buttons button");
controlButton.onclick = function () {
    let yourName = prompt("Whats your Name?");
    if (yourName == null || yourName == '') document.querySelector(".name span").innerHTML = "unKnown";
    else document.querySelector(".names span").innerHTML = yourName;
    document.querySelector('.control-buttons').remove();
    let seconds = 0;
    timerInterval = setInterval(() => {
      seconds++;
      document.querySelector(".timer span").textContent = seconds;
    }, 1000);
}

let blocksContainer = document.querySelector(".game-container");
let blocks = Array.from(blocksContainer.children);
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", function () {
    flipBlock(block);
  });
});
function flipBlock(selectedBlock) {

    selectedBlock.classList.add('flipped');
  
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('flipped'));
  
    if (allFlippedBlocks.length === 2) {
  
  
      stopClicking();
  
      checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  
    }
  
  }
  function stopClicking() {
    blocksContainer.classList.add("no-clicking");

    setTimeout(() => {
      blocksContainer.classList.remove("no-clicking");
    }, duration);
  }
  
  function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
      firstBlock.classList.remove("flipped");
      secondBlock.classList.remove("flipped");

      firstBlock.classList.add("has-match");
      secondBlock.classList.add("has-match");

      document.getElementById("success").play();

      let matchedBlocks = blocks.filter((block) =>
        block.classList.contains("has-match")
      );
      if (matchedBlocks.length === blocks.length) {
        const restartContainer = document.querySelector(".restart-buttons");
        const restartButton = document.querySelector(
          ".restart-buttons .restart"
        );
        const exitButton = document.querySelector(".restart-buttons .exit");
          clearInterval(timerInterval);
          
        // أظهر نافذة الخيارات
        restartContainer.style.display = 'flex';

        // عند الضغط على زر الإعادة
        restartButton.onclick = function () {
          // خلط الكروت
          shuffle(orderRange);
          blocks.forEach((block, index) => {
            block.classList.remove("flipped", "has-match");
            block.style.order = orderRange[index];
          });
          document.querySelector(".timer span").textContent = 0;
            let seconds = 0;
          timerInterval = setInterval(() => {
            seconds++;
            document.querySelector(".timer span").textContent = seconds;
          }, 1000);
          // إخفاء الزر مرة أخرى
          restartContainer.style.display = 'none';
            triesElement.innerHTML = 0;
        };

        // عند الضغط على زر الخروج
        exitButton.onclick = function () {
            document.getElementById('niga').play(); 
            alert("HAHAHAHHAHA");
            // أو أي مسار تريده
        };
      }
      
    } else {
      triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

      setTimeout(() => {
        firstBlock.classList.remove("flipped");
        secondBlock.classList.remove("flipped");
      }, duration);

      document.getElementById("fail").play();
    }
  }
  
  function shuffle(array) {
    // Settings Vars
    let current = array.length,
      temp,
      random;

    while (current > 0) {
      random = Math.floor(Math.random() * current);

      current--;

      temp = array[current];

      array[current] = array[random];

      array[random] = temp;
    }
    return array;
  }