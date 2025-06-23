// Variáveis principais e de cena
let button;
let farmerImg, fundoPlantacao, fundoFazenda, novoFundoHorta, fundoHortaDeCima, fundoAtual;
let animando = false, pulsos = 0;
let mostrarBalao = false, mostrarFazendeiroAgora = false;
let falaAtual = 0, trocarCena = false;
let tamanhoFazendeiro = 200;
let pontos = 0; // Inicia em 0

// Arrays e imagens opcionais
let tomates = [], tomateImg;
let alfaces = [], alfaceImg;
let cenouras = [], cenouraImg;
let beterrabas = [], beterrabaImg;

// Imagens dos botões do menu
let paImg, pacoteImg, regadorImg;

// Imagens do buraco e da semente
let holeImg, seedImg;
let holes = [];       // Armazena os buracos cavados
let seeds = [];       // Armazena as sementes plantadas
let waterEffects = []; // Armazena os efeitos de rega (água)

// Efeito hover e seleção dos slots do menu
let menuSquareScales = [1, 1, 1];
let darkenedSquare = -1; // (0: Pá, 1: Sementes, 2: Regador; -1 = nenhum)
let labelStartTime = 0;

// Variáveis de aviso (mensagens de erro)
let warningMessage = "";
let warningStartTime = 0;

let frasesHorta = [
  "Essa é a minha horta.",
  "Aqui eu cultivo vários\nalimentos que depois eu\nvendo para a cidade.",
  "Estou com um canteiro\nvazio e preciso da sua\najuda para plantar nele,\nvocê pode me ajudar?"
];
let falaHortaAtual = 0;
let mostrarBalaoHorta = false;
let frases = [
  "Olá!\nBem vindo (a) à\nminha fazenda.",
  "Vamos explorar esse\nlugar para você\nconhecer mais sobre\no campo.",
  "Siga-me."
];

// Função auxiliar para escurecer uma cor (multiplica os valores RGB por 0.8)
function darkenColor(col) {
  return [floor(col[0] * 0.8), floor(col[1] * 0.8), floor(col[2] * 0.8)];
}

function preload() {
  farmerImg = loadImage("https://bing.com/th/id/BCO.734f9fe1-eaef-46dc-8004-e8a74968f109.png");
  fundoPlantacao = loadImage("https://bing.com/th/id/BCO.86f92573-1118-468e-a004-b4cfb87ad046.png");
  fundoFazenda = loadImage("https://bing.com/th/id/BCO.7a92748a-7b68-422e-85de-eb765bc33fbe.png");
  novoFundoHorta = loadImage("https://bing.com/th/id/BCO.5c9d927b-48b3-4422-ba62-37c0e99ebfd6.png");
  fundoHortaDeCima = loadImage("https://bing.com/th/id/BCO.0e260cf2-752e-4525-8bff-5d97bb2be2a3.png");
  tomateImg = loadImage("https://bing.com/th/id/BCO.66826c2e-f493-44bc-8327-02f85de17a50.png");
  alfaceImg = loadImage("https://bing.com/th/id/BCO.3e4212db-22a0-46ff-8999-f489b4278e89.png");
  cenouraImg = loadImage("https://bing.com/th/id/BCO.5d1d0a93-9b3e-46d9-a6d3-09240413127d.png");
  beterrabaImg = loadImage("https://bing.com/th/id/BCO.4322fd4c-869f-4ed8-89c8-6f713337d829.png");
  
  // Imagens dos slots do menu
  paImg = loadImage("https://bing.com/th/id/BCO.b06d6be2-84ee-4c75-acc3-2c4cc7cdd12f.png");
  pacoteImg = loadImage("https://bing.com/th/id/BCO.925d3e28-4936-498c-ac0b-3de6c3c0ec67.png");
  regadorImg = loadImage("https://bing.com/th/id/BCO.9d0b29e2-ce87-49e1-b3c8-eb28e4c22dce.png");
  
  // Imagem do buraco e da semente
  holeImg = loadImage("https://bing.com/th/id/BCO.8047aa47-97fd-4e5e-9511-d1b0d646e488.png");
  seedImg = loadImage("https://bing.com/th/id/BCO.35cf0742-c493-4f16-b8ff-0a012eed8aae.png");
}

