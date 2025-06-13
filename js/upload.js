// upload.js
document.addEventListener('DOMContentLoaded', function() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const uploadProgress = document.getElementById('uploadProgress');
    const uploadSuccess = document.getElementById('uploadSuccess');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const fileName = document.getElementById('fileName');
    
    // Click to upload
    uploadZone.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Drag and drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });
    
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('drag-over');
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });
    
    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
    
    function handleFileUpload(file) {
        // Validate file
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            NexusAdvisory.showNotification('Please upload a PDF or Word document', 'error');
            return;
        }
        
        if (file.size > 50 * 1024 * 1024) { // 50MB
            NexusAdvisory.showNotification('File size must be less than 50MB', 'error');
            return;
        }
        
        // Show progress
        uploadZone.style.display = 'none';
        uploadProgress.style.display = 'block';
        fileName.textContent = file.name;
        
        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressFill.style.width = progress + '%';
            progressPercent.textContent = Math.floor(progress) + '%';
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    uploadProgress.style.display = 'none';
                    uploadSuccess.style.display = 'block';
                    NexusAdvisory.showNotification('Document uploaded successfully!', 'success');
                }, 500);
            }
        }, 300);
    }
    
    // Quick analyze buttons
    document.querySelectorAll('.file-actions button').forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'analyze.html';
        });
    });
});
