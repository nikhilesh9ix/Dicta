// WhispNote - Speech-to-Text Note Taking App
// Main JavaScript file

// DOM Elements
const micButton = document.getElementById('mic-button');
const transcriptionArea = document.getElementById('transcription-area');
const notesContainer = document.getElementById('notes-container');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const onboardingTooltip = document.getElementById('onboarding-tooltip');
const tooltipNextBtn = document.getElementById('tooltip-next');
const startSound = document.getElementById('start-sound');
const stopSound = document.getElementById('stop-sound');
const saveSound = document.getElementById('save-sound');
const navItems = document.querySelectorAll('.nav-item');

// App State
let isRecording = false;
let recognition = null;
let currentTranscript = '';
let notes = JSON.parse(localStorage.getItem('whisp-notes')) || [];

// Check if this is the first visit
const isFirstVisit = !localStorage.getItem('whisp-visited');

// Initialize Speech Recognition
function initSpeechRecognition() {
    // Check browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        showNotification('Speech recognition is not supported in your browser. Try Chrome or Edge.', 'warning');
        return false;
    }

    // Create speech recognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    
    // Configure
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // Default language

    // Event handlers
    recognition.onstart = () => {
        isRecording = true;
        updateUI();
        playSound(startSound);
    };

    recognition.onend = () => {
        isRecording = false;
        updateUI();
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        // Update the transcription area with final and interim results
        if (finalTranscript) {
            currentTranscript += finalTranscript;
        }
        
        updateTranscriptionArea(currentTranscript, interimTranscript);
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        isRecording = false;
        updateUI();
        
        if (event.error === 'not-allowed') {
            showNotification('Microphone access denied. Please allow microphone access.', 'error');
        }
    };

    return true;
}

// UI Updates
function updateUI() {
    // Update mic button appearance
    if (isRecording) {
        micButton.classList.add('recording');
        micButton.querySelector('i').className = 'fas fa-stop';
        transcriptionArea.classList.add('recording');
        document.querySelector('.transcription-placeholder').style.display = 'none';
    } else {
        micButton.classList.remove('recording');
        micButton.querySelector('i').className = 'fas fa-microphone';
        transcriptionArea.classList.remove('recording');
        
        if (!currentTranscript) {
            document.querySelector('.transcription-placeholder').style.display = 'inline';
        }
    }
}

function updateTranscriptionArea(finalText, interimText = '') {
    let html = '';
    
    if (finalText) {
        html += `<span class="final-transcript">${finalText}</span>`;
    }
    
    if (interimText) {
        html += `<span class="interim-transcript">${interimText}</span>`;
    }
    
    if (!finalText && !interimText) {
        html = '<span class="transcription-placeholder">Your words will appear here...</span>';
    }
    
    html += '<span class="cursor-effect"></span>';
    transcriptionArea.innerHTML = html;
}

// Note Management
function saveNote() {
    if (!currentTranscript.trim()) return;
    
    const newNote = {
        id: Date.now(),
        text: currentTranscript.trim(),
        timestamp: new Date().toISOString(),
        tags: extractTags(currentTranscript)
    };
    
    notes.unshift(newNote); // Add to beginning of array
    localStorage.setItem('whisp-notes', JSON.stringify(notes));
    
    // Clear current transcript
    currentTranscript = '';
    updateTranscriptionArea('');
    
    // Update notes display
    renderNotes();
    
    // Play save sound and show confirmation
    playSound(saveSound);
    showSaveConfirmation();
}

function extractTags(text) {
    // Extract hashtags from text
    const tagRegex = /#(\w+)/g;
    const matches = text.match(tagRegex);
    
    if (!matches) return [];
    
    return matches.map(tag => tag.substring(1)); // Remove # symbol
}

function deleteNote(noteId) {
    notes = notes.filter(note => note.id !== noteId);
    localStorage.setItem('whisp-notes', JSON.stringify(notes));
    renderNotes();
}

