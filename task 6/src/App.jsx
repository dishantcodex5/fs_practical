import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [actualConnectionStatus, setActualConnectionStatus] = useState('checking')
  const [speechBlocked, setSpeechBlocked] = useState(false)

  // Check if speech recognition is supported
  useEffect(() => {
    // More thorough browser support check
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setSpeechSupported(true);
      console.log('✅ Speech Recognition API detected');
      
      // Test basic functionality
      try {
        const test = new SpeechRecognition();
        console.log('✅ SpeechRecognition constructor works');
      } catch (error) {
        console.error('❌ SpeechRecognition constructor failed:', error);
        setSpeechSupported(false);
      }
    } else {
      console.error('❌ Speech Recognition API not found');
      console.log('Browser:', navigator.userAgent);
    }

    // Test actual internet connectivity (not just navigator.onLine)
    const testConnection = async () => {
      try {
        // Test with a small request to Google's public DNS
        const response = await fetch('https://www.google.com/favicon.ico', {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-cache'
        });
        setActualConnectionStatus('connected');
        console.log('🌐 Internet connection verified');
      } catch (error) {
        setActualConnectionStatus('disconnected');
        console.log('🌐 Internet connection test failed:', error);
      }
    };

    testConnection();

    // Monitor online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      testConnection();
      console.log('🌐 Browser reports online, testing actual connection...');
    };
    const handleOffline = () => {
      setIsOnline(false);
      setActualConnectionStatus('disconnected');
      console.log('🌐 Browser reports offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Add a new task
  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }
      setTasks([...tasks, newTask])
      setInputValue('')
    }
  }

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Handle input field key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  // Speech recognition functionality
  const startSpeechRecognition = () => {
    // Enhanced browser support check
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser.\n\nSupported browsers:\n• Chrome (recommended)\n• Edge\n• Safari (limited support)\n\nFirefox does not support speech recognition.');
      return;
    }

    // Remove the internet connection check - let's try anyway
    console.log('🚀 Attempting speech recognition...');
    console.log('Navigator online:', navigator.onLine);
    console.log('Actual connection status:', actualConnectionStatus);

    const recognition = new SpeechRecognition();
    
    // Simplified configuration
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    let hasStarted = false;

    recognition.onstart = () => {
      console.log('✅ Speech recognition started successfully');
      hasStarted = true;
      setIsListening(true);
      setStatusMessage('🎤 Listening... Speak clearly now!');
    };

    recognition.onresult = (event) => {
      console.log('✅ Speech result received:', event);
      if (event.results && event.results[0] && event.results[0][0]) {
        const transcript = event.results[0][0].transcript.trim();
        console.log('📝 Transcript:', transcript);
        
        if (transcript) {
          setInputValue(transcript);
          setStatusMessage('✅ Voice recognized: "' + transcript + '"');
          setTimeout(() => setStatusMessage(''), 4000);
        } else {
          setStatusMessage('⚠️ Empty speech detected. Try again.');
          setTimeout(() => setStatusMessage(''), 3000);
        }
      }
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('❌ Speech recognition error:', event);
      console.log('Error details:', {
        error: event.error,
        message: event.message,
        timeStamp: event.timeStamp
      });
      setIsListening(false);
      setStatusMessage('');
      
      // More detailed error handling
      switch (event.error) {
        case 'not-allowed':
          alert('🎤 Microphone Access Denied\n\nTo fix this:\n1. Look for a microphone icon in your browser address bar\n2. Click it and select "Allow"\n3. Refresh this page\n4. Try again');
          break;
        case 'no-speech':
          setStatusMessage('⚠️ No speech heard. Click the mic and try speaking again.');
          setTimeout(() => setStatusMessage(''), 4000);
          break;
        case 'audio-capture':
          alert('🎤 No Microphone Found\n\nPlease:\n1. Check your microphone is connected\n2. Make sure no other apps are using it\n3. Try refreshing the page');
          break;
        case 'network':
          console.log('Network error - but connection seems OK. This might be a corporate firewall or DNS issue.');
          setSpeechBlocked(true); // Track that speech is blocked
          setStatusMessage('❌ Speech service blocked. Try: 1) Different network 2) VPN 3) Mobile hotspot');
          setTimeout(() => setStatusMessage(''), 8000);
          
          // Offer alternative suggestion
          setTimeout(() => {
            if (confirm('Speech recognition is blocked on this network.\n\nWould you like to try a simple text-to-speech test instead?\n\n(This might help identify if it\'s a firewall/DNS issue)')) {
              testTextToSpeech();
            }
          }, 1000);
          break;
        case 'aborted':
          console.log('Speech recognition was aborted');
          setStatusMessage('⚠️ Speech recognition was stopped');
          setTimeout(() => setStatusMessage(''), 3000);
          break;
        case 'service-not-allowed':
          alert('🚫 Speech service not allowed\n\nThis might be due to:\n1. Corporate firewall blocking speech services\n2. Browser security settings\n3. Privacy extensions blocking microphone access');
          break;
        default:
          console.error('Unhandled error:', event.error);
          setStatusMessage(`❌ Error: ${event.error}. Check console for details.`);
          setTimeout(() => setStatusMessage(''), 5000);
      }
    };

    recognition.onend = () => {
      console.log('🔚 Speech recognition ended');
      setIsListening(false);
      
      if (!hasStarted) {
        console.error('❌ Speech recognition failed to start');
        setStatusMessage('❌ Failed to start - try refreshing the page');
        setTimeout(() => setStatusMessage(''), 4000);
      }
    };

    // Start with timeout fallback
    try {
      console.log('🚀 Starting speech recognition...');
      recognition.start();
      
      // Fallback timeout
      setTimeout(() => {
        if (!hasStarted && recognition) {
          console.error('❌ Speech recognition timeout');
          recognition.abort();
          setIsListening(false);
          setStatusMessage('❌ Timeout - try clicking the microphone again');
          setTimeout(() => setStatusMessage(''), 3000);
        }
      }, 5000);
      
    } catch (error) {
      console.error('❌ Failed to start speech recognition:', error);
      setIsListening(false);
      setStatusMessage('❌ Failed to start - try refreshing the page');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  // Test text-to-speech to help diagnose issues
  const testTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Testing speech services');
      speechSynthesis.speak(utterance);
      console.log('🔊 Text-to-speech test initiated');
      setStatusMessage('🔊 Testing text-to-speech... If you hear this, speech services work partially');
      setTimeout(() => setStatusMessage(''), 5000);
    } else {
      setStatusMessage('❌ No speech services available on this network/browser');
      setTimeout(() => setStatusMessage(''), 4000);
    }
  };

  // Manual voice input alternative
  const showManualVoiceHelp = () => {
    const transcript = prompt(
      '🎤 Manual Voice Input\n\nSince automatic speech recognition is blocked, please:\n\n1. Use your phone\'s voice-to-text\n2. Use Windows Speech Recognition (Win+H)\n3. Use Google Docs voice typing\n4. Or type your task below:\n\nEnter your task:'
    );
    
    if (transcript && transcript.trim()) {
      setInputValue(transcript.trim());
      setStatusMessage('✅ Task added manually: "' + transcript.trim() + '"');
      setTimeout(() => setStatusMessage(''), 4000);
    }
  };

  // Filter tasks
  const completedTasks = tasks.filter(task => task.completed)
  const pendingTasks = tasks.filter(task => !task.completed)

  return (
    <div className="todo-app">
      <div className="todo-container">
        <h1>📝 To-Do List</h1>
        
        {!isOnline && (
          <div className="network-status offline">
            🌐 You're offline - Speech recognition unavailable
          </div>
        )}
        
        <div className="todo-input-section">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="todo-input"
          />
        {speechSupported && (
            <button
              onClick={startSpeechRecognition}
              disabled={isListening}
              className={`mic-btn ${isListening ? 'listening' : ''}`}
              title="Click to speak your task"
            >
              {isListening ? '🎤 Listening...' : '🎤'}
            </button>
          )}
          {speechBlocked && (
            <button
              onClick={showManualVoiceHelp}
              className="manual-voice-btn"
              title="Manual voice input alternatives"
            >
              📝 Voice Help
            </button>
          )}
          <button onClick={addTask} className="add-btn">
            Add Task
          </button>
        </div>

        {statusMessage && (
          <div className="status-message">
            {statusMessage}
          </div>
        )}

        {speechSupported && (
          <div className="speech-help">
            <details>
              <summary>🎤 Voice Input Help {!isOnline && '(⚠️ Offline)'}</summary>
              <div className="help-content">
                {!isOnline && (
                  <div className="offline-warning">
                    <strong>⚠️ You're currently offline</strong>
                    <p>Speech recognition requires an internet connection. Please connect to the internet to use voice input.</p>
                  </div>
                )}
                
                <div className="diagnostic-info">
                  <h4>🔍 Diagnostic Information:</h4>
                  <ul>
                    <li><strong>Browser:</strong> {navigator.userAgent.includes('Chrome') ? 'Chrome ✅' : navigator.userAgent.includes('Edge') ? 'Edge ✅' : navigator.userAgent.includes('Firefox') ? 'Firefox ❌' : navigator.userAgent.includes('Safari') ? 'Safari ⚠️' : 'Unknown'}</li>
                    <li><strong>Speech API:</strong> {speechSupported ? 'Available ✅' : 'Not Available ❌'}</li>
                    <li><strong>Browser Reports:</strong> {isOnline ? 'Online ✅' : 'Offline ❌'}</li>
                    <li><strong>Connection Test:</strong> {actualConnectionStatus === 'connected' ? 'Connected ✅' : actualConnectionStatus === 'disconnected' ? 'Failed ❌' : 'Testing... ⏳'}</li>
                    <li><strong>HTTPS:</strong> {window.location.protocol === 'https:' || window.location.hostname === 'localhost' ? 'Secure ✅' : 'Insecure ❌ (HTTPS required)'}</li>
                  </ul>
                </div>

                <h4>Troubleshooting Speech Recognition:</h4>
                <ul>
                  <li><strong>Internet Connection:</strong> Required for speech processing - check your connection</li>
                  <li><strong>Chrome/Edge:</strong> Best support - recommended browsers</li>
                  <li><strong>HTTPS:</strong> Required for microphone access (localhost is exempt)</li>
                  <li><strong>Microphone Access:</strong> Allow when prompted or check browser address bar</li>
                  <li><strong>Speak Clearly:</strong> Use normal speaking pace and volume</li>
                  <li><strong>Quiet Environment:</strong> Reduce background noise for better accuracy</li>
                </ul>
                <p><small>Open browser console (F12) to see detailed logs when testing voice input.</small></p>
              </div>
            </details>
          </div>
        )}

        <div className="todo-stats">
          <span className="stat">Total: {tasks.length}</span>
          <span className="stat">Pending: {pendingTasks.length}</span>
          <span className="stat">Completed: {completedTasks.length}</span>
        </div>

        <div className="todo-lists">
          {/* Pending Tasks */}
          <div className="task-section">
            <h3>📋 Pending Tasks ({pendingTasks.length})</h3>
            {pendingTasks.length === 0 ? (
              <p className="empty-message">No pending tasks! 🎉</p>
            ) : (
              <ul className="task-list">
                {pendingTasks.map(task => (
                  <li key={task.id} className="task-item">
                    <div className="task-content">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="task-checkbox"
                      />
                      <span className="task-text">{task.text}</span>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="delete-btn"
                    >
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div className="task-section">
              <h3>✅ Completed Tasks ({completedTasks.length})</h3>
              <ul className="task-list">
                {completedTasks.map(task => (
                  <li key={task.id} className="task-item completed">
                    <div className="task-content">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="task-checkbox"
                      />
                      <span className="task-text">{task.text}</span>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="delete-btn"
                    >
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
