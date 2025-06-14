document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        { type: "yesno", question: "Is Ishika 19 years old?", correct: "yes" },
        { type: "yesno", question: "Ishika's Birthday is on 12th March?", correct: "yes" },
        { type: "yesno", question: "Does Sarthak have an accent?", correct: "no" },
        { type: "yesno", question: "Ishika has 7 siblings ?", correct: "no" },
        { type: "yesno", question: "Does Sarthak love Ishika?", correct: "yes" },
        { type: "yesno", question: "Is Ishika's youngest sibling's name Shivam?", correct: "yes" },
        { type: "yesno", question: "Does Ishika Agarwal go to the gym?", correct: "yes" },
        { type: "yesno", question: "Kya Sarthak ko Hindi aati hai? 🤔", correct: "yes" },
        { type: "yesno", question: "Is Lucknow food better than Delhi food?", correct: "yes" },
        { type: "yesno", question: "Does Ishika looks fabulous in the mango dress?", correct: "yes" },
        { type: "fill", question: "How many kids does Virat have?", correct: "2" },
        { type: "fill", question: "What is the surname of Sarthak?", correct: "monga" },
        { type: "fill", question: "What is Ishika's Golden Retriever's name?", correct: "jojo" },
        { type: "fill", question: "Who is older, Sarthak or Aashna?", correct: "aashna" },
        { type: "fill", question: "Who is cuter, Ishika or Sarthak?", correct: "ishika" },
        { type: "mcq", question: "What is the age difference between Sarthak and Ishika?", options: ["4", "3", "5", "2"], correct: "4" },
        { type: "mcq", question: "Who is Ishika's boyfriend?", options: ["sarthak", "pratistha"], correct: "sarthak" },
        { type: "mcq", question: "Who is Ishika's favourite cricket player?", options: ["virat", "rohit", "shami"], correct: "virat" },
        { type: "mcq", question: "How cute is Ishika?", options: ["cute", "very cute", "mine", "everything"], correct: "everything" }
    ];

    let currentQuestionIndex = 0;
    const progressBar = document.getElementById("progress");
    const questionText = document.getElementById("question");
    const optionsContainer = document.getElementById("options");

    function showGif(type) {
        let gifUrl = type === "happy"
            ? "https://media.giphy.com/media/yoJC2A59OCZHs1LXvW/giphy.gif"
            : "https://media.giphy.com/media/2rtQMJvhzOnRe/giphy.gif";

        let gifDiv = document.createElement("div");
        gifDiv.classList.add("background-gif");
        gifDiv.style.backgroundImage = `url(${gifUrl})`;
        document.body.appendChild(gifDiv);

        setTimeout(() => {
            gifDiv.style.opacity = "1";
        }, 100);

        setTimeout(() => {
            gifDiv.style.opacity = "0";
            setTimeout(() => gifDiv.remove(), 500);
        }, 1500);
    }

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            // Clear the questionnaire container
            const container = document.querySelector(".container");
            container.innerHTML = `
            <h2>🎉 Congratulations! You completed the questionnaire!</h2>
            <iframe src="https://drive.google.com/file/d/1rFZ6MAfk1w2D4ANXplUgRDO1ZUhzZZbe/preview" width="100%" allow="autoplay"></iframe>
            <button class="dashboard-btn" onclick="window.location.href='/dashboard'">🏠 Back to Dashboard</button>
        `;
            return;
        }

        const q = questions[currentQuestionIndex];
        questionText.textContent = q.question;
        optionsContainer.innerHTML = "";

        if (q.type === "yesno") {
            optionsContainer.innerHTML = `
            <button class="answer-btn" data-answer="yes">Yes</button>
            <button class="answer-btn" data-answer="no">No</button>
        `;
        } else if (q.type === "fill") {
            optionsContainer.innerHTML = `
            <input type="text" id="fill-answer" placeholder="Your answer">
            <button id="submit-answer">Submit</button>
        `;
        } else if (q.type === "mcq") {
            q.options.forEach(option => {
                const btn = document.createElement("button");
                btn.classList.add("answer-btn");
                btn.textContent = option;
                btn.dataset.answer = option;
                optionsContainer.appendChild(btn);
            });
        }
    }


    optionsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("answer-btn")) {
            checkAnswer(event.target.dataset.answer);
        }
    });

    document.addEventListener("click", function (event) {
        if (event.target.id === "submit-answer") {
            const answerInput = document.getElementById("fill-answer");
            checkAnswer(answerInput.value.trim().toLowerCase());
        }
    });

    function checkAnswer(answer) {
        if (answer === questions[currentQuestionIndex].correct) {
            showGif("happy");
            currentQuestionIndex++;
            updateProgress();
            setTimeout(loadQuestion, 2000);
        } else {
            showGif("sad");
            setTimeout(loadQuestion, 2000);
        }
    }

    function updateProgress() {
        let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progress = Math.min(progress, 100); // Prevent exceeding 100%
        progressBar.style.width = `${progress}%`;
    }

    loadQuestion();
});
