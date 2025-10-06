import { useState } from 'react'
import Sidebar from './components/Sidebar'
import WelcomePage from './pages/WelcomePage'
import DepstarPage from './pages/DepstarPage'
import DepstarCSEPage from './pages/DepstarCSEPage'
import CoursesPage from './pages/CoursesPage'
import ContactPage from './pages/ContactPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome')

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage />
      case 'depstar':
        return <DepstarPage />
      case 'depstar-cse':
        return <DepstarCSEPage />
      case 'courses':
        return <CoursesPage />
      case 'contact':
        return <ContactPage />
      default:
        return <WelcomePage />
    }
  }

  return (
    <div className="app">
      <Sidebar onPageChange={setCurrentPage} currentPage={currentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
