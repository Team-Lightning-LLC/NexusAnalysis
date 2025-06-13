/* responsive.css */
/* Tablet styles (768px - 1024px) */
@media (max-width: 1024px) {
    .nav-container {
        padding: 1rem;
    }
    
    .hero-title {
        font-size: 2.5rem;
    }
    
    .dashboard-grid {
        grid-template-columns: 1fr;
    }
    
    .upload-grid {
        grid-template-columns: 1fr;
    }
    
    .analyze-container {
        flex-direction: column;
        height: auto;
    }
    
    .document-sidebar {
        width: 100%;
        height: 200px;
        border-right: none;
        border-bottom: 1px solid var(--gray-200);
    }
    
    .document-list {
        display: flex;
        overflow-x: auto;
        padding: 1rem;
        gap: 1rem;
    }
    
    .document-item {
        min-width: 200px;
        margin-bottom: 0;
    }
}

/* Mobile styles (max-width: 768px) */
@media (max-width: 768px) {
    /* Navigation */
    .navbar {
        position: relative;
    }
    
    .nav-links {
        gap: 1rem;
        font-size: 0.875rem;
    }
    
    .logo-text {
        font-size: 1rem;
    }
    
    /* Dashboard */
    .dashboard {
        padding: 1rem;
    }
    
    .hero {
        padding: 2rem 0;
    }
    
    .hero-title {
        font-size: 2rem;
    }
    
    .hero-subtitle {
        font-size: 1rem;
    }
    
    .hero-actions {
        flex-direction: column;
        width: 100%;
    }
    
    .hero-actions .btn {
        width: 100%;
        justify-content: center;
    }
    
    /* Metrics */
    .metrics {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    
    .metric-card {
        padding: 1.5rem 1rem;
    }
    
    .metric-icon {
        font-size: 2rem;
    }
    
    .metric-value {
        font-size: 1.5rem;
    }
    
    /* Fund cards */
    .fund-cards {
        grid-template-columns: 1fr;
    }
    
    /* Upload page */
    .upload-container {
        padding: 1rem;
    }
    
    .upload-section {
        padding: 1.5rem;
    }
    
    .upload-zone {
        padding: 2rem 1rem;
    }
    
    /* Chat interface */
    .chat-header h1 {
        font-size: 1.25rem;
    }
    
    .chat-messages {
        padding: 1rem;
    }
    
    .message {
        max-width: 100%;
    }
    
    .suggested-queries {
        padding: 0.75rem 1rem;
        justify-content: flex-start;
        overflow-x: auto;
        flex-wrap: nowrap;
        -webkit-overflow-scrolling: touch;
    }
    
    .query-chip {
        white-space: nowrap;
        flex-shrink: 0;
    }
    
    .chat-input-container {
        padding: 1rem;
    }
}

/* Small mobile (max-width: 480px) */
@media (max-width: 480px) {
    .metrics {
        grid-template-columns: 1fr;
    }
    
    .nav-links {
        font-size: 0.75rem;
        gap: 0.5rem;
    }
    
    .message-content {
        padding: 1rem;
        font-size: 0.875rem;
    }
    
    .message-content table {
        font-size: 0.75rem;
    }
}

/* Print styles */
@media print {
    .navbar,
    .suggested-queries,
    .chat-input-container,
    .document-sidebar {
        display: none;
    }
    
    .chat-section {
        width: 100%;
    }
    
    .chat-messages {
        padding: 0;
        background: white;
    }
    
    .message {
        break-inside: avoid;
        margin-bottom: 1rem;
    }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    :root {
        --gray-50: #0F172A;
        --gray-100: #1E293B;
        --gray-200: #334155;
        --gray-300: #475569;
        --gray-400: #64748B;
        --gray-500: #94A3B8;
        --gray-600: #CBD5E1;
        --gray-700: #E2E8F0;
        --gray-800: #F1F5F9;
        --gray-900: #F8FAFC;
    }
    
    body {
        background: var(--gray-900);
        color: var(--gray-50);
    }
    
    .navbar,
    .metric-card,
    .recent-activity,
    .featured-funds,
    .upload-section,
    .recent-uploads,
    .chat-header,
    .message-content,
    .suggested-queries,
    .chat-input-container {
        background: var(--gray-800);
    }
    
    .document-sidebar {
        background: var(--gray-800);
        border-color: var(--gray-700);
    }
    
    .chat-section {
        background: var(--gray-900);
    }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
    *,
    ::before,
    ::after {
        animation-delay: -1ms !important;
        animation-duration: 1ms !important;
        animation-iteration-count: 1 !important;
        transition-delay: 0s !important;
        transition-duration: 0s !important;
    }
}

/* High contrast mode */
@media (prefers-contrast: high) {
    :root {
        --primary: #0040CC;
        --gray-300: #666;
        --gray-600: #333;
    }
    
    .btn-primary {
        border: 2px solid var(--primary);
    }
}