function editNote(noteId) {
    const note = notes.find(note => note.id === noteId);
    if (!note) return;
    
    // Set the transcript to the note text for editing
    currentTranscript = note.text;
    updateTranscriptionArea(currentTranscript);
    
    // Delete the original note
    deleteNote(noteId);
    
    // Scroll to the top where the transcription area is
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function renderNotes() {
    notesContainer.innerHTML = '';
    
    if (notes.length === 0) {
        notesContainer.innerHTML = '<p class="no-notes">No saved notes yet. Start recording to create your first note!</p>';
        return;
    }
    
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note-card glass-card';
        noteElement.dataset.id = note.id;
        
        const date = new Date(note.timestamp);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        let tagsHtml = '';
        if (note.tags.length > 0) {
            tagsHtml = '<div class="note-tags">' + 
                note.tags.map(tag => `<span class="note-tag">#${tag}</span>`).join('') +
                '</div>';
        }
        
        noteElement.innerHTML = `
            <div class="note-timestamp">${formattedDate}</div>
            <div class="note-preview">${note.text}</div>
            ${tagsHtml}
            <div class="note-actions">
                <button class="note-action-btn edit" aria-label="Edit note">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="note-action-btn delete" aria-label="Delete note">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        // Add event listeners
        noteElement.querySelector('.edit').addEventListener('click', (e) => {
            e.stopPropagation();
            editNote(parseInt(noteElement.dataset.id));
        });
        
        noteElement.querySelector('.delete').addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('Are you sure you want to delete this note?')) {
                deleteNote(parseInt(noteElement.dataset.id));
            }
        });
        
        // Expand note on click
        noteElement.addEventListener('click', () => {
            // Implement note expansion/detail view if needed
        });
        
        notesContainer.appendChild(noteElement);
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }, 10);
}

function showSaveConfirmation() {
    const confirmation = document.createElement('div');
    confirmation.className = 'save-confirmation';
    confirmation.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Note saved!</span>
    `;
    
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
        confirmation.remove();
    }, 2000);
}

function playSound(audioElement) {
    if (audioElement && audioElement.readyState >= 2) { // HAVE_CURRENT_DATA or higher
        audioElement.currentTime = 0;
        audioElement.play().catch(error => {
            console.warn('Audio playback error:', error);
        });
    }
}

// Theme Management
function toggleTheme() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('whisp-theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('whisp-theme', 'dark');
    }
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('whisp-theme');
    
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Navigation
function handleNavigation(target) {
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.target === target) {
            item.classList.add('active');
        }
    });
    
    // Implement navigation logic if needed
    // For now, we'll just scroll to the appropriate section
    if (target === 'mic') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else if (target === 'notes') {
        const notesSection = document.querySelector('.notes-section');
        notesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Onboarding
function showOnboarding() {
    if (isFirstVisit) {
        onboardingTooltip.style.display = 'block';
        localStorage.setItem('whisp-visited', 'true');
    }
}

// Event Listeners
function setupEventListeners() {
    // Mic button
    micButton.addEventListener('click', () => {
        if (!recognition && !initSpeechRecognition()) {
            return;
        }
        
        if (isRecording) {
            recognition.stop();
            playSound(stopSound);
            
            // If there's content, offer to save it
            if (currentTranscript.trim()) {
                saveNote();
            }
        } else {
            currentTranscript = ''; // Clear any existing transcript
            updateTranscriptionArea('');
            recognition.start();
        }
    });
    
    // Theme toggle
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    // Tooltip next button
    tooltipNextBtn.addEventListener('click', () => {
        onboardingTooltip.style.display = 'none';
    });
    
    // Bottom navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            handleNavigation(item.dataset.target);
        });
    });
    
    // Handle keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl+Space to toggle recording
        if (e.ctrlKey && e.code === 'Space') {
            e.preventDefault();
            micButton.click();
        }
    });
}

// Initialize App
function initApp() {
    loadSavedTheme();
    renderNotes();
    setupEventListeners();
    initSpeechRecognition();
    
    // Show onboarding tooltip for first-time users
    setTimeout(showOnboarding, 1000);
}

// Start the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);
