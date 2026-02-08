/* =============================================
   MCGINTY'S GARAGE - AI VOICE ASSISTANT
   Voice-enabled booking and navigation helper
   Designed for accessibility (aging community)
   ============================================= */

(function() {
    'use strict';

    const VoiceAssistant = {
        recognition: null,
        synthesis: window.speechSynthesis,
        isListening: false,
        isSupported: false,
        
        // Greeting messages
        greetings: [
            "Hello! Welcome to McGinty's Garage. How can I help you today?",
            "Hi there! I'm here to help you book a service or find what you need.",
            "Welcome! Would you like to book a service or ask me something?"
        ],

        // Voice commands mapping
        commands: {
            booking: ['book', 'booking', 'appointment', 'schedule', 'service'],
            call: ['call', 'phone', 'ring', 'contact'],
            services: ['services', 'what do you do', 'repairs', 'fix'],
            hours: ['hours', 'open', 'when', 'time'],
            location: ['where', 'location', 'address', 'find you', 'directions'],
            emergency: ['emergency', 'breakdown', 'stuck', 'help', 'urgent'],
            upgrades: ['upgrade', 'camera', 'suspension', 'prevention', 'safety'],
            hello: ['hello', 'hi', 'hey', 'good morning', 'good afternoon']
        },

        // Responses
        responses: {
            booking: "I'll help you book a service. Let me open the booking page for you.",
            call: "I'll connect you now. The number is 085-102-6371.",
            services: "We offer diagnostics, NCT prep, oil changes, brakes, tyres, and more. Would you like to book a service?",
            hours: "We're open Monday to Friday 6pm to 9pm, and Saturday 9am to 2pm. For emergencies, call anytime.",
            location: "We're located in Achill Sound, Achill Island, County Mayo. Easy to find!",
            emergency: "For emergencies, call 085-102-6371 right now. Ethan is available 24/7 for breakdowns.",
            upgrades: "Great choice! We have reversing cameras, suspension upgrades, dash cams, and more. Let me show you our upgrades section.",
            hello: "Hello! How can I help you today? You can say 'book a service', 'call the garage', or ask about our services.",
            unknown: "I didn't quite catch that. You can say 'book a service', 'call now', or 'what services do you offer'."
        },

        init() {
            // Check for browser support
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                this.isSupported = true;
                this.setupRecognition();
            } else {
                console.log('Voice recognition not supported in this browser');
            }
            
            this.createUI();
            this.bindEvents();
            
            // Auto-greet after 3 seconds on first visit
            if (!sessionStorage.getItem('mcgintys_greeted')) {
                setTimeout(() => {
                    this.greet();
                    sessionStorage.setItem('mcgintys_greeted', 'true');
                }, 3000);
            }
        },

        setupRecognition() {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-IE';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                console.log('Heard:', transcript);
                this.processCommand(transcript);
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.updateUI();
            };

            this.recognition.onerror = (event) => {
                console.log('Speech recognition error:', event.error);
                this.isListening = false;
                this.updateUI();
                if (event.error === 'no-speech') {
                    this.speak("I didn't hear anything. Tap the microphone and try again.");
                }
            };
        },

        createUI() {
            // Create assistant container
            const container = document.createElement('div');
            container.id = 'voice-assistant';
            container.innerHTML = `
                <div class="va-bubble" id="va-bubble">
                    <div class="va-avatar">
                        <span class="va-icon">🎙️</span>
                        <div class="va-pulse"></div>
                    </div>
                </div>
                <div class="va-panel" id="va-panel">
                    <div class="va-header">
                        <div class="va-title">
                            <span class="va-name">McGinty's Assistant</span>
                            <span class="va-status" id="va-status">Ready to help</span>
                        </div>
                        <button class="va-close" id="va-close" aria-label="Close assistant">&times;</button>
                    </div>
                    <div class="va-messages" id="va-messages">
                        <div class="va-message va-bot">
                            <p>Hello! I'm here to help. Tap the microphone or type below.</p>
                        </div>
                    </div>
                    <div class="va-input-area">
                        <input type="text" id="va-text-input" placeholder="Type or speak..." aria-label="Type your message">
                        <button class="va-mic-btn ${this.isSupported ? '' : 'va-disabled'}" id="va-mic-btn" aria-label="Speak">
                            🎤
                        </button>
                        <button class="va-send-btn" id="va-send-btn" aria-label="Send">
                            ➤
                        </button>
                    </div>
                    <div class="va-quick-actions">
                        <button class="va-quick-btn" data-action="booking">📅 Book Service</button>
                        <button class="va-quick-btn" data-action="call">📞 Call Now</button>
                        <button class="va-quick-btn" data-action="upgrades">🛡️ Upgrades</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(container);
            this.addStyles();
        },

        addStyles() {
            if (document.getElementById('va-styles')) return;
            
            const styles = document.createElement('style');
            styles.id = 'va-styles';
            styles.textContent = `
                #voice-assistant {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 10000;
                    font-family: 'Roboto', -apple-system, sans-serif;
                }

                .va-bubble {
                    width: 70px;
                    height: 70px;
                    background: linear-gradient(135deg, #005A9C 0%, #003d6b 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(0, 90, 156, 0.4);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    position: relative;
                }

                .va-bubble:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 30px rgba(0, 90, 156, 0.5);
                }

                .va-bubble.listening {
                    animation: va-glow 1.5s ease-in-out infinite;
                }

                @keyframes va-glow {
                    0%, 100% { box-shadow: 0 4px 20px rgba(0, 90, 156, 0.4); }
                    50% { box-shadow: 0 4px 40px rgba(253, 184, 19, 0.8); }
                }

                .va-avatar {
                    position: relative;
                }

                .va-icon {
                    font-size: 32px;
                }

                .va-pulse {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: rgba(253, 184, 19, 0.3);
                    animation: va-pulse 2s ease-out infinite;
                    pointer-events: none;
                }

                @keyframes va-pulse {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
                }

                .va-panel {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 350px;
                    max-width: calc(100vw - 40px);
                    background: #fff;
                    border-radius: 20px;
                    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.2);
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                }

                .va-panel.open {
                    display: flex;
                    animation: va-slideUp 0.3s ease;
                }

                @keyframes va-slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .va-header {
                    background: linear-gradient(135deg, #005A9C 0%, #003d6b 100%);
                    color: white;
                    padding: 16px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .va-title {
                    display: flex;
                    flex-direction: column;
                }

                .va-name {
                    font-weight: 700;
                    font-size: 1.1rem;
                }

                .va-status {
                    font-size: 0.8rem;
                    opacity: 0.8;
                }

                .va-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 28px;
                    cursor: pointer;
                    padding: 0;
                    line-height: 1;
                    opacity: 0.8;
                }

                .va-close:hover {
                    opacity: 1;
                }

                .va-messages {
                    flex: 1;
                    max-height: 300px;
                    overflow-y: auto;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .va-message {
                    max-width: 85%;
                    padding: 12px 16px;
                    border-radius: 18px;
                    font-size: 0.95rem;
                    line-height: 1.4;
                }

                .va-message p {
                    margin: 0;
                }

                .va-bot {
                    background: #f0f4f8;
                    color: #1a1a1a;
                    align-self: flex-start;
                    border-bottom-left-radius: 4px;
                }

                .va-user {
                    background: #005A9C;
                    color: white;
                    align-self: flex-end;
                    border-bottom-right-radius: 4px;
                }

                .va-input-area {
                    display: flex;
                    gap: 8px;
                    padding: 12px 16px;
                    border-top: 1px solid #eee;
                }

                #va-text-input {
                    flex: 1;
                    padding: 12px 16px;
                    border: 2px solid #e0e0e0;
                    border-radius: 25px;
                    font-size: 1rem;
                    outline: none;
                    transition: border-color 0.2s;
                }

                #va-text-input:focus {
                    border-color: #005A9C;
                }

                .va-mic-btn, .va-send-btn {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    border: none;
                    font-size: 1.3rem;
                    cursor: pointer;
                    transition: transform 0.2s, background 0.2s;
                }

                .va-mic-btn {
                    background: #FDB813;
                }

                .va-mic-btn:hover {
                    transform: scale(1.1);
                }

                .va-mic-btn.listening {
                    background: #D40000;
                    animation: va-mic-pulse 1s ease-in-out infinite;
                }

                @keyframes va-mic-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .va-mic-btn.va-disabled {
                    background: #ccc;
                    cursor: not-allowed;
                }

                .va-send-btn {
                    background: #005A9C;
                    color: white;
                }

                .va-send-btn:hover {
                    background: #003d6b;
                }

                .va-quick-actions {
                    display: flex;
                    gap: 8px;
                    padding: 12px 16px;
                    background: #f8f9fa;
                    flex-wrap: wrap;
                }

                .va-quick-btn {
                    flex: 1;
                    min-width: 90px;
                    padding: 10px 12px;
                    background: white;
                    border: 2px solid #e0e0e0;
                    border-radius: 12px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .va-quick-btn:hover {
                    border-color: #005A9C;
                    background: #f0f7ff;
                }

                @media (max-width: 480px) {
                    #voice-assistant {
                        bottom: 10px;
                        right: 10px;
                    }
                    
                    .va-bubble {
                        width: 60px;
                        height: 60px;
                    }
                    
                    .va-icon {
                        font-size: 28px;
                    }
                    
                    .va-panel {
                        width: calc(100vw - 20px);
                        bottom: 70px;
                        right: 0;
                    }
                }
            `;
            document.head.appendChild(styles);
        },

        bindEvents() {
            const bubble = document.getElementById('va-bubble');
            const panel = document.getElementById('va-panel');
            const closeBtn = document.getElementById('va-close');
            const micBtn = document.getElementById('va-mic-btn');
            const sendBtn = document.getElementById('va-send-btn');
            const textInput = document.getElementById('va-text-input');
            const quickBtns = document.querySelectorAll('.va-quick-btn');

            bubble.addEventListener('click', () => this.togglePanel());
            closeBtn.addEventListener('click', () => this.closePanel());
            
            if (this.isSupported) {
                micBtn.addEventListener('click', () => this.toggleListening());
            }
            
            sendBtn.addEventListener('click', () => this.sendTextMessage());
            textInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendTextMessage();
            });

            quickBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const action = btn.dataset.action;
                    this.executeAction(action);
                });
            });
        },

        togglePanel() {
            const panel = document.getElementById('va-panel');
            panel.classList.toggle('open');
        },

        closePanel() {
            const panel = document.getElementById('va-panel');
            panel.classList.remove('open');
        },

        toggleListening() {
            if (this.isListening) {
                this.recognition.stop();
            } else {
                this.startListening();
            }
        },

        startListening() {
            if (!this.isSupported) return;
            
            try {
                this.recognition.start();
                this.isListening = true;
                this.updateUI();
                this.updateStatus('Listening...');
            } catch (e) {
                console.log('Recognition already started');
            }
        },

        updateUI() {
            const bubble = document.getElementById('va-bubble');
            const micBtn = document.getElementById('va-mic-btn');
            
            if (this.isListening) {
                bubble.classList.add('listening');
                micBtn.classList.add('listening');
            } else {
                bubble.classList.remove('listening');
                micBtn.classList.remove('listening');
            }
        },

        updateStatus(text) {
            const status = document.getElementById('va-status');
            if (status) status.textContent = text;
        },

        sendTextMessage() {
            const input = document.getElementById('va-text-input');
            const text = input.value.trim();
            if (!text) return;
            
            this.addMessage(text, 'user');
            input.value = '';
            this.processCommand(text.toLowerCase());
        },

        addMessage(text, sender) {
            const messages = document.getElementById('va-messages');
            const msg = document.createElement('div');
            msg.className = `va-message va-${sender}`;
            msg.innerHTML = `<p>${text}</p>`;
            messages.appendChild(msg);
            messages.scrollTop = messages.scrollHeight;
        },

        processCommand(text) {
            let matched = false;
            
            for (const [action, keywords] of Object.entries(this.commands)) {
                if (keywords.some(kw => text.includes(kw))) {
                    this.executeAction(action);
                    matched = true;
                    break;
                }
            }
            
            if (!matched) {
                this.respond('unknown');
            }
        },

        executeAction(action) {
            const response = this.responses[action] || this.responses.unknown;
            this.respond(action);
            
            // Execute action after speaking
            setTimeout(() => {
                switch (action) {
                    case 'booking':
                        window.location.href = '/booking';
                        break;
                    case 'call':
                        window.location.href = 'tel:0851026371';
                        break;
                    case 'upgrades':
                        const upgradesSection = document.getElementById('upgrades');
                        if (upgradesSection) {
                            upgradesSection.scrollIntoView({ behavior: 'smooth' });
                            this.closePanel();
                        } else {
                            window.location.href = '/services#upgrades';
                        }
                        break;
                    case 'services':
                        window.location.href = '/services';
                        break;
                }
            }, 2000);
        },

        respond(action) {
            const response = this.responses[action] || this.responses.unknown;
            this.addMessage(response, 'bot');
            this.speak(response);
            this.updateStatus('Ready to help');
        },

        speak(text) {
            if (!this.synthesis) return;
            
            // Cancel any ongoing speech
            this.synthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-IE';
            utterance.rate = 0.9;
            utterance.pitch = 1;
            
            // Try to use a friendly voice
            const voices = this.synthesis.getVoices();
            const irishVoice = voices.find(v => v.lang.includes('en-IE') || v.lang.includes('en-GB'));
            if (irishVoice) utterance.voice = irishVoice;
            
            this.synthesis.speak(utterance);
        },

        greet() {
            const greeting = this.greetings[Math.floor(Math.random() * this.greetings.length)];
            this.speak(greeting);
            
            // Open panel after greeting
            setTimeout(() => {
                const panel = document.getElementById('va-panel');
                if (panel) panel.classList.add('open');
            }, 1000);
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => VoiceAssistant.init());
    } else {
        VoiceAssistant.init();
    }

    // Expose globally
    window.McGintysVoice = VoiceAssistant;

})();