function setup() {
  createCanvas(600, 600);
  fundoAtual = fundoPlantacao;
  imageMode(CORNER);
  image(fundoAtual, 0, 0, width, height);
  
  button = createButton("START");
  button.style("font-size", "36px");
  button.style("font-family", "Comic Sans MS, cursive");
  button.style("color", "#fff8dc");
  button.style("background", "linear-gradient(145deg, #f56c42, #e4461f)");
  button.style("border", "4px solid #8b2c10");
  button.style("border-radius", "30px");
  button.style("padding", "30px 70px");
  button.style("box-shadow", "4px 4px 0px #4d1b0b");
  button.position(width / 2 - 140, height / 2 - 60);
  
  button.mouseOver(() => button.style("transform", "scale(1.1)"));
  button.mouseOut(() => button.style("transform", "scale(1)"));
  button.mousePressed(() => {
    if (!animando) {
      animando = true;
      pulsos = 0;
      pulseAnimation();
    }
  });
}

function pulseAnimation() {
  if (pulsos < 2) {
    button.style("transform", "scale(1.25)");
    setTimeout(() => {
      button.style("transform", "scale(1)");
      setTimeout(() => {
        pulsos++;
        pulseAnimation();
      }, 300);
    }, 300);
  } else {
    button.hide();
    fundoAtual = fundoFazenda; // Usa o fundo da fazenda
    setTimeout(() => {
      mostrarFazendeiroAgora = true;
      mostrarBalao = true;
      redraw();
      apresentarFalas();
    }, 300);
  }
}

function apresentarFalas() {
  setTimeout(() => {
    falaAtual++;
    redraw();
    setTimeout(() => {
      falaAtual++;
      redraw();
      setTimeout(() => {
        mostrarBalao = false;
        fundoAtual = novoFundoHorta;
        tamanhoFazendeiro = 260;
        mostrarFazendeiroAgora = true;
        trocarCena = true;
        redraw();
        setTimeout(() => {
          mostrarBalaoHorta = true;
          falaHortaAtual = 0;
          redraw();
          mostrarProximaFalaHorta();
        }, 2000);
      }, 2000);
    }, 4000);
  }, 3000);
}

function mostrarProximaFalaHorta() {
  if (falaHortaAtual === 0) {
    setTimeout(() => {
      falaHortaAtual++;
      redraw();
      mostrarProximaFalaHorta();
    }, 3000);
  } else if (falaHortaAtual === 1) {
    setTimeout(() => {
      falaHortaAtual++;
      redraw();
      mostrarProximaFalaHorta();
    }, 5000);
  } else if (falaHortaAtual === 2) {
    setTimeout(() => {
      mostrarBalaoHorta = false;
      fundoAtual = fundoHortaDeCima;
      mostrarFazendeiroAgora = false;
      // Limpa os arrays para exibir a horta vazia
      tomates = [];
      alfaces = [];
      cenouras = [];
      beterrabas = [];
      redraw();
    }, 6000);
  }
}

