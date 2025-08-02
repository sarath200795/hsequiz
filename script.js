const quizzes = {
    health: [
        { q: "What is the recommended amount of daily water intake?", options: ["1L", "2L", "3L", "4L"], answer: 1 },
        { q: "Which nutrient is most important for muscle growth?", options: ["Protein", "Fat", "Carbs", "Vitamins"], answer: 0 }
    ],
    safety: [
        { q: "What does PPE stand for?", options: ["Personal Protective Equipment", "Public Protection Effort", "Primary Protective Essentials"], answer: 0 },
        { q: "What is the color of a fire extinguisher?", options: ["Blue", "Red", "Green", "Yellow"], answer: 1 }
    ],
    environment: [
        { q: "Which gas causes global warming?", options: ["Oxygen", "CO2", "Nitrogen", "Hydrogen"], answer: 1 },
        { q: "What is recycling?", options: ["Reusing waste", "Throwing waste", "Burning waste"], answer: 0 }
    ]
};

const category = localStorage.getItem("quizCategory");
const quizTitle = document.getElementById("quiz-title");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

let currentQuestion = 0;
let score = 0;

if (quizTitle) quizTitle.textContent = `${category.toUpperCase()} Quiz`;

function loadQuestion() {
    const q = quizzes[category][currentQuestion];
    questionEl.textContent = q.q;
    optionsEl.innerHTML = "";
    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(index, q.answer);
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(selected, correct) {
    if (selected === correct) score++;
    nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizzes[category].length) {
        loadQuestion();
    } else {
        localStorage.setItem("quizScore", `${score} / ${quizzes[category].length}`);
        window.location.href = "results.html";
    }
});

if (questionEl) loadQuestion();
