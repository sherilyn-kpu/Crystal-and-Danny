
let personas = {};
let currentPersona = 'Crystal';

// Load personas from JSON file
fetch('personas.json')
    .then(response => response.json())
    .then(data => {
        personas = data;
    });

function switchPersona() {
    const personaSelect = document.getElementById('persona');
    currentPersona = personaSelect.value;
    addMessage(`Switched to ${currentPersona}`, 'system');
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        userInput.value = '';
        getResponse(message);
    }
}

function addMessage(message, sender) {
    const chatLog = document.getElementById('chat-log');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
}

function getResponse(message) {
    const persona = personas[currentPersona];
    const response = generateResponse(message, persona);
    setTimeout(() => {
        addMessage(response, 'bot');
    }, 1000);
}

function generateResponse(message, persona) {
    // Simple response generation based on persona attributes
    if (message.toLowerCase().includes('how are you')) {
        return `${persona.name} says: I'm feeling ${persona.emotional_state}.`;
    } else if (message.toLowerCase().includes('baby')) {
        return `${persona.name} says: My baby Keith is ${persona.concerns}.`;
    } else {
        return `${persona.name} says: I'm not sure how to answer that. Can you ask something else?`;
    }
}