function mouseClicked() {
  if (fundoAtual === fundoHortaDeCima) {
    // Modo "Pá" (slot 0): criar buraco
    if (darkenedSquare === 0 && mouseX >= 100 && mouseX <= 500 && mouseY >= 130 && mouseY <= 460) {
      let tooClose = false;
      for (let h of holes) {
        let d = dist(mouseX, mouseY, h.x, h.y);
        if (d < 80) {
          tooClose = true;
          break;
        }
      }
      if (tooClose) {
        warningMessage = "Perto demais.";
        warningStartTime = millis();
      } else {
        holes.push({ x: mouseX, y: mouseY });
      }
    }
    // Modo "Sementes" (slot 1): plantar semente
    else if (darkenedSquare === 1 && mouseX >= 100 && mouseX <= 500 && mouseY >= 130 && mouseY <= 460) {
      if (holes.length === 0) {
        warningMessage = "Não há nenhum buraco para plantar.";
        warningStartTime = millis();
      } else {
        let candidate = null;
        for (let h of holes) {
          let d = dist(mouseX, mouseY, h.x, h.y);
          if (d <= 15) { // Dentro de um círculo de diâmetro 30 (raio 15)
            candidate = h;
            break;
          }
        }
        if (candidate !== null) {
          let alreadySeeded = false;
          for (let s of seeds) {
            if (dist(candidate.x, candidate.y, s.x, s.y) < 10) {
              alreadySeeded = true;
              break;
            }
          }
          if (!alreadySeeded) {
            seeds.push({ x: candidate.x, y: candidate.y });
          }
        } else {
          warningMessage = "Longe demais, tente novamente.";
          warningStartTime = millis();
        }
      }
    }
    // Modo "Regador" (slot 2): aplicar efeito de água e iniciar animação de crescimento
    else if (darkenedSquare === 2 && mouseX >= 100 && mouseX <= 500 && mouseY >= 130 && mouseY <= 460) {
      let targetIndex = -1;
      for (let i = 0; i < seeds.length; i++) {
        let s = seeds[i];
        if (abs(mouseX - s.x) < 20 && abs(mouseY - s.y) < 20) {
          targetIndex = i;
          break;
        }
      }
      if (targetIndex === -1) {
        warningMessage = "Nenhuma semente encontrada.";
        warningStartTime = millis();
      } else {
        let updated = false;
        for (let effect of waterEffects) {
          if (effect.seedIndex === targetIndex) {
            effect.x = mouseX;
            effect.y = mouseY;
            effect.birthTime = millis();
            updated = true;
            break;
          }
        }
        if (!updated) {
          waterEffects.push({ seedIndex: targetIndex, x: mouseX, y: mouseY, birthTime: millis() });
        }
        // Registra o tempo para iniciar a animação de crescimento
        seeds[targetIndex].wateredTime = millis();
      }
    }
    
    // Processa cliques para seleção dos slots do menu
    let menuWidth = 300;
    let menuHeight = 100;
    let x = (width - menuWidth) / 2;
    let y = height - menuHeight - 20;
    let squareSize = 60;
    let squareY = y + menuHeight / 2;
    let spacing = (menuWidth - 3 * squareSize) / 4;
    for (let i = 0; i < 3; i++) {
      let squareX = x + spacing + i * (squareSize + spacing);
      if (
        mouseX >= squareX &&
        mouseX <= squareX + squareSize &&
        mouseY >= squareY - squareSize / 2 &&
        mouseY <= squareY + squareSize / 2
      ) {
        if (darkenedSquare === i) {
          darkenedSquare = -1;
          labelStartTime = 0;
        } else {
          darkenedSquare = i;
          labelStartTime = millis();
        }
      }
    }
  }
}

