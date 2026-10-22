"use strict";

const questions = [
  {
    id: "who",
    title: "Chi sei?",
    answers: ["Mamma/Papà", "Sorella", "Fidanzato", "Amica/o", "Zio/Zia", "Altri benefattori generosi"]
  },
  {
    id: "knowledge",
    title: "Quanto bene pensi di conoscermi?",
    answers: ["So tutto", "Abbastanza", "Vado a intuito", "Chi sei?"]
  },
  {
    id: "giftType",
    title: "Che tipo di regalo vorresti farmi?",
    answers: ["Qualcosa di utile", "Qualcosa di tecnologico", "Un’esperienza da ricordare", "Sorprendimi, sono disperato/a"]
  },
  {
    id: "budget",
    title: "Qual è il tuo budget?",
    answers: ["Da 10 a 20€", "Da 20 a 80€", "Oltre 100€", "Solo il mio amore per te"]
  },
  {
    id: "reason",
    title: "Qual è il vero motivo per cui sei ancora qui?",
    answers: [
      "Perché ci tengo a te.",
      "Perché sono curioso/a.",
      "Perché userò le tue idee per prendere ispirazione per i regali che farò ad altre persone.",
      "Perché il pulsante NO non funzionava."
    ]
  }
];

const budgetBands = {
  "Da 10 a 20€": "10-20",
  "Da 20 a 80€": "20-80",
  "Oltre 100€": "over-100"
};

const giftCatalog = [
  {
    id: "angels-share",
    name: "Angels’ Share by Kilian — 50 ml",
    categories: ["surprise"],
    description: "Il profumo indicato nella wishlist di Giorgia.",
    details: "",
    image: "assets/images/profumo-natale.png",
    price: null,
    budgetBands: ["over-100"]
  },
  {
    id: "fortify-serum",
    name: "Siero Fortify di Eveir",
    categories: ["useful"],
    description: "Il siero Fortify indicato nella wishlist di Giorgia.",
    details: "",
    image: "assets/images/eveir-natale.png",
    price: null,
    budgetBands: ["20-80"]
  },
  {
    id: "hairdresser-voucher",
    name: "Buono parrucchiere — Salone Tempo, Albenga",
    categories: ["useful", "experience"],
    description: "Un buono presso Salone Tempo, Albenga.",
    details: "",
    image: "assets/images/salone.png",
    price: null,
    budgetBands: ["20-80", "over-100"]
  },
  {
    id: "smart-ring",
    name: "Smart Ring — rigorosamente argento",
    categories: ["tech"],
    description: "Oura Ring oppure un anello smart equivalente, tassativamente di colore argento.",
    details: "",
    image: "assets/images/ring.png",
    price: null,
    budgetBands: ["20-80", "over-100"]
  },
  {
    id: "silver-jewelry",
    name: "Gioielli argentati",
    categories: ["useful", "surprise"],
    description: "Collane, bracciali, anelli oppure orecchini in argento 925 o acciaio inossidabile color argento.",
    details: "",
    image: "assets/images/gioielli.png",
    price: null,
    budgetBands: ["10-20", "20-80", "over-100"]
  },
  {
    id: "mystery-books",
    name: "Libri — gialli, thriller e misteri",
    categories: ["useful"],
    description: "Gialli deduttivi, thriller, romanzi investigativi, misteri e storie di omicidi. Scelta libera di autori e titoli.",
    details: "",
    image: "assets/images/libri.png",
    price: null,
    budgetBands: ["10-20", "20-80"]
  },
  {
    id: "tattoo-voucher",
    name: "Buono tattoo — Electric Riviera, Alassio",
    categories: ["experience"],
    description: "Un buono tattoo presso Electric Riviera, Alassio.",
    details: "",
    image: "assets/images/tattoo.png",
    price: null,
    budgetBands: ["20-80", "over-100"]
  },
  {
    id: "cash",
    name: "Bonifico o contanti",
    categories: ["surprise"],
    description: "Per gli indecisi: il regalo che non sbaglia mai. 😂",
    details: "",
    image: "assets/images/contanti.png",
    price: null,
    budgetBands: ["over-100"]
  },
  {
    id: "care-boxes",
    name: "Cofanetti haircare e/o skincare",
    categories: ["useful", "surprise"],
    description: "Un po' di self-care ci vuole sempre",
    details: "",
    image: "assets/images/cofanetti.png",
    price: null,
    budgetBands: ["10-20", "20-80", "over-100"]
  },
  {
    id: "aesthetic-treatments",
    name: "Buono per trattamenti di medicina estetica",
    categories: ["experience", "surprise"],
    description: "Invecchiare piacerà a qualcuno, non a me",
    details: "Trattamenti come botox, filler, biostimolazione e simili, da scegliere eventualmente dopo una valutazione con un medico qualificato.",
    image: "assets/images/estetica.png",
    price: null,
    budgetBands: ["over-100"]
  }
];

