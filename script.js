// Get the button, joke display area, and sound elements
const button = document.getElementById('generate-btn');
const jokeDisplay = document.getElementById('joke');
const clickSound = document.getElementById('click-sound');
const jokeSound = document.getElementById('joke-sound');
const confettiContainer = document.getElementById('confetti-container');

// Fetch a random joke from the JokeAPI
async function fetchJoke() {
    try {
        // Play the click sound effect
        clickSound.play();

        // Fetch a joke (change API options to customize)
        const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
        
        if (!response.ok) {
            throw new Error("Failed to fetch joke.");
        }

        const data = await response.json();
        
        // Check if the joke is a setup-punchline or a single-line joke
        if (data.type === 'single') {
            jokeDisplay.textContent = data.joke;
        } else {
            jokeDisplay.textContent = `${data.setup} - ${data.delivery}`;
        }

        // Play the joke sound effect
        jokeSound.play();

        // Trigger confetti animation
        triggerConfetti();

        // Apply fade-in effect for the joke
        jokeDisplay.classList.remove('fade-out');
        jokeDisplay.classList.add('fade-in');

    } catch (error) {
        jokeDisplay.textContent = 'Oops! Something went wrong. Try again!';
        console.error(error);
    }
}

// Trigger confetti effect
function triggerConfetti() {
    // Create multiple confetti elements
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
        confetti.style.animationDelay = `${Math.random() * 1}s`;
        confettiContainer.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 2500);
    }
}

// Event listener for button click
button.addEventListener('click', fetchJoke);

// Optional: Fetch an initial joke when the page loads
fetchJoke();
