document.addEventListener('DOMContentLoaded', function() {
    // Create Chat Widget Elements
    const chatWidget = document.createElement('div');
    chatWidget.id = 'ai-chat-widget';
    chatWidget.innerHTML = `
        <div class="chat-toggle-btn" id="chat-toggle">
            <span class="chat-icon">??</span>
            <span class="chat-text">Chat with AI</span>
        </div>
        <div class="chat-window" id="chat-window">
            <div class="chat-header">
                <div class="chat-title">
                    <span class="status-dot"></span>
                    Lavelle's AI Assistant
                </div>
                <button class="chat-close" id="chat-close">×</button>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="message ai-message">
                    Hello! I'm Lavelle's AI assistant. I can help you book a service, check NCT info, or answer general questions. How can I help you today?
                </div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Type your message...">
                <button id="chat-send">?</button>
            </div>
            <div class="chat-actions">
                <a href="https://wa.me/353871234567" target="_blank" class="whatsapp-btn">
                    <i class="fab fa-whatsapp"></i> Chat on WhatsApp
                </a>
            </div>
        </div>
    `;
    document.body.appendChild(chatWidget);

    // Elements
    const toggleBtn = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeBtn = document.getElementById('chat-close');
    const sendBtn = document.getElementById('chat-send');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');

    // Toggle Chat
    function toggleChat() {
        chatWindow.classList.toggle('active');
        toggleBtn.classList.toggle('hidden');
    }

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // Send Message
    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        // User Message
        addMessage(text, 'user-message');
        input.value = '';

        // AI Response (Simulation)
        setTimeout(() => {
            const response = getAIResponse(text);
            addMessage(response, 'ai-message');
        }, 1000);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function addMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', className);
        msgDiv.textContent = text;
        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    function getAIResponse(text) {
        text = text.toLowerCase();
        if (text.includes('book') || text.includes('appointment')) {
            return "You can book an appointment using the form above! Or would you like me to send you the booking link?";
        }
        if (text.includes('nct')) {
            return "We offer Pre-NCT checks and can even take your car to the test center for you. Check our Services section.";
        }
        if (text.includes('price') || text.includes('cost')) {
            return "Prices vary depending on the service. A standard diagnostic is €50. For a full quote, please book an evaluation.";
        }
        if (text.includes('location') || text.includes('where')) {
            return "We are located in Achill Sound, Co. Mayo.";
        }
        return "I'm just a simple AI. For complex queries, please call Ethan or use the WhatsApp button below.";
    }
});
