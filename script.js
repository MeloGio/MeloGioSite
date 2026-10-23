const questions = [
  {
    category: "IDENTIFICANDO ERROS",
    question: "Seu código mostra uma mensagem de erro. Como uma IA pode ajudar?",
    answers: [
      "Analisando a mensagem e o trecho do código para sugerir uma possível causa",
      "Garantindo automaticamente que o programa inteiro está correto",
      "Apagando todos os arquivos do projeto",
      "Ignorando a mensagem e continuando como se nada tivesse acontecido"
    ],
    correct: 0,
    explanation: "A IA pode interpretar mensagens de erro e apontar causas prováveis. A sugestão precisa ser conferida no contexto real do projeto."
  },
  {
    category: "ERROS DE SINTAXE",
    question: "Uma IA encontra um parêntese que não foi fechado. Que tipo de problema ela está ajudando a identificar?",
    answers: [
      "Um problema de conexão com a internet",
      "Um erro de sintaxe",
      "Um defeito físico no computador",
      "Um problema de direitos autorais"
    ],
    correct: 1,
    explanation: "Erros de sintaxe acontecem quando o código não segue a estrutura exigida pela linguagem, como esquecer um parêntese, aspas ou chave."
  },
  {
    category: "ENTENDENDO A CAUSA",
    question: "O programa roda, mas apresenta um resultado errado. O que a IA pode ajudar a investigar?",
    answers: [
      "Somente a cor do editor de código",
      "O nome do computador, sem olhar o código",
      "A lógica do programa e os valores usados durante a execução",
      "Como evitar todos os testes"
    ],
    correct: 2,
    explanation: "Esse pode ser um erro de lógica. A IA pode ajudar a seguir o raciocínio do código e sugerir testes para descobrir onde o resultado se desvia do esperado."
  },
  {
    category: "BOAS PRÁTICAS",
    question: "A IA sugeriu uma correção para um bug. Qual é o próximo passo mais seguro?",
    answers: [
      "Aplicar sem ler, porque a IA sempre acerta",
      "Apagar os testes existentes",
      "Publicar imediatamente em produção",
      "Revisar a mudança e executar testes para confirmar que funciona"
    ],
    correct: 3,
    explanation: "Sugestões de IA podem estar erradas ou causar regressões. Revise o código, rode testes e confira se o conserto resolve o problema sem quebrar outras partes."
  },
  {
    category: "CONTEXTO DO PROJETO",
    question: "Por que é útil fornecer à IA a mensagem de erro e um trecho relevante do código?",
    answers: [
      "Porque o contexto ajuda a IA a fazer uma análise mais específica",
      "Porque assim a IA pode adivinhar qualquer coisa com certeza",
      "Porque isso faz o código executar mais rápido automaticamente",
      "Porque o contexto substitui a necessidade de entender o problema"
    ],
    correct: 0,
    explanation: "Mensagens completas e trechos relevantes ajudam a formular hipóteses melhores. Evite compartilhar senhas, tokens, chaves privadas ou dados confidenciais."
  },
  {
    category: "SEGURANÇA",
    question: "Antes de enviar código para uma ferramenta de IA, o que você deve evitar compartilhar?",
    answers: [
      "O nome de uma variável sem importância",
      "Senhas, chaves de API, tokens e dados pessoais ou confidenciais",
      "Uma função simples de exemplo sem dados sensíveis",
      "Uma descrição geral do erro"
    ],
    correct: 1,
    explanation: "Segredos e dados sensíveis devem ser removidos ou substituídos por exemplos fictícios antes de compartilhar código com serviços externos."
  },
  {
    category: "DEBUG INTELIGENTE",
    question: "Qual combinação é a melhor forma de usar IA para depurar um programa?",
    answers: [
      "Pedir uma correção e nunca mais olhar o código",
      "Aceitar a primeira resposta sem testar",
      "Usar a IA para levantar hipóteses, reproduzir o bug, testar a correção e revisar o resultado",
      "Deixar de aprender a linguagem de programação"
    ],
    correct: 2,
    explanation: "A IA é uma assistente de depuração, não uma garantia de correção. Combine suas sugestões com testes, leitura do código e análise crítica."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const startButton = document.querySelector("#start-btn");
const nextButton = document.querySelector("#next-btn");
const restartButton = document.querySelector("#restart-btn");
const questionCounter = document.querySelector("#question-counter");
const scoreLabel = document.querySelector("#score-label");
const progressFill = document.querySelector("#progress-fill");
const category = document.querySelector("#category");
const questionText = document.querySelector("#question-text");
const answersContainer = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");

function iniciarJogo() {
  currentQuestion = 0;
  score = 0;
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  mostrarPergunta();
}

function mostrarPergunta() {
  answered = false;
  const item = questions[currentQuestion];
  questionCounter.textContent = `PERGUNTA ${currentQuestion + 1}/${questions.length}`;
  scoreLabel.textContent = `PONTOS: ${score}`;
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
  category.textContent = item.category;
  questionText.textContent = item.question;
  answersContainer.replaceChildren();
  feedback.textContent = "";
  feedback.classList.add("hidden");
  nextButton.classList.add("hidden");

  item.answers.forEach((answerText, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    const letter = document.createElement("span");
    letter.className = "letter";
    letter.textContent = String.fromCharCode(65 + index);
    const label = document.createElement("span");
    label.textContent = answerText;
    button.append(letter, label);
    button.addEventListener("click", () => verificarResposta(index, button));
    answersContainer.appendChild(button);
  });
}

function verificarResposta(selectedIndex, selectedButton) {
  if (answered) return;
  answered = true;
  const item = questions[currentQuestion];
  const buttons = [...answersContainer.querySelectorAll(".answer")];

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) button.classList.add("correct");
  });

  if (selectedIndex === item.correct) {
    score++;
    scoreLabel.textContent = `PONTOS: ${score}`;
    feedback.textContent = `Resposta certa! ${item.explanation}`;
  } else {
    selectedButton.classList.add("wrong");
    feedback.textContent = `Não foi dessa vez. ${item.explanation}`;
  }

  feedback.classList.remove("hidden");
  nextButton.textContent = currentQuestion === questions.length - 1 ? "Ver resultado ★" : "Próxima pergunta →";
  nextButton.classList.remove("hidden");
}

function mostrarResultado() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  progressFill.style.width = "100%";
  document.querySelector("#final-score").textContent = `${score}/${questions.length} pontos`;

  let title = "Continue investigando!";
  let message = "Depurar é um processo: observe o erro, faça hipóteses e teste suas soluções.";
  if (score >= 6) {
    title = "Bug hunter lendário!";
    message = "Mandou muito bem! Você sabe que a IA pode acelerar a depuração, mas que revisar e testar continuam sendo essenciais.";
  } else if (score >= 4) {
    title = "Bom trabalho, dev!";
    message = "Você já pegou várias boas práticas para usar IA na investigação de bugs. Continue praticando!";
  }

  document.querySelector("#result-title").textContent = title;
  document.querySelector("#result-text").textContent = message;
}

startButton.addEventListener("click", iniciarJogo);
nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) mostrarPergunta();
  else mostrarResultado();
});
restartButton.addEventListener("click", iniciarJogo);
