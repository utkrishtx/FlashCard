/* =====================================
   FLASHCARD WEBSITE - JAVASCRIPT
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("FlashCard Website Loaded Successfully!");

    // =================================
    // QUIZ SYSTEM
    // =================================

    const quizForms = document.querySelectorAll("#quiz form");

    // Correct Answers for Different Pages

    const pageName = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    let correctAnswers = {};

    if (pageName === "python.html") {

        correctAnswers = {
            q1: "b",
            q2: "b",
            q3: "a",
            q4: "b"
        };

    } else if (pageName === "html.html") {

        correctAnswers = {
            q1: "a",
            q2: "b",
            q3: "c"
        };

    }

    // Quiz Form Functionality

    quizForms.forEach(function (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            let score = 0;
            let total = Object.keys(correctAnswers).length;

            if (total === 0) {
                alert("Quiz answer key is not configured for this page.");
                return;
            }

            // Check Every Answer

            for (let question in correctAnswers) {

                const selectedAnswer = form.querySelector(
                    'input[name="' + question + '"]:checked'
                );

                if (selectedAnswer &&
                    selectedAnswer.value === correctAnswers[question]) {

                    score++;

                }

            }

            // Calculate Percentage

            let percentage = Math.round((score / total) * 100);

            // Result Message

            let message = "";

            if (percentage === 100) {

                message = "Excellent! Perfect Score!";

            } else if (percentage >= 70) {

                message = "Great Job! Keep Learning!";

            } else if (percentage >= 40) {

                message = "Good Try! Practice More!";

            } else {

                message = "Keep Practicing! You Can Do It!";

            }

            // Display Result

            let resultBox = form.querySelector(".quiz-result");

            if (!resultBox) {

                resultBox = document.createElement("div");

                resultBox.className = "quiz-result";

                form.appendChild(resultBox);

            }

            resultBox.innerHTML = `
                <h3>Quiz Result</h3>

                <p>Your Score: ${score} / ${total}</p>

                <p>Percentage: ${percentage}%</p>

                <h3>${message}</h3>

                <button type="button" class="retry-quiz">
                    Try Again
                </button>
            `;

            // Scroll to Result

            resultBox.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            // Retry Quiz

            const retryButton = resultBox.querySelector(".retry-quiz");

            retryButton.addEventListener("click", function () {

                form.reset();

                resultBox.remove();

            });

        });

    });

    // =================================
    // SMOOTH SCROLLING
    // =================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const target = document.querySelector(
                link.getAttribute("href")
            );

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

});

// CONTACT FORM SUCCESS POPUP

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = contactForm.querySelector(
            'input[name="name"]'
        );

        const userName = name ? name.value.trim() : "";

        const popup = document.getElementById("successPopup");

        const message = document.getElementById("successMessage");

        if (message) {
            message.textContent =
                "Thank you " + (userName || "for contacting us") +
                "! Your message has been submitted successfully.";
        }

        if (popup) {
            popup.classList.add("show");
        }

        contactForm.reset();

    });

    const closeButton = document.getElementById("closePopup");

    if (closeButton) {
        closeButton.addEventListener("click", function () {
            document.getElementById("successPopup").classList.remove("show");
        });
    }

});