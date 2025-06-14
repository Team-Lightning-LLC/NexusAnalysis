// analyze.js - Updated version
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const messagesContainer = document.getElementById('messages');
    const summaryModal = document.getElementById('summaryModal');
    
    // Session state
    let currentSession = {
        id: 'A7B3',
        startTime: new Date(),
        messages: [],
        activeDocument: 'VMFXX',
        topics: new Set(),
        documentsUsed: new Set(['VMFXX'])
    };
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update buttons
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(`${targetTab}-tab`).classList.remove('hidden');
        });
    });
    
    // Document selection
    document.querySelectorAll('.document-item').forEach(item => {
        item.addEventListener('click', function() {
            // Update active state
            document.querySelectorAll('.document-item').forEach(doc => {
                doc.classList.remove('active');
                doc.querySelector('.status-dot').classList.remove('active');
            });
            this.classList.add('active');
            this.querySelector('.status-dot').classList.add('active');
            
            // Update current document
            const docName = this.querySelector('.doc-name').textContent;
            currentSession.activeDocument = docName;
            document.querySelector('.context-fund').textContent = docName;
            currentSession.documentsUsed.add(docName);
        });
    });
    
    // History item selection
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', function() {
            // Update active state
            document.querySelectorAll('.history-item').forEach(hist => {
                hist.classList.remove('active');
            });
            this.classList.add('active');
            
            // Load chat (simulated)
            const title = this.querySelector('.history-title').textContent;
            if (title !== 'Current Session') {
                alert(`Loading chat: ${title}`);
            }
        });
    });
    
    // Auto-resize textarea
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
    
    // Send message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        
        // Clear input
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        // Store in session
        currentSession.messages.push({
            type: 'user',
            content: message,
            timestamp: new Date()
        });
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate AI response
        setTimeout(() => {
            removeTypingIndicator();
            const response = generateResponse(message);
            addMessage(response.content, 'assistant');
            
            // Update session
            currentSession.messages.push({
                type: 'assistant',
                content: response.content,
                timestamp: new Date()
            });
            
            // Update topics
            response.topics.forEach(topic => currentSession.topics.add(topic));
            
            // Show summary button after a few messages
            if (currentSession.messages.length >= 4) {
                document.querySelector('.summary-fab').style.display = 'flex';
            }
            
            // Update message count in current session
            updateCurrentSessionInfo();
        }, 1500);
    }
    
    // Send button click
    sendBtn.addEventListener('click', sendMessage);
    
    // Enter key to send
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Add message to chat
    function addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        if (type === 'assistant') {
            messageDiv.innerHTML = `
                <div class="avatar">
                    <div class="ai-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8zm0-13a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1zm0 8a1 1 0 100 2 1 1 0 000-2z"/>
                        </svg>
                    </div>
                </div>
                <div class="message-content">${content}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="avatar">👤</div>
                <div class="message-content">${content}</div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Typing indicator
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message assistant typing-indicator';
        indicator.innerHTML = `
            <div class="avatar">
                <div class="ai-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8zm0-13a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1zm0 8a1 1 0 100 2 1 1 0 000-2z"/>
                    </svg>
                </div>
            </div>
            <div class="message-content">
                <span>•</span><span>•</span><span>•</span>
            </div>
        `;
        messagesContainer.appendChild(indicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function removeTypingIndicator() {
        const indicator = document.querySelector('.typing-indicator');
        if (indicator) indicator.remove();
    }
    
    // Generate AI response
    function generateResponse(query) {
        const lowerQuery = query.toLowerCase();
        let response = {
            content: '',
            topics: []
        };
        
        if (lowerQuery.includes('analyze') || lowerQuery.includes('vmfxx')) {
            response.topics = ['Fund Analysis', 'VMFXX Details'];
            response.content = `
                <p>I'll analyze VMFXX for you.</p>
                <p><strong>Key Metrics:</strong></p>
                <ul>
                    <li>7-Day SEC Yield: 5.28%</li>
                    <li>Expense Ratio: 0.11%</li>
                    <li>Total Assets: $326.5 billion</li>
                    <li>Minimum Investment: $3,000</li>
                </ul>
                <p>VMFXX is a government money market fund that invests in US Treasury securities and government agency debt, making it one of the safest money market options available.</p>
            `;
        } else if (lowerQuery.includes('compare')) {
            response.topics = ['Fund Comparison', 'Yield Analysis'];
            response.content = `
                <p>Here's a comparison of all three funds:</p>
                <p><strong>VMFXX:</strong> 5.28% yield, 0.11% expense ratio, $3,000 minimum</p>
                <p><strong>VMRXX:</strong> 5.29% yield, 0.10% expense ratio, $5M minimum</p>
                <p><strong>SPAXX:</strong> 5.01% yield, 0.42% expense ratio, $1 minimum</p>
                <p>For retail investors, VMFXX offers the best balance of yield and accessibility.</p>
            `;
        } else {
            response.topics = ['General Query'];
            response.content = `
                <p>I can help you analyze these money market funds. Try asking about:</p>
                <ul>
                    <li>Individual fund analysis</li>
                    <li>Risk assessments</li>
                    <li>Fee comparisons</li>
                    <li>Investment minimums</li>
                </ul>
            `;
        }
        
        return response;
    }
    
    // Quick actions
    window.sendQuickQuery = function(button) {
        messageInput.value = button.textContent.trim();
        sendMessage();
    };
    
    // Context management
    window.clearContext = function() {
        currentSession.activeDocument = null;
        document.querySelector('.context-indicator').style.display = 'none';
    };
    
    // New chat function
    window.startNewChat = function() {
        if (currentSession.messages.length > 0) {
            if (!confirm('Start a new chat? Current conversation will be saved to history.')) {
                return;
            }
        }
        
        // Clear messages
        messagesContainer.innerHTML = `
            <div class="message assistant">
                <div class="avatar">
                    <div class="ai-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8zm0-13a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1zm0 8a1 1 0 100 2 1 1 0 000-2z"/>
                        </svg>
                    </div>
                </div>
                <div class="message-content">
                    <p>Hello! I'm your AI financial advisor. I have access to the prospectuses for <strong>VMFXX</strong>, <strong>VMRXX</strong>, and <strong>SPAXX</strong>.</p>
                    <p>I can help you:</p>
                    <ul>
                        <li>Analyze individual fund characteristics</li>
                        <li>Compare funds side-by-side</li>
                        <li>Identify risks and opportunities</li>
                        <li>Answer specific questions about holdings, fees, or performance</li>
                    </ul>
                    <p>What would you like to know?</p>
                </div>
            </div>
        `;
        
        // Reset session
        currentSession = {
            id: generateSessionId(),
            startTime: new Date(),
            messages: [],
            activeDocument: 'VMFXX',
            topics: new Set(),
            documentsUsed: new Set(['VMFXX'])
        };
        
        // Update UI
        document.querySelector('.session-id').textContent = `Session #${currentSession.id}`;
        document.querySelector('.session-time').textContent = `Started ${formatTime(currentSession.startTime)}`;
        document.querySelector('.summary-fab').style.display = 'none';
        
        alert('New chat started!');
    };
    
    // Update current session info
    function updateCurrentSessionInfo() {
        const currentSessionItem = document.querySelector('.history-item.active');
        if (currentSessionItem) {
            const messageCount = currentSession.messages.length;
            currentSessionItem.querySelector('.history-meta').textContent = 
                `Started ${formatTime(currentSession.startTime)} • ${messageCount} message${messageCount !== 1 ? 's' : ''}`;
        }
    }
    
    // Generate session ID
    function generateSessionId() {
        return Math.random().toString(36).substr(2, 4).toUpperCase();
    }
    
    // Format time
    function formatTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }
    
    // Summary modal functions
    window.showSummary = function() {
        updateSummaryContent();
        summaryModal.style.display = 'flex';
    };
    
    window.closeSummary = function() {
        summaryModal.style.display = 'none';
    };
    
    // Click outside to close
    summaryModal.addEventListener('click', function(e) {
        if (e.target === summaryModal) {
            closeSummary();
        }
    });
    
    function updateSummaryContent() {
        // Update topics
        const topicContainer = document.querySelector('.topic-tags');
        topicContainer.innerHTML = Array.from(currentSession.topics).map(topic => 
            `<span class="tag">${topic}</span>`
        ).join('');
        
        // Update document references
        const docRefs = document.querySelector('.doc-refs');
        const docsUsed = Array.from(currentSession.documentsUsed);
        docRefs.innerHTML = docsUsed.map(doc => `
            <div class="doc-ref">
                <span>${getDocIcon(doc)} ${doc} Prospectus</span>
                <span class="pages">Pages ${generatePages()}</span>
            </div>
        `).join('');
    }
    
    function getDocIcon(doc) {
        const icons = {
            'VMFXX': '📊',
            'VMRXX': '📈',
            'SPAXX': '💰'
        };
        return icons[doc] || '📄';
    }
    
    function generatePages() {
        const start = Math.floor(Math.random() * 40) + 1;
        const end = start + Math.floor(Math.random() * 10) + 2;
        return `${start}-${end}`;
    }
    
    // Summary actions
    window.saveSummary = function() {
        alert('Summary saved to compliance records');
        closeSummary();
    };
    
    window.generateReport = function() {
        alert('Generating comprehensive report...');
        setTimeout(() => {
            alert('Report generated and sent to your email');
            closeSummary();
        }, 2000);
    };
});
