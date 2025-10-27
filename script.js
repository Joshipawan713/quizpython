document.addEventListener('DOMContentLoaded', function() {
    // Question navigation
    const questionBoxes = document.querySelectorAll('.question-box');
    const nextButton = document.querySelector('.btn-next');
    const prevButton = document.querySelector('.btn-prev');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.querySelector('.progress-text');
    const timerElement = document.getElementById('timer');
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    
    let currentQuestion = 1;
    const totalQuestions = 10;
    
    // Update progress bar
    function updateProgress() {
        const progress = (currentQuestion / totalQuestions) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}% Complete`;
    }
    
    // Update question navigation
    function updateQuestionNavigation() {
        questionBoxes.forEach((box, index) => {
            box.classList.remove('active');
            if (index + 1 === currentQuestion) {
                box.classList.add('active');
            }
            
            // Mark questions as answered (for demo, marking first 3 as answered)
            // if (index < 3) {
            //     box.classList.add('answered');
            // }
        });
        
        // Update navigation buttons
        prevButton.disabled = currentQuestion === 1;
        nextButton.textContent = currentQuestion === totalQuestions ? 
            'Submit Quiz' :
            'Next Question';
    }
    
    // Navigate to question
    function navigateToQuestion(questionNumber) {
        currentQuestion = questionNumber;
        updateProgress();
        updateQuestionNavigation();
        
        // Update question display (in a real app, this would load the actual question)
        document.querySelector('.question-number').textContent = `Question ${currentQuestion} of ${totalQuestions}`;
        document.querySelector('.question-text').textContent = `This is question ${currentQuestion}. Select the best answer from the options below.`;
        
        // Clear any selected options for the new question
        radioButtons.forEach(radio => {
            radio.checked = false;
        });
    }
    
    // Timer functionality
    function startTimer() {
        let timeLeft = 15 * 60; // 15 minutes in seconds
        
        const timerInterval = setInterval(() => {
            timeLeft--;
            
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert('Time is up! Submitting your quiz.');
                // Submit the quiz automatically
            }
        }, 1000);
    }
    
    // Mark question as answered when an option is selected
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            // Mark current question as answered
            questionBoxes[currentQuestion - 1].classList.add('answered');
        });
    });
    
    // Event listeners
    questionBoxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            navigateToQuestion(index + 1);
        });
    });
    
    nextButton.addEventListener('click', () => {
        if (currentQuestion < totalQuestions) {
            navigateToQuestion(currentQuestion + 1);
        } else {
            // Submit the quiz
            alert('Quiz submitted successfully!');
        }
    });
    
    prevButton.addEventListener('click', () => {
        if (currentQuestion > 1) {
            navigateToQuestion(currentQuestion - 1);
        }
    });
    
    // Initialize
    updateProgress();
    updateQuestionNavigation();
    startTimer();
});