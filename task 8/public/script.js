class GymRepCounter {
    constructor() {
        this.currentCount = 0;
        this.sessionTotal = 0;
        this.allTimeTotal = 0;
        this.exerciseName = '';
        
        this.initializeElements();
        this.loadSavedData();
        this.attachEventListeners();
        this.updateDisplay();
    }
    
    initializeElements() {
        this.counterDisplay = document.getElementById('counter');
        this.exerciseNameInput = document.getElementById('exerciseName');
        this.sessionTotalDisplay = document.getElementById('sessionTotal');
        this.allTimeTotalDisplay = document.getElementById('allTimeTotal');
        
        this.increaseBtn = document.getElementById('increaseBtn');
        this.decreaseBtn = document.getElementById('decreaseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.clearAllBtn = document.getElementById('clearAllBtn');
    }
    
    loadSavedData() {
        // Load data from localStorage
        const savedData = localStorage.getItem('gymRepCounter');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.currentCount = data.currentCount || 0;
            this.sessionTotal = data.sessionTotal || 0;
            this.allTimeTotal = data.allTimeTotal || 0;
            this.exerciseName = data.exerciseName || '';
            this.exerciseNameInput.value = this.exerciseName;
        }
    }
    
    saveData() {
        const data = {
            currentCount: this.currentCount,
            sessionTotal: this.sessionTotal,
            allTimeTotal: this.allTimeTotal,
            exerciseName: this.exerciseName
        };
        localStorage.setItem('gymRepCounter', JSON.stringify(data));
    }
    
    attachEventListeners() {
        // Counter buttons
        this.increaseBtn.addEventListener('click', () => this.increaseCount());
        this.decreaseBtn.addEventListener('click', () => this.decreaseCount());
        
        // Control buttons
        this.resetBtn.addEventListener('click', () => this.resetCounter());
        this.clearAllBtn.addEventListener('click', () => this.clearAll());
        
        // Exercise name input
        this.exerciseNameInput.addEventListener('input', (e) => {
            this.exerciseName = e.target.value;
            this.saveData();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                case '+':
                    e.preventDefault();
                    this.increaseCount();
                    break;
                case 'ArrowDown':
                case '-':
                    e.preventDefault();
                    this.decreaseCount();
                    break;
                case 'r':
                case 'R':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.resetCounter();
                    }
                    break;
            }
        });
        
        // Touch/click feedback
        [this.increaseBtn, this.decreaseBtn].forEach(btn => {
            btn.addEventListener('touchstart', () => {
                btn.style.transform = 'scale(0.95)';
            });
            
            btn.addEventListener('touchend', () => {
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
            });
        });
    }
    
    increaseCount() {
        this.currentCount++;
        this.sessionTotal++;
        this.allTimeTotal++;
        this.updateDisplay();
        this.saveData();
        this.animateCounter('increase');
        this.hapticFeedback();
    }
    
    decreaseCount() {
        if (this.currentCount > 0) {
            this.currentCount--;
            // Don't decrease session/all-time totals as they represent total work done
            this.updateDisplay();
            this.saveData();
            this.animateCounter('decrease');
            this.hapticFeedback();
        }
    }
    
    resetCounter() {
        if (this.currentCount > 0 || confirm('Reset the current exercise counter?')) {
            this.currentCount = 0;
            this.updateDisplay();
            this.saveData();
            this.showNotification('Counter reset!');
        }
    }
    
    clearAll() {
        if (confirm('Clear all data including totals? This cannot be undone.')) {
            this.currentCount = 0;
            this.sessionTotal = 0;
            this.allTimeTotal = 0;
            this.exerciseName = '';
            this.exerciseNameInput.value = '';
            this.updateDisplay();
            this.saveData();
            this.showNotification('All data cleared!');
        }
    }
    
    updateDisplay() {
        this.counterDisplay.textContent = this.currentCount;
        this.sessionTotalDisplay.textContent = this.sessionTotal;
        this.allTimeTotalDisplay.textContent = this.allTimeTotal;
        
        // Update button states
        this.decreaseBtn.disabled = this.currentCount === 0;
        this.decreaseBtn.style.opacity = this.currentCount === 0 ? '0.5' : '1';
    }
    
    animateCounter(type) {
        const counter = this.counterDisplay;
        counter.style.transform = 'scale(1.1)';
        counter.style.color = type === 'increase' ? '#48bb78' : '#f56565';
        
        setTimeout(() => {
            counter.style.transform = 'scale(1)';
            counter.style.color = '#2d3748';
        }, 200);
    }
    
    hapticFeedback() {
        // Vibrate on mobile devices if supported
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }
    
    showNotification(message) {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #48bb78;
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            z-index: 1000;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Initialize the counter when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GymRepCounter();
    
    // Add PWA-like behavior for mobile
    if ('serviceWorker' in navigator) {
        // Future enhancement: could add service worker for offline functionality
    }
    
    // Prevent zoom on double tap for better mobile experience
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});

// Add some fun Easter eggs
let clickCount = 0;
document.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 100) {
        console.log('💪 You\'re really committed to your workout! Keep it up!');
    }
});