const answers = {};
let currentQuestionIndex = 0;
let modalAction = null;

const welcome = document.querySelector("#welcome");
const quiz = document.querySelector("#quiz");
const loading = document.querySelector("#loading");
const results = document.querySelector("#results");
const loveResult = document.querySelector("#love-result");
const heartResult = document.querySelector("#heart-result");
const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");
const welcomeActions = document.querySelector("#welcome-actions");
const choiceMessage = document.querySelector("#choice-message");
const questionCount = document.querySelector("#question-count");
const questionTitle = document.querySelector("#question-title");
const questionContent = document.querySelector("#question-content");
const answerList = document.querySelector("#answer-list");
const progressTrack = document.querySelector("#progress-track");
const progressFill = document.querySelector("#progress-fill");
const modalBackdrop = document.querySelector("#modal-backdrop");
const modalTitle = document.querySelector("#modal-title");
const modalMessage = document.querySelector("#modal-message");
const modalButton = document.querySelector("#modal-button");
const modalDecoration = document.querySelector("#modal-decoration");
const loadingMessage = document.querySelector("#loading-message");

function showOnly(section) {
  [welcome, quiz, loading, results, loveResult, heartResult].forEach((item) => {
    item.hidden = item !== section;
  });
}

function startQuiz() {
  showOnly(quiz);
  currentQuestionIndex = 0;
  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;

  questionCount.textContent = `Domanda ${questionNumber} di ${questions.length}`;
  progressTrack.setAttribute("aria-valuenow", String(questionNumber));
  progressFill.style.width = `${(questionNumber / questions.length) * 100}%`;
  questionTitle.textContent = question.title;
  answerList.replaceChildren();

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    const number = document.createElement("span");
    button.type = "button";
    button.className = "answer-button";
    number.className = "answer-number";
    number.setAttribute("aria-hidden", "true");
    number.textContent = String(index + 1);
    button.append(number, document.createTextNode(answer));
    button.addEventListener("click", () => selectAnswer(question, answer));
    answerList.append(button);
  });

  questionContent.classList.remove("question-content");
  void questionContent.offsetWidth;
  questionContent.classList.add("question-content");
}

function selectAnswer(question, answer) {
  answers[question.id] = answer;

  if (question.id === "knowledge" && ["Vado a intuito", "Chi sei?"].includes(answer)) {
    showModal(
      "Una piccola osservazione",
      "Allora cosa ci fai qui? Non ho mica tempo da perdere io",
      "Va bene, scusa 😭",
      () => advanceQuestion()
    );
    return;
  }

  if (question.id === "budget" && answer === "Solo il mio amore per te" && answers.who !== "Fidanzato") {
    showOnly(heartResult);
    return;
  }

  if (question.id === "reason" && answer === questions[4].answers[2]) {
    showModal(
      "Allarme spionaggio",
      "Questo si chiama spionaggio, sei stato/a segnalato/a alle autorità competenti",
      "Scopri i regali 🎁",
      () => showResultsFlow(),
      "🚨"
    );
    return;
  }

  if (question.id === "reason" && answer === questions[4].answers[3]) {
    showModal(
      "Occhio di falco",
      "Ottima osservazione",
      "Scopri i regali 🎁",
      () => showResultsFlow()
    );
    return;
  }

  if (currentQuestionIndex === questions.length - 1) {
    showResultsFlow();
    return;
  }

  advanceQuestion();
}

function advanceQuestion() {
  currentQuestionIndex += 1;
  renderQuestion();
}

