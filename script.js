document.addEventListener('DOMContentLoaded', () => {
   
    const introScreen = document.querySelector('.intro-screen');
const typewriter = document.querySelector('.typewriter');
const welcomeText = document.querySelector('.welcome-text');
const text = "Hi, I am Pawan";
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typewriter.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // 100ms per letter
    } else {
        welcomeText.classList.add('visible'); // Show "Welcome"
    }
}

typeWriter();

// Fade out intro after 3 seconds total
setTimeout(() => {
    introScreen.classList.add('hidden');
    setTimeout(() => {
        introScreen.style.display = 'none';
    }, 500); // Matches CSS fade duration
}, 2000); // 1.5s typing + 1.5s delay
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
            navMenu.classList.remove('active');
        });
    });

    // Dark/light mode toggle
    const modeToggle = document.querySelector('.mode-toggle');
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    modeToggle.textContent = isDark ? '🌙' : '☀'; // Moon for dark, Sun for light
    modeToggle.setAttribute('aria-label', isDark ? 'Toggle light mode' : 'Toggle dark mode');
    particlesJS.load('particles-js', {
        "particles": {
            "color": { "value": isDark ? "#e74c3c" : "#34495e" },
            "line_linked": { "color": isDark ? "#e74c3c" : "#34495e" }
        }
    }, () => {
        particlesJS('particles-js', window.particlesJSConfig);
    });
});
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));
    // Project card pop-up modal
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDesc = modal.querySelector('.modal-desc');
    const closeModal = modal.querySelector('.close-modal');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.querySelector('img').src;
            const title = card.querySelector('h3').textContent;
            const desc = card.querySelector('p').textContent;

            modalImage.src = imgSrc;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modal.classList.add('active');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});
const chatbotBubble = document.querySelector('.ai-chatbot-bubble');
const chatbotWindow = document.getElementById('ai-chatbot-window');
const chatbotMessages = document.getElementById('ai-chatbot-messages');
const chatbotInput = document.getElementById('ai-chatbot-input');
const chatbotForm = document.querySelector('.ai-chatbot-input');

const GEMINI_API_KEY = 'AIzaSyDfos0v1ETDQwvF6Q8o-EVFOCXmbK7AU-k'; // Replace with your Gemini key

chatbotBubble.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
    if (chatbotWindow.classList.contains('active') && chatbotMessages.innerHTML === '') {
        chatbotMessages.innerHTML = '<p class="bot">Hey! I’m Pawan’s AI assistant, powered by Gemini. What’s on your mind?</p>';
    }
});

chatbotForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = chatbotInput.value.trim();
    if (userMessage === '') return;

    chatbotMessages.innerHTML += `<p class="user">${userMessage}</p>`;
    chatbotInput.value = '';
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    chatbotMessages.innerHTML += '<p class="bot">Thinking...</p>';
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: `You are an AI assistant for Pawan’s portfolio website. Be helpful, friendly, and concise. Offer to scroll to sections like "projects" or "contact" when relevant. User asks: ${userMessage}` }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();
        if (data.candidates && data.candidates.length > 0) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            chatbotMessages.removeChild(chatbotMessages.lastElementChild);
            chatbotMessages.innerHTML += `<p class="bot">${aiResponse}</p>`;

            if (aiResponse.toLowerCase().includes('project')) {
                chatbotMessages.innerHTML += '<p class="bot"><button class="chatbot-btn" onclick="document.getElementById(\'projects\').scrollIntoView({ behavior: \'smooth\' });">Go to Projects</button></p>';
            } else if (aiResponse.toLowerCase().includes('contact')) {
                chatbotMessages.innerHTML += '<p class="bot"><button class="chatbot-btn" onclick="document.getElementById(\'contact\').scrollIntoView({ behavior: \'smooth\' });">Go to Contact</button></p>';
            }
        } else {
            throw new Error('No response from Gemini');
        }
    } catch (error) {
        console.error('Gemini error:', error);
        chatbotMessages.removeChild(chatbotMessages.lastElementChild);
        chatbotMessages.innerHTML += '<p class="bot">Oops, something went wrong. Try again?</p>';
    }
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
});

const style = document.createElement('style');
style.textContent = '.chatbot-btn { background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 5px; } .chatbot-btn:hover { background: #c0392b; }';
document.head.appendChild(style);
// Particle background config
window.particlesJSConfig = {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#34495e" },
        "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
        "opacity": { "value": 0.5, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#34495e", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out" }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 } }
    },
    "retina_detect": true
};
console.log('Particles initialized');
particlesJS('particles-js', window.particlesJSConfig);


document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && (event.key === "u" || event.key === "c" || event.key === "x" || event.key === "s" || event.key === "v")) {
      event.preventDefault();
      alert("Keyboard shortcuts are disabled on this site!");
    }
  });

