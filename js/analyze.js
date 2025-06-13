// analyze.js
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    
    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        
        // Clear input
        chatInput.value = '';
        chatInput.style.height = 'auto';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate AI response
        setTimeout(() => {
            removeTypingIndicator();
            const response = generateAIResponse(message);
            addMessage(response, 'assistant');
        }, 1500);
    }
    
    // Handle send button click
    sendButton.addEventListener('click', sendMessage);
    
    // Handle enter key
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Add message to chat
    function addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = type === 'user' ? '👤' : '🤖';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = content;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message assistant typing-indicator';
        indicator.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const indicator = document.querySelector('.typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    // Generate AI response (mock responses for demo)
    function generateAIResponse(query) {
        const lowerQuery = query.toLowerCase();
        
        if (lowerQuery.includes('analyze') && lowerQuery.includes('vmfxx')) {
            return `
                <h3>VMFXX Analysis</h3>
                <p>Here's a comprehensive analysis of the Vanguard Federal Money Market Fund (VMFXX):</p>
                
                <h4>Key Characteristics:</h4>
                <ul>
                    <li><strong>Fund Type:</strong> Government Money Market Fund</li>
                    <li><strong>7-Day SEC Yield:</strong> 5.28%</li>
                    <li><strong>Expense Ratio:</strong> 0.11%</li>
                    <li><strong>Total Assets:</strong> $326.5 billion</li>
                </ul>
                
                <h4>Investment Strategy:</h4>
                <p>VMFXX invests at least 99.5% of its total assets in cash, U.S. government securities, and/or repurchase agreements collateralized by government securities. This makes it one of the safest money market options available.</p>
                
                <h4>Risk Assessment:</h4>
                <p>The fund maintains a stable $1.00 NAV and is considered extremely low risk due to its government-only investment mandate. Primary risks include interest rate changes and inflation impact on real returns.</p>
                
                <h4>Recommendation:</h4>
                <p>Ideal for conservative investors seeking capital preservation and liquidity with competitive yields relative to other government money market funds.</p>
            `;
        } else if (lowerQuery.includes('compare')) {
            return `
                <h3>Fund Comparison</h3>
                <p>Here's a detailed comparison of VMFXX, VMRXX, and SPAXX:</p>
                
                <table>
                    <thead>
                        <tr>
                            <th>Metric</th>
                            <th>VMFXX</th>
                            <th>VMRXX</th>
                            <th>SPAXX</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>7-Day Yield</td>
                            <td>5.28%</td>
                            <td>5.29%</td>
                            <td>5.01%</td>
                        </tr>
                        <tr>
                            <td>Expense Ratio</td>
                            <td>0.11%</td>
                            <td>0.10%</td>
                            <td>0.42%</td>
                        </tr>
                        <tr>
                            <td>Min Investment</td>
                            <td>$3,000</td>
                            <td>$5,000,000</td>
                            <td>$1</td>
                        </tr>
                        <tr>
                            <td>Total Assets</td>
                            <td>$326.5B</td>
                            <td>$123.8B</td>
                            <td>$302.1B</td>
                        </tr>
                    </tbody>
                </table>
                
                <h4>Key Insights:</h4>
                <ul>
                    <li><strong>Yield:</strong> VMRXX offers the highest yield at 5.29%, marginally better than VMFXX</li>
                    <li><strong>Cost:</strong> VMRXX has the lowest expense ratio, while SPAXX is significantly more expensive</li>
                    <li><strong>Accessibility:</strong> SPAXX has no minimum, VMFXX requires $3,000, while VMRXX is institutional at $5M minimum</li>
                    <li><strong>Scale:</strong> VMFXX and SPAXX have similar massive asset bases, indicating strong investor confidence</li>
                </ul>
                
                <p><strong>Recommendation:</strong> For retail investors, VMFXX offers the best balance of yield, low costs, and reasonable minimums. SPAXX is convenient but expensive. VMRXX is excellent but only for institutional investors.</p>
            `;
        } else if (lowerQuery.includes('risk')) {
            return `
                <h3>Risk Analysis</h3>
                <p>Based on the prospectus analysis, here's the risk ranking from lowest to highest:</p>
                
                <h4>1. VMFXX - Lowest Risk</h4>
                <ul>
                    <li>100% government securities and repos</li>
                    <li>No credit risk exposure</li>
                    <li>Extremely stable NAV history</li>
                </ul>
                
                <h4>2. VMRXX - Low Risk</h4>
                <ul>
                    <li>Similar government-only mandate as VMFXX</li>
                    <li>Institutional class provides additional stability</li>
                    <li>Large asset base reduces liquidity concerns</li>
                </ul>
                
                <h4>3. SPAXX - Low-Moderate Risk</h4>
                <ul>
                    <li>May invest in corporate commercial paper</li>
                    <li>Slightly higher credit risk exposure</li>
                    <li>Higher expense ratio impacts net returns</li>
                </ul>
                
                <p><strong>All three funds are considered very safe</strong>, but VMFXX and VMRXX edge out SPAXX due to their government-only investment mandates.</p>
            `;
        } else {
            return `
                <p>I've analyzed your query: "${query}"</p>
                <p>Based on the fund prospectuses, I can provide detailed information about yields, expenses, holdings, risks, and performance comparisons. Would you like me to focus on any specific aspect of these funds?</p>
                <p>Try asking about:</p>
                <ul>
                    <li>Individual fund analysis</li>
                    <li>Side-by-side comparisons</li>
                    <li>Risk assessments</li>
                    <li>Fee structure breakdowns</li>
                    <li>Investment strategy differences</li>
                </ul>
            `;
        }
    }
    
    // Handle suggested queries
    window.sendQuery = function(button) {
        chatInput.value = button.textContent.trim();
        sendMessage();
    };
    
    // Document selection
    document.querySelectorAll('.document-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.document-item').forEach(doc => {
                doc.classList.remove('active');
            });
            this.classList.add('active');
            
            const fundName = this.getAttribute('data-fund');
            NexusAdvisory.showNotification(`Switched to ${fundName}`, 'info');
        });
    });
});