function draw() {
  background(255);
  imageMode(CORNER);
  image(fundoAtual, 0, 0, width, height);
  
  // Desenha os buracos
  if (holes.length > 0) {
    imageMode(CENTER);
    for (let h of holes) {
      image(holeImg, h.x, h.y, 100, 100);
    }
    imageMode(CORNER);
  }
  
  // Desenha as sementes e animação de crescimento
  if (seeds.length > 0) {
    imageMode(CENTER);
    for (let s of seeds) {
      if (s.wateredTime && millis() - s.wateredTime >= 5000) {
        let progress = (millis() - s.wateredTime - 5000) / 10000; // 10s de animação
        if (progress > 1) progress = 1;
        if (progress < 0.5) {
          let emoji = "🌱";
          let size = lerp(8, 30, progress * 2);
          textAlign(CENTER, CENTER);
          textSize(size);
          text(emoji, s.x, s.y);
        } else {
          let emoji = "🥕";
          let carrotProgress = (progress - 0.5) * 2; // Normaliza de 0 a 1
          let size = lerp(30, 60, carrotProgress);
          // Removemos a rotação para que as cenouras fiquem em pé
          textAlign(CENTER, CENTER);
          textSize(size);
          text(emoji, s.x, s.y);
        }
      } else {
        image(seedImg, s.x, s.y, 8, 8);
      }
    }
    imageMode(CORNER);
  }
  
  // Desenha os efeitos de rega
  for (let i = waterEffects.length - 1; i >= 0; i--) {
    let effect = waterEffects[i];
    let elapsed = millis() - effect.birthTime;
    let alphaVal;
    if (elapsed < 2000) {
      alphaVal = 128;
    } else if (elapsed < 4000) {
      alphaVal = map(elapsed, 2000, 4000, 128, 0);
    } else {
      waterEffects.splice(i, 1);
      continue;
    }
    push();
      noStroke();
      fill(0, 150, 255, alphaVal);
      ellipse(effect.x, effect.y, 70, 70);  // Círculo de 70px de diâmetro
    pop();
  }
  
  if (mostrarFazendeiroAgora) {
    imageMode(CENTER);
    let proporcao = farmerImg.height / farmerImg.width;
    let novaAltura = tamanhoFazendeiro * proporcao;
    image(farmerImg, width / 2 - 130, height / 2 + 180, tamanhoFazendeiro, novaAltura);
  }
  
  if (mostrarBalao && falaAtual < frases.length) {
    desenharBalao(frases[falaAtual]);
  }
  
  if (mostrarBalaoHorta && falaHortaAtual < frasesHorta.length) {
    desenharBalao(frasesHorta[falaHortaAtual]);
  }
  
  if (fundoAtual === fundoHortaDeCima) {
    desenharPlacar();
    desenharMenu();
  }
  
  // Exibe a mensagem de aviso com fade out (2s)
  if (warningMessage !== "") {
    let elapsed = millis() - warningStartTime;
    if (elapsed < 2000) {
      let alphaVal = map(elapsed, 0, 2000, 255, 0);
      push();
        textAlign(CENTER, CENTER);
        textSize(24);
        fill(255, 0, 0, alphaVal);
        text(warningMessage, width / 2, height - 140);
      pop();
    } else {
      warningMessage = "";
    }
  }
}

function desenharPlacar() {
  let cx = 380, cy = 20, cw = 150, ch = 50;
  
  noStroke();
  fill(0, 0, 0, 70);
  rect(cx + 6, cy + 6, cw, ch, 15);
  
  fill("#ffcc66");
  stroke("#e59400");
  strokeWeight(4);
  rect(cx, cy, cw, ch, 15);
  
  fill("#333");
  textSize(20);
  textAlign(LEFT, CENTER);
  textFont("Comic Sans MS");
  let paddingLeft = 8;
  let txt = "Pontos: " + pontos;
  text(txt, cx + paddingLeft, cy + ch / 2);
}

function desenharBalao(texto) {
  let bx = width / 2 - 30;
  let by = height / 2 + 60;
  let bw = 280, bh = 130;
  
  stroke("#f59e00");
  strokeWeight(4);
  fill("#fff176");
  rect(bx, by, bw, bh, 20);
  
  triangle(bx, by + 85, bx - 25, by + 75, bx, by + 65);
  
  noStroke();
  fill("#333");
  textSize(24);
  textAlign(CENTER, CENTER);
  textFont("Comic Sans MS");
  text(texto, bx + bw / 2, by + bh / 2);
}

