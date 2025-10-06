import { useState } from 'react'
import './Sidebar.css'

const Sidebar = ({ onPageChange, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false)
  

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    { id: 'welcome', label: 'Welcome to Charusat' },
    { id: 'courses', label: 'Courses' },
    { id: 'depstar', label: 'Depstar' },
    { id: 'depstar-cse', label: 'Depstar - CSE' },
    { id: 'contact', label: 'Contact' } 
    
  ]

  const handleMenuClick = (pageId) => {
    onPageChange(pageId) 
    if (window.innerWidth <= 768) {
      setIsOpen(false)
    }
  }

  return (
    <div className="sidebar-container">
     
      <button className={`hamburger-btn ${isOpen ? 'sidebar-open' : ''}`} onClick={toggleSidebar}>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
      </button>

      
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}

      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Navigation</h2>
        </div>
        
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="sidebar-item">
              <button
                className={`sidebar-link ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.id)}
              >
                <span className="sidebar-text">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