function showModal(title, message, buttonLabel, onContinue, decoration = "✦") {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modalButton.textContent = buttonLabel;
  modalDecoration.textContent = decoration;
  modalDecoration.classList.toggle("siren", decoration === "🚨");
  modalAction = onContinue;
  modalBackdrop.hidden = false;
  modalButton.focus();
}

function closeModal() {
  modalBackdrop.hidden = true;
  modalDecoration.classList.remove("siren");
  const action = modalAction;
  modalAction = null;
  if (action) {
    action();
  }
}

function showResultsFlow() {
  if (answers.who === "Fidanzato") {
    showOnly(loveResult);
    return;
  }

  showOnly(loading);
  const messages = [
    "Analisi delle risposte in corso…",
    "Consultazione degli elfi…",
    "Preparazione della wishlist di Giorgia…"
  ];
  let messageIndex = 0;

  function showNextMessage() {
    loadingMessage.textContent = messages[messageIndex];
    messageIndex += 1;
    if (messageIndex < messages.length) {
      window.setTimeout(showNextMessage, 900);
    } else {
      window.setTimeout(renderResults, 900);
    }
  }

  showNextMessage();
}

function giftMatchesBudget(gift, selectedBudget) {
  const selectedBand = budgetBands[selectedBudget];
  return selectedBand !== undefined && gift.budgetBands.includes(selectedBand);
}

function giftMatchesCategory(gift, selectedCategory) {
  const categoryIds = {
    "Qualcosa di utile": "useful",
    "Qualcosa di tecnologico": "tech",
    "Un’esperienza da ricordare": "experience",
    "Sorprendimi, sono disperato/a": "surprise"
  };
  if (selectedCategory === "Sorprendimi, sono disperato/a") {
    return true;
  }
  return gift.categories.includes(categoryIds[selectedCategory]);
}

function selectSurpriseGifts(gifts, selectedBudget) {
  const available = [...gifts];
  const recommendations = [];
  const coveredCategories = new Set();

  for (let index = available.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [available[index], available[randomIndex]] = [available[randomIndex], available[index]];
  }

  if (selectedBudget === "Oltre 100€") {
    const perfumeIndex = available.findIndex((gift) => gift.id === "angels-share");
    if (perfumeIndex !== -1) {
      const [perfume] = available.splice(perfumeIndex, 1);
      recommendations.push(perfume);
      perfume.categories.forEach((category) => coveredCategories.add(category));
    }
  }

  while (recommendations.length < 3 && available.length > 0) {
    let bestCandidates = [];
    let bestCategoryCount = -1;

    available.forEach((gift, index) => {
      const newCategoryCount = gift.categories
        .filter((category) => !coveredCategories.has(category))
        .length;
      if (newCategoryCount > bestCategoryCount) {
        bestCategoryCount = newCategoryCount;
        bestCandidates = [index];
      } else if (newCategoryCount === bestCategoryCount) {
        bestCandidates.push(index);
      }
    });

    const selectedIndex = bestCandidates[Math.floor(Math.random() * bestCandidates.length)];
    const [gift] = available.splice(selectedIndex, 1);
    recommendations.push(gift);
    gift.categories.forEach((category) => coveredCategories.add(category));
  }

  return recommendations;
}