function desenharMenu() {
  let menuWidth = 300, menuHeight = 100;
  let x = (width - menuWidth) / 2;
  let y = height - menuHeight - 20;
  
  noStroke();
  fill(0, 0, 0, 70);
  rect(x + 8, y + 8, menuWidth, menuHeight, 20);
  
  fill(255, 204, 0);
  stroke(0);
  strokeWeight(4);
  rect(x, y, menuWidth, menuHeight, 20);
  
  let squareColors = [
    [255, 102, 102],
    [102, 255, 102],
    [102, 178, 255]
  ];
  
  let squareSize = 60;
  let spacing = (menuWidth - 3 * squareSize) / 4;
  let squareY = y + menuHeight / 2;
  
  for (let i = 0; i < 3; i++) {
    let squareX = x + spacing + i * (squareSize + spacing);
    
    let targetScale = 1.0;
    if (
      mouseX >= squareX &&
      mouseX <= squareX + squareSize &&
      mouseY >= squareY - squareSize / 2 &&
      mouseY <= squareY + squareSize / 2
    ) {
      targetScale = 1.1;
    }
    menuSquareScales[i] = lerp(menuSquareScales[i], targetScale, 0.1);
    
    let centerX = squareX + squareSize / 2;
    let centerY = squareY;
    
    push();
      translate(centerX, centerY);
      scale(menuSquareScales[i]);
      noStroke();
      fill(0, 0, 0, 70);
      rect(-squareSize / 2 + 4, -squareSize / 2 + 4, squareSize, squareSize, 10);
    pop();
    
    let displayColor = (darkenedSquare === i)
                      ? darkenColor(squareColors[i])
                      : squareColors[i];
    
    push();
      translate(centerX, centerY);
      scale(menuSquareScales[i]);
      fill(...displayColor);
      stroke(0);
      strokeWeight(4);
      rect(-squareSize / 2, -squareSize / 2, squareSize, squareSize, 10);
    pop();
    
    if (i === 0 && paImg) {
      let maxW = squareSize * 0.85;
      let maxH = squareSize * 0.85;
      let scaleFactor = min(maxW / paImg.width, maxH / paImg.height);
      let w = paImg.width * scaleFactor;
      let h = paImg.height * scaleFactor;
      push();
        translate(centerX, centerY);
        scale(menuSquareScales[i]);
        imageMode(CENTER);
        image(paImg, 0, 0, w, h);
      pop();
    } else if (i === 1 && pacoteImg) {
      let maxW = squareSize * 0.9;
      let maxH = squareSize * 0.9;
      let scaleFactor = min(maxW / pacoteImg.width, maxH / pacoteImg.height);
      let w = pacoteImg.width * scaleFactor;
      let h = pacoteImg.height * scaleFactor;
      push();
        translate(centerX, centerY);
        scale(menuSquareScales[i]);
        imageMode(CENTER);
        image(pacoteImg, 0, 0, w, h);
      pop();
    } else if (i === 2 && regadorImg) {
      let maxW = squareSize * 0.9;
      let maxH = squareSize * 0.9;
      let scaleFactor = min(maxW / regadorImg.width, maxH / regadorImg.height);
      let w = regadorImg.width * scaleFactor;
      let h = regadorImg.height * scaleFactor;
      push();
        translate(centerX, centerY);
        scale(menuSquareScales[i]);
        imageMode(CENTER);
        image(regadorImg, 0, 0, w, h);
      pop();
    }
    
    if (darkenedSquare === i) {
      let elapsed = millis() - labelStartTime;
      let a = 255;
      if (elapsed > 1000) {
        if (elapsed < 2000) {
          a = map(elapsed, 1000, 2000, 255, 0);
        } else {
          a = 0;
        }
      }
      if (a > 0) {
        push();
          textAlign(CENTER, BOTTOM);
          textSize(16);
          fill(0, a);
          noStroke();
          let msg = "";
          if (i === 0) msg = "Pá";
          else if (i === 1) msg = "Sementes";
          else if (i === 2) msg = "Regador";
          text(msg, centerX, y - 5);
        pop();
      }
    }
  }
}
