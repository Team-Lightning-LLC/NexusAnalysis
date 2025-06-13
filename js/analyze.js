// analyze-enhanced.js
document.addEventListener('DOMContentLoaded', function() {
   // Initialize chat system
   const chatInput = document.getElementById('chatInput');
   const sendButton = document.getElementById('sendButton');
   const chatMessages = document.getElementById('chatMessages');
   const auditTrail = document.getElementById('auditTrail');
   
   // Chat state management
   let currentSession = {
       id: generateSessionId(),
       startTime: new Date(),
       messages: [],
       documentsUsed: new Set(),
       topics: new Set(),
       activeDocument: 'VMFXX'
   };
   
   // Tab switching
   document.querySelectorAll('.tab-button').forEach(button => {
       button.addEventListener('click', function() {
           const targetTab = this.getAttribute('data-tab');
           
           // Update buttons
           document.querySelectorAll('.tab-button').forEach(btn => {
               btn.classList.remove('active');
           });
           this.classList.add('active');
           
           // Update content
           document.querySelectorAll('.tab-content').forEach(content => {
               content.classList.remove('active');
           });
           document.getElementById(`${targetTab}-tab`).classList.add('active');
       });
   });
   
   // Auto-resize textarea
   chatInput.addEventListener('input', function() {
       this.style.height = 'auto';
       this.style.height = this.scrollHeight + 'px';
   });
   
   // Send message
   function sendMessage() {
       const message = chatInput.value.trim();
       if (!message) return;
       
       // Track message in session
       const messageData = {
           type: 'user',
           content: message,
           timestamp: new Date(),
           documents: [currentSession.activeDocument]
       };
       currentSession.messages.push(messageData);
       
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
           
           // Track AI response
           const responseData = {
               type: 'assistant',
               content: response.text,
               timestamp: new Date(),
               documents: response.documents,
               topics: response.topics
           };
           currentSession.messages.push(responseData);
           
           // Update session tracking
           response.documents.forEach(doc => currentSession.documentsUsed.add(doc));
           response.topics.forEach(topic => currentSession.topics.add(topic));
           
           addMessage(response.text, 'assistant');
           
           // Show audit trail button after meaningful conversation
           if (currentSession.messages.length >= 4) {
               document.querySelector('.fab').style.display = 'flex';
           }
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
   
   // Voice input
   document.querySelector('.action-btn[title="Voice input"]').addEventListener('click', function() {
       if ('webkitSpeechRecognition' in window) {
           const recognition = new webkitSpeechRecognition();
           recognition.lang = 'en-US';
           recognition.continuous = false;
           recognition.interimResults = false;
           
           recognition.onstart = () => {
               this.style.color = 'var(--danger)';
               this.style.animation = 'pulse 1s infinite';
           };
           
           recognition.onresult = (event) => {
               const transcript = event.results[0][0].transcript;
               chatInput.value = transcript;
               chatInput.style.height = chatInput.scrollHeight + 'px';
           };
           
           recognition.onend = () => {
               this.style.color = '';
               this.style.animation = '';
           };
           
           recognition.start();
       } else {
           NexusAdvisory.showNotification('Voice input not supported in your browser', 'error');
       }
   });
   
   // Add message to chat
   function addMessage(content, type) {
       const messageDiv = document.createElement('div');
       messageDiv.className = `message ${type} fade-in`;
       
       const avatar = document.createElement('div');
       avatar.className = 'message-avatar';
       
       if (type === 'assistant') {
           avatar.innerHTML = `
               <div class="ai-avatar-animated">
                   <div class="ai-brain">
                       <span class="neuron"></span>
                       <span class="neuron"></span>
                       <span class="neuron"></span>
                   </div>
               </div>
           `;
       } else {
           avatar.textContent = '👤';
       }
       
       const contentDiv = document.createElement('div');
       contentDiv.className = 'message-content';
       contentDiv.innerHTML = content;
       
       const timestamp = document.createElement('div');
       timestamp.className = 'message-timestamp';
       timestamp.textContent = formatTime(new Date());
       
       messageDiv.appendChild(avatar);
       messageDiv.appendChild(contentDiv);
       messageDiv.appendChild(timestamp);
       
       chatMessages.appendChild(messageDiv);
       chatMessages.scrollTop = chatMessages.scrollHeight;
   }
   
   // Show typing indicator
   function showTypingIndicator() {
       const indicator = document.createElement('div');
       indicator.className = 'message assistant typing-indicator fade-in';
       indicator.innerHTML = `
           <div class="message-avatar">
               <div class="ai-avatar-animated">
                   <div class="ai-brain">
                       <span class="neuron"></span>
                       <span class="neuron"></span>
                       <span class="neuron"></span>
                   </div>
               </div>
           </div>
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
   
   // Generate AI response with metadata
   function generateAIResponse(query) {
       const lowerQuery = query.toLowerCase();
       let response = {
           text: '',
           documents: [],
           topics: []
       };
       
       if (lowerQuery.includes('analyze') && lowerQuery.includes('vmfxx')) {
           response.documents = ['VMFXX'];
           response.topics = ['Fund Analysis', 'Yield Analysis', 'Risk Assessment'];
           response.text = `
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
           response.documents = ['VMFXX', 'VMRXX', 'SPAXX'];
           response.topics = ['Fund Comparison', 'Yield Comparison', 'Fee Structure'];
           response.text = `
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
               
               <p><strong>Recommendation:</strong> For retail investors, VMFXX offers the best balance of yield, low costs, and reasonable minimums.</p>
           `;
       } else {
           response.documents = [currentSession.activeDocument];
           response.topics = ['General Query'];
           response.text = `
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
       
       return response;
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
               doc.querySelector('.status-indicator').classList.remove('active');
           });
           this.classList.add('active');
           this.querySelector('.status-indicator').classList.add('active');
           
           const fundName = this.getAttribute('data-fund');
           currentSession.activeDocument = fundName;
           
           // Update active context
           document.querySelector('.context-doc').textContent = fundName;
           
           NexusAdvisory.showNotification(`Switched to ${fundName}`, 'info');
       });
   });
   
   // Chat history selection
   document.querySelectorAll('.chat-history-item').forEach(item => {
       item.addEventListener('click', function() {
           document.querySelectorAll('.chat-history-item').forEach(chat => {
               chat.classList.remove('active');
           });
           this.classList.add('active');
           
           // Load chat history (simulated)
           NexusAdvisory.showNotification('Loading chat history...', 'info');
       });
   });
   
   // Audit trail functions
   window.showAuditTrail = function() {
       generateAuditSummary();
       auditTrail.style.display = 'flex';
       document.querySelector('.fab').style.display = 'none';
   };
   
   window.closeAuditTrail = function() {
       auditTrail.style.display = 'none';
       document.querySelector('.fab').style.display = 'flex';
   };
   
   window.clearContext = function() {
       currentSession.activeDocument = null;
       document.querySelector('.active-context').style.display = 'none';
   };
   
   // Generate audit summary
   function generateAuditSummary() {
       // Update topics
       const topicTags = Array.from(currentSession.topics).map(topic => 
           `<span class="topic-tag">${topic}</span>`
       ).join('');
       document.querySelector('.topic-tags').innerHTML = topicTags;
       
       // Update document references
       const docRefs = Array.from(currentSession.documentsUsed).map(doc => `
           <div class="doc-ref">
               <span class="doc-icon">${getDocIcon(doc)}</span>
               <span class="doc-name">${doc} Prospectus</span>
               <span class="doc-pages">Pages ${generateRandomPages()}</span>
           </div>
       `).join('');
       document.querySelector('.document-references').innerHTML = docRefs;
       
       // Generate insights based on conversation
       const insights = generateInsights();
       document.querySelector('.insights-list').innerHTML = insights.map(insight =>
           `<li>${insight}</li>`
       ).join('');
   }
   
   // Export chat functionality
   window.exportChat = function() {
       const chatContent = {
           session: currentSession,
           exportDate: new Date(),
           format: 'JSON'
       };
       
       const blob = new Blob([JSON.stringify(chatContent, null, 2)], {
           type: 'application/json'
       });
       
       const url = URL.createObjectURL(blob);
       const a = document.createElement('a');
       a.href = url;
       a.download = `nexus-chat-${currentSession.id}.json`;
       document.body.appendChild(a);
       a.click();
       document.body.removeChild(a);
       URL.revokeObjectURL(url);
       
       NexusAdvisory.showNotification('Chat exported successfully', 'success');
   };
   
   // Save audit trail
   window.saveAuditTrail = function() {
       // Simulate saving to database
       NexusAdvisory.showNotification('Audit trail saved to compliance records', 'success');
       closeAuditTrail();
   };
   
   // Generate full report
   window.generateReport = function() {
       NexusAdvisory.showNotification('Generating comprehensive report...', 'info');
       
       // Simulate report generation
       setTimeout(() => {
           NexusAdvisory.showNotification('Report generated and sent to your email', 'success');
           closeAuditTrail();
       }, 2000);
   };
   
   // Helper functions
   function generateSessionId() {
       return 'A' + Math.random().toString(36).substr(2, 3).toUpperCase();
   }
   
   function formatTime(date) {
       return date.toLocaleTimeString('en-US', {
           hour: 'numeric',
           minute: '2-digit',
           hour12: true
       });
   }
   
   function getDocIcon(doc) {
       const icons = {
           'VMFXX': '📊',
           'VMRXX': '📈',
           'SPAXX': '💰'
       };
       return icons[doc] || '📄';
   }
   
   function generateRandomPages() {
       const start = Math.floor(Math.random() * 50) + 1;
       const end = start + Math.floor(Math.random() * 10) + 2;
       return `${start}-${end}`;
   }
   
   function generateInsights() {
       const insights = [
           'VMFXX offers the best balance of yield and accessibility for retail investors',
           'All three funds maintain stable NAV with government securities focus',
           'Expense ratios significantly impact net returns in current rate environment',
           'Minimum investment requirements vary significantly across funds',
           'Government-only mandate provides additional safety for VMFXX and VMRXX'
       ];
       
       // Return 3 random insights
       return insights.sort(() => Math.random() - 0.5).slice(0, 3);
   }
   
   // Initialize session info
   document.querySelector('.session-id').textContent = `Session #${currentSession.id}`;
   document.querySelector('.session-start').textContent = `Started ${formatTime(currentSession.startTime)}`;
});
