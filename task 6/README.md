# 📝 React To-Do List Application

A modern, responsive To-Do List application built with React and Vite, showcasing React Hooks for state management and beautiful UI design.

## 🚀 Features

- ✅ **Add Tasks**: Create new tasks with a simple input field
- 🎤 **Voice Input**: Add tasks using speech recognition (microphone)
- ✔️ **Toggle Completion**: Mark tasks as complete or incomplete
- 🗑️ **Delete Tasks**: Remove tasks you no longer need
- 📊 **Task Statistics**: View total, pending, and completed task counts
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations

## 🛠️ Technologies Used

- **React 18** - Modern React with functional components
- **React Hooks** - useState and useEffect for state management
- **Web Speech API** - Speech recognition for voice input
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with flexbox and gradients
- **JavaScript ES6+** - Modern JavaScript features

## 🎯 React Hooks Implementation

This application demonstrates the use of React Hooks:

### useState Hook
- **Task Management**: `useState([])` - Manages the array of tasks
- **Input Control**: `useState('')` - Controls the input field value
- **Speech Recognition State**: `useState(false)` - Tracks listening status
- **Browser Support Check**: `useState(false)` - Checks speech API support

### useEffect Hook
- **Component Initialization**: Checks for Web Speech API browser support
- **Side Effect Management**: Handles speech recognition setup

### Key State Management Patterns
- Adding tasks with unique IDs using `Date.now()`
- Toggling task completion with `map()` function
- Filtering tasks with `filter()` function
- Handling form input with controlled components

## 🚦 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:5173`
   - The application will automatically reload on code changes

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📂 Project Structure

```
src/
├── App.jsx          # Main To-Do List component
├── App.css          # Application-specific styles
├── index.css        # Global styles and CSS reset
└── main.jsx         # Application entry point
```

## 🎨 UI Components

### Main Features
- **Input Section**: Add new tasks with Enter key, button click, or voice input
- **Voice Recognition**: Microphone button with visual feedback during listening
- **Statistics Bar**: Shows total, pending, and completed task counts
- **Task Lists**: Separate sections for pending and completed tasks
- **Task Items**: Interactive checkboxes and delete buttons

### Responsive Design
- Mobile-first approach
- Flexible layouts that adapt to screen size
- Touch-friendly interface elements

## 🔧 Key Learning Concepts

### React Hooks Usage
```javascript
const [tasks, setTasks] = useState([])
const [inputValue, setInputValue] = useState('')
const [isListening, setIsListening] = useState(false)
const [speechSupported, setSpeechSupported] = useState(false)

// Check speech recognition support
useEffect(() => {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    setSpeechSupported(true)
  }
}, [])
```

### Speech Recognition Implementation
```javascript
const startSpeechRecognition = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()
  
  recognition.continuous = false
  recognition.interimResults = false
  recognition.lang = 'en-US'
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    setInputValue(transcript)
  }
}
```

### State Management Patterns
```javascript
// Adding a task
setTasks([...tasks, newTask])

// Toggling completion
setTasks(tasks.map(task => 
  task.id === id ? { ...task, completed: !task.completed } : task
))

// Deleting a task
setTasks(tasks.filter(task => task.id !== id))
```

### Event Handling
- Form submission with Enter key
- Click event handlers
- Controlled input components
- Speech recognition events (start, result, error, end)

## 🎤 Speech Recognition Features

### Browser Support
- **Chrome**: Full support
- **Edge**: Full support  
- **Safari**: Partial support (iOS 14.5+)
- **Firefox**: Limited support

### Usage Instructions
1. Click the microphone button (🎤) next to the input field
2. Allow microphone access when prompted
3. Speak your task clearly
4. The transcribed text will appear in the input field
5. Click "Add Task" or press Enter to add the task

### Privacy & Security
- Speech recognition runs locally in your browser
- No audio data is sent to external servers
- Microphone access is required only when using voice input

## 🎯 Future Enhancements

- [ ] Local storage persistence
- [ ] Task editing functionality
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Drag and drop reordering
- [ ] Dark mode toggle

## 📱 Browser Support

### Core Application
This application works in all modern browsers including:
- Chrome (latest) ✅
- Firefox (latest) ✅
- Safari (latest) ✅
- Edge (latest) ✅

### Speech Recognition Support
- Chrome (latest) ✅ Full support
- Edge (latest) ✅ Full support
- Safari (latest) ⚠️ Partial support (iOS 14.5+)
- Firefox (latest) ❌ Limited support

---

Built with ❤️ using React and Vite