function renderResults() {
  const grid = document.querySelector("#gift-grid");
  const emptyResults = document.querySelector("#empty-results");
  const eligibleGifts = giftCatalog
    .filter((gift) => giftMatchesCategory(gift, answers.giftType))
    .filter((gift) => giftMatchesBudget(gift, answers.budget))
    .filter((gift, index, gifts) => gifts.findIndex((candidate) => candidate.id === gift.id) === index);

  const recommendations = answers.giftType === "Sorprendimi, sono disperato/a"
    ? selectSurpriseGifts(eligibleGifts, answers.budget)
    : eligibleGifts.slice(0, 3);

  grid.replaceChildren();
  recommendations.forEach((gift) => {
    const card = document.createElement("article");
    const image = document.createElement("img");
    const copy = document.createElement("div");
    const name = document.createElement("h2");
    const description = document.createElement("p");
    const detail = document.createElement("span");

    card.className = "gift-card";
    image.className = "gift-image";
    image.src = gift.image;
    image.alt = gift.name;
    image.addEventListener("error", () => {
      image.src = "assets/images/placeholder.svg";
      image.alt = `Immagine temporaneamente non disponibile per ${gift.name}`;
    }, { once: true });
    copy.className = "gift-copy";
    name.textContent = gift.name;
    description.textContent = gift.id === "smart-ring" && answers.budget === "Da 20 a 80€"
      ? "Per questa fascia, un eventuale anello smart alternativo compatibile con il budget, tassativamente di colore argento."
      : gift.description;
    detail.className = "gift-detail";
    detail.textContent = gift.details;
    detail.hidden = gift.details === "";
    copy.append(name, description, detail);
    card.append(image, copy);
    grid.append(card);
  });

  emptyResults.hidden = recommendations.length !== 0;
  if (recommendations.length === 0) {
    emptyResults.textContent = "Gli elfi non hanno ancora un’idea verificata in questa fascia: nessun regalo fuori budget, promesso! Configura le fasce di prezzo nel catalogo e la wishlist sarà pronta.";
  }

  showOnly(results);
}

function moveNoButton() {
  if (noButton.hidden) {
    return;
  }

  const buttonRect = noButton.getBoundingClientRect();
  const yesRect = yesButton.getBoundingClientRect();
  const margin = 12;
  const maxLeft = Math.max(margin, window.innerWidth - buttonRect.width - margin);
  const maxTop = Math.max(margin, window.innerHeight - buttonRect.height - margin);
  const minimumGap = 18;
  let point = null;

  for (let attempt = 0; attempt < 80; attempt += 1) {
    const left = margin + Math.random() * Math.max(0, maxLeft - margin);
    const top = margin + Math.random() * Math.max(0, maxTop - margin);
    const overlapsYes = left < yesRect.right + minimumGap
      && left + buttonRect.width > yesRect.left - minimumGap
      && top < yesRect.bottom + minimumGap
      && top + buttonRect.height > yesRect.top - minimumGap;

    if (!overlapsYes) {
      point = { left, top };
      break;
    }
  }

  if (!point) {
    const candidates = [
      { left: margin, top: margin },
      { left: maxLeft, top: margin },
      { left: margin, top: maxTop },
      { left: maxLeft, top: maxTop }
    ];
    point = candidates.find((candidate) => {
      return !(candidate.left < yesRect.right + minimumGap
        && candidate.left + buttonRect.width > yesRect.left - minimumGap
        && candidate.top < yesRect.bottom + minimumGap
        && candidate.top + buttonRect.height > yesRect.top - minimumGap);
    }) || candidates[0];
  }

  document.body.append(noButton);
  noButton.style.position = "fixed";
  noButton.style.left = `${point.left}px`;
  noButton.style.top = `${point.top}px`;
  noButton.style.zIndex = "3";
}

function createSnowfall() {
  const snowfall = document.querySelector("#snowfall");
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 22; index += 1) {
    const flake = document.createElement("span");
    flake.className = "snowflake";
    flake.textContent = index % 3 === 0 ? "✳" : "·";
    flake.style.left = `${Math.random() * 100}%`;
    flake.style.animationDuration = `${9 + Math.random() * 13}s`;
    flake.style.animationDelay = `${Math.random() * -20}s`;
    flake.style.fontSize = `${8 + Math.random() * 12}px`;
    fragment.append(flake);
  }

  snowfall.append(fragment);
}

yesButton.addEventListener("click", () => {
  welcomeActions.hidden = true;
  noButton.hidden = true;
  choiceMessage.textContent = "Ottima scelta. La tua reputazione è salva.";
  window.setTimeout(startQuiz, 1150);
});

noButton.addEventListener("pointerenter", moveNoButton);
noButton.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  moveNoButton();
});
noButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
}, { passive: false });
noButton.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});
window.addEventListener("resize", () => {
  if (!noButton.hidden && noButton.style.position === "fixed") {
    moveNoButton();
  }
});
modalButton.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (event) => {
  if (event.target === modalBackdrop) {
    modalButton.focus();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modalBackdrop.hidden) {
    event.preventDefault();
  }
});

createSnowfall();
