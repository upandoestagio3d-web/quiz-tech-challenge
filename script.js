const perguntas = [
  {
    pergunta: "Qual linguagem é usada para criar a estrutura de uma página web?",
    opcoes: ["CSS", "HTML", "JavaScript", "Python"],
    resposta: "HTML"
  },
  {
    pergunta: "Qual linguagem é usada para estilizar uma página web?",
    opcoes: ["HTML", "CSS", "SQL", "Java"],
    resposta: "CSS"
  },
  {
    pergunta: "Qual linguagem adiciona interatividade a uma página web?",
    opcoes: ["JavaScript", "HTML", "Excel", "PowerPoint"],
    resposta: "JavaScript"
  },
  {
    pergunta: "O que significa IA?",
    opcoes: ["Internet Aberta", "Inteligência Artificial", "Interface Automática", "Informação Analógica"],
    resposta: "Inteligência Artificial"
  },
  {
    pergunta: "Qual plataforma permite publicar sites gratuitamente usando repositórios?",
    opcoes: ["GitHub Pages", "WhatsApp", "Word", "Paint"],
    resposta: "GitHub Pages"
  }
];

let indiceAtual = 0;
let pontos = 0;
let vidas = 3;
let respondeu = false;

function carregarPergunta() {
  respondeu = false;

  document.getElementById("mensagem").textContent = "";
  document.getElementById("proxima").disabled = true;

  const perguntaAtual = perguntas[indiceAtual];

  document.getElementById("pergunta").textContent = perguntaAtual.pergunta;

  const opcoesDiv = document.getElementById("opcoes");
  opcoesDiv.innerHTML = "";

  perguntaAtual.opcoes.forEach(opcao => {
    const botao = document.createElement("button");
    botao.textContent = opcao;
    botao.onclick = () => verificarResposta(botao, opcao);
    opcoesDiv.appendChild(botao);
  });

  atualizarInfo();
}

function verificarResposta(botao, opcaoEscolhida) {
  if (respondeu) return;

  respondeu = true;

  const perguntaAtual = perguntas[indiceAtual];
  const botoes = document.querySelectorAll("#opcoes button");

  botoes.forEach(b => {
    b.disabled = true;

    if (b.textContent === perguntaAtual.resposta) {
      b.classList.add("correta");
    }
  });

  if (opcaoEscolhida === perguntaAtual.resposta) {
    pontos += 10;
    document.getElementById("mensagem").textContent = "✅ Resposta correta! +10 pontos";
  } else {
    vidas--;
    botao.classList.add("errada");
    document.getElementById("mensagem").textContent = "❌ Resposta errada! Você perdeu uma vida.";
  }

  atualizarInfo();

  if (vidas <= 0) {
    finalizarJogo();
  } else {
    document.getElementById("proxima").disabled = false;
  }
}

function proximaPergunta() {
  indiceAtual++;

  if (indiceAtual >= perguntas.length) {
    finalizarJogo();
  } else {
    carregarPergunta();
  }
}

function atualizarInfo() {
  document.getElementById("pontos").textContent = pontos;

  let coracoes = "";
  for (let i = 0; i < vidas; i++) {
    coracoes += "❤️";
  }

  document.getElementById("vidas").textContent = coracoes || "💔";
}

function finalizarJogo() {
  document.getElementById("pergunta").textContent = "Fim de jogo!";
  document.getElementById("opcoes").innerHTML = "";
  document.getElementById("mensagem").textContent = `Sua pontuação final foi: ${pontos} pontos.`;

  document.getElementById("proxima").classList.add("oculto");
  document.getElementById("reiniciar").classList.remove("oculto");
}

function reiniciarJogo() {
  indiceAtual = 0;
  pontos = 0;
  vidas = 3;

  document.getElementById("proxima").classList.remove("oculto");
  document.getElementById("reiniciar").classList.add("oculto");

  carregarPergunta();
}

carregarPergunta();